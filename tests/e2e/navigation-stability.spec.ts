import { expect, test, type Page } from "@playwright/test"
import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import sharp from "sharp"

type Theme = "light" | "dark"
type ViewportCase = {
  name: "1440x1024" | "390x844"
  width: number
  height: number
}

type LayoutSnapshot = {
  bodyHeight: number
  clientWidth: number
  fonts: FontFaceSetLoadStatus
  header: DOMRectLike | null
  main: DOMRectLike | null
  mobileBar: DOMRectLike | null
  scaledStage: DOMRectLike | null
  scrollY: number
  scrollbarGutter: string
  theme: string
}

type DOMRectLike = {
  height: number
  left: number
  top: number
  width: number
}

type ShiftSnapshot = {
  all: number
  entries: Array<{
    hadRecentInput: boolean
    value: number
  }>
  supported: boolean
  unexpected: number
}

declare global {
  interface Window {
    __navShift?: ShiftSnapshot
  }
}

const evidencePhase = process.env.NAV_EVIDENCE_PHASE ?? "current"
const enforce = process.env.NAV_ENFORCE === "1"
const artifactRoot = path.resolve("test-artifacts", evidencePhase)
const appOrigin = "http://portfolio.test"

const viewports: ViewportCase[] = [
  { name: "1440x1024", width: 1440, height: 1024 },
  { name: "390x844", width: 390, height: 844 },
]
const themes: Theme[] = ["light", "dark"]
const routeSequence = [
  "/",
  "/m",
  "/projects",
  "/tools",
  "/about",
  "/methodology",
] as const
const routePairs = routeSequence.map((from, index) => ({
  from,
  to: routeSequence[(index + 1) % routeSequence.length],
}))

function routeName(route: string) {
  return route === "/" ? "home" : route.slice(1).replaceAll("/", "-")
}

function pairName(from: string, to: string) {
  return `${routeName(from)}-to-${routeName(to)}`
}

function contentType(filePath: string) {
  const extension = path.extname(filePath)
  return (
    {
      ".css": "text/css; charset=utf-8",
      ".html": "text/html; charset=utf-8",
      ".ico": "image/x-icon",
      ".jpg": "image/jpeg",
      ".js": "text/javascript; charset=utf-8",
      ".json": "application/json; charset=utf-8",
      ".png": "image/png",
      ".rsc": "text/x-component; charset=utf-8",
      ".svg": "image/svg+xml",
      ".webp": "image/webp",
      ".woff2": "font/woff2",
    }[extension] ?? "application/octet-stream"
  )
}

/**
 * The execution sandbox forbids listening sockets. Fulfill a production-build
 * origin directly inside Playwright so Chromium/WebKit still load the real
 * prerendered HTML, client bundles, RSC payloads, fonts, and public assets.
 */
async function serveProductionBuild(page: Page) {
  await page.route(`${appOrigin}/**`, async (route) => {
    const request = route.request()
    const url = new URL(request.url())
    const routeSlug =
      url.pathname === "/" ? "index" : url.pathname.replace(/^\/|\/$/g, "")
    const wantsRsc =
      request.headers().rsc === "1" || url.searchParams.has("_rsc")
    let filePath: string

    if (wantsRsc) {
      filePath = path.resolve(".next/server/app", `${routeSlug}.rsc`)
    } else if (url.pathname.startsWith("/_next/")) {
      filePath = path.resolve(
        ".next",
        url.pathname.slice("/_next/".length),
      )
    } else if (request.resourceType() === "document") {
      filePath = path.resolve(".next/server/app", `${routeSlug}.html`)
    } else if (url.pathname === "/favicon.ico") {
      filePath = path.resolve(".next/server/app/favicon.ico.body")
    } else {
      filePath = path.resolve("public", url.pathname.replace(/^\//, ""))
    }

    try {
      const body = await readFile(filePath)
      await route.fulfill({
        body,
        contentType: contentType(filePath),
        headers: {
          "cache-control": "no-store",
        },
        status: 200,
      })
    } catch {
      await route.fulfill({
        body: `Missing production artifact: ${filePath}`,
        contentType: "text/plain; charset=utf-8",
        status: 404,
      })
    }
  })
}

async function installLayoutShiftObserver(page: Page) {
  await page.addInitScript(() => {
    const state: ShiftSnapshot = {
      all: 0,
      entries: [],
      supported:
        "PerformanceObserver" in window &&
        PerformanceObserver.supportedEntryTypes?.includes("layout-shift"),
      unexpected: 0,
    }
    window.__navShift = state

    if (!state.supported) return

    const observer = new PerformanceObserver((list) => {
      for (const rawEntry of list.getEntries()) {
        const entry = rawEntry as PerformanceEntry & {
          hadRecentInput: boolean
          value: number
        }
        state.all += entry.value
        if (!entry.hadRecentInput) state.unexpected += entry.value
        state.entries.push({
          hadRecentInput: entry.hadRecentInput,
          value: entry.value,
        })
      }
    })
    observer.observe({ type: "layout-shift", buffered: true })
  })
}

async function installTheme(page: Page, theme: Theme) {
  await page.addInitScript((selectedTheme) => {
    localStorage.setItem("theme", selectedTheme)
  }, theme)
  await page.emulateMedia({ colorScheme: theme })
}

async function waitForSettledDocument(page: Page) {
  await page.waitForLoadState("domcontentloaded")
  await page.evaluate(async () => {
    const timeout = (milliseconds: number) =>
      new Promise<void>((resolve) => window.setTimeout(resolve, milliseconds))
    await Promise.race([document.fonts.ready.then(() => undefined), timeout(3_000)])
    await Promise.all(
      Array.from(document.images).map((image) => {
        if (image.complete) return Promise.resolve()
        return Promise.race([
          new Promise<void>((resolve) => {
            image.addEventListener("load", () => resolve(), { once: true })
            image.addEventListener("error", () => resolve(), { once: true })
            if (image.complete) resolve()
          }),
          timeout(2_000),
        ])
      }),
    )
  })
}

async function layoutSnapshot(page: Page): Promise<LayoutSnapshot> {
  return page.evaluate(() => {
    const stageCanvas = Array.from(
      document.querySelectorAll<HTMLElement>("div"),
    ).find(
      (element) =>
        element.style.width === "1054px" &&
        (element.style.height === "2360px" ||
          element.style.height === "1820px"),
    )
    const header = document.querySelector<HTMLElement>("header")
    const main = document.querySelector<HTMLElement>("main")
    const mobileBar = document.querySelector<HTMLElement>(
      'nav[aria-label="Primary"].fixed',
    )
    const rect = (element: HTMLElement | null | undefined) =>
      element
        ? {
            height: element.getBoundingClientRect().height,
            left: element.getBoundingClientRect().left,
            top: element.getBoundingClientRect().top,
            width: element.getBoundingClientRect().width,
          }
        : null

    return {
      bodyHeight: document.body.getBoundingClientRect().height,
      clientWidth: document.documentElement.clientWidth,
      fonts: document.fonts.status,
      header: rect(header),
      main: rect(main),
      mobileBar: rect(mobileBar),
      scaledStage: rect(stageCanvas?.parentElement),
      scrollY: window.scrollY,
      scrollbarGutter: getComputedStyle(document.documentElement).scrollbarGutter,
      theme: document.documentElement.className,
    }
  })
}

async function pixelDiff(before: Buffer, after: Buffer) {
  const first = await sharp(before)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })
  const second = await sharp(after)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  if (
    first.info.width !== second.info.width ||
    first.info.height !== second.info.height ||
    first.info.channels !== second.info.channels
  ) {
    throw new Error("Screenshot dimensions changed during frame diff")
  }

  const channels = first.info.channels
  let changedPixels = 0
  let totalDelta = 0

  for (let index = 0; index < first.data.length; index += channels) {
    let pixelDelta = 0
    for (let channel = 0; channel < Math.min(3, channels); channel += 1) {
      pixelDelta = Math.max(
        pixelDelta,
        Math.abs(first.data[index + channel] - second.data[index + channel]),
      )
    }
    if (pixelDelta > 8) changedPixels += 1
    totalDelta += pixelDelta
  }

  const pixels = first.info.width * first.info.height
  return {
    changedPixelRatio: changedPixels / pixels,
    changedPixels,
    meanMaxChannelDelta: totalDelta / pixels,
    pixels,
  }
}

async function saveScreenshot(page: Page, filePath: string) {
  await mkdir(path.dirname(filePath), { recursive: true })
  return page.screenshot({ path: filePath, animations: "disabled" })
}

test.describe.configure({ mode: "serial" })

test("captures route-to-route CLS and consecutive-frame visual diffs", async ({
  browser,
  browserName,
}) => {
  const results = []
  const context = await browser.newContext({
    colorScheme: "light",
    viewport: viewports[0],
  })
  const page = await context.newPage()
  await serveProductionBuild(page)
  await installLayoutShiftObserver(page)
  await page.addInitScript(() => {
    const selectedTheme = localStorage.getItem("__playwrightTheme") ?? "light"
    localStorage.setItem("theme", selectedTheme)
  })
  let firstTheme = true

  for (const viewport of viewports) {
    await page.setViewportSize(viewport)

    for (const theme of themes) {
      await page.emulateMedia({ colorScheme: theme })
      if (!firstTheme) {
        await page.evaluate((selectedTheme) => {
          localStorage.setItem("__playwrightTheme", selectedTheme)
          localStorage.setItem("theme", selectedTheme)
        }, theme)
      }
      firstTheme = false

      for (const { from, to } of routePairs) {
        const pair = pairName(from, to)
        const stem = `${pair}-${viewport.name}-${browserName}-${theme}`
        const directory = path.join(artifactRoot, browserName)

        await page.goto(from, { waitUntil: "domcontentloaded" })
        await waitForSettledDocument(page)
        await page.waitForTimeout(100)
        const sourcePath = path.join(directory, `${stem}-source.png`)
        await saveScreenshot(page, sourcePath)

        await page.goto(to, { waitUntil: "domcontentloaded" })
        const earlyLayout = await layoutSnapshot(page)
        const earlyPath = path.join(directory, `${stem}-target-early.png`)
        const earlyFrame = await saveScreenshot(page, earlyPath)

        await waitForSettledDocument(page)
        await page.waitForTimeout(750)
        const settledLayout = await layoutSnapshot(page)
        const settledPath = path.join(directory, `${stem}-target-settled.png`)
        const settledFrame = await saveScreenshot(page, settledPath)
        const shifts = await page.evaluate(
          () =>
            window.__navShift ?? {
              all: 0,
              entries: [],
              supported: false,
              unexpected: 0,
            },
        )
        const visualDiff = await pixelDiff(earlyFrame, settledFrame)

        const result = {
          browser: browserName,
          earlyLayout,
          from,
          phase: evidencePhase,
          settledLayout,
          shifts,
          theme,
          to,
          viewport: viewport.name,
          visualDiff,
        }
        results.push(result)
        console.log(`NAV_METRIC ${JSON.stringify(result)}`)

        if (enforce && shifts.supported) {
          expect(
            shifts.unexpected,
            `${stem} emitted unexpected layout shift`,
          ).toBeLessThanOrEqual(0.001)
        }
        if (enforce) {
          expect(
            Math.abs(settledLayout.bodyHeight - earlyLayout.bodyHeight),
            `${stem} changed document height after its early rendered frame`,
          ).toBeLessThanOrEqual(1)
        }
      }
    }
  }

  await context.close()
  await mkdir(path.join(artifactRoot, "metrics"), { recursive: true })
  await writeFile(
    path.join(
      artifactRoot,
      "metrics",
      `route-transitions-${browserName}.json`,
    ),
    `${JSON.stringify(results, null, 2)}\n`,
  )
})

test("SSR reserves the scaled-stage footprint before hydration", async ({
  baseURL,
  browser,
  browserName,
}) => {
  const context = await browser.newContext({
    colorScheme: "light",
    javaScriptEnabled: false,
    viewport: viewports[0],
  })
  const page = await context.newPage()
  await serveProductionBuild(page)
  const results = []

  for (const viewport of viewports) {
    await page.setViewportSize(viewport)

    for (const target of [
      { route: "/m", stageHeight: 2360 },
      { route: "/about", stageHeight: 1820 },
    ]) {
      if (target.route === "/about" && viewport.width >= 768) continue

      await page.goto(`${baseURL}${target.route}`, {
        waitUntil: "domcontentloaded",
      })
      const measurement = await page.evaluate(({ route, stageHeight }) => {
        const canvas = Array.from(
          document.querySelectorAll<HTMLElement>("div"),
        ).find(
          (element) =>
            element.style.width === "1054px" &&
            element.style.height === `${stageHeight}px`,
        )
        const outer =
          route === "/m"
            ? canvas?.parentElement?.parentElement
            : canvas?.parentElement
        return {
          actual: outer?.getBoundingClientRect().height ?? null,
          expected: (document.documentElement.clientWidth / 1054) * stageHeight,
        }
      }, target)
      const fileName = `${routeName(target.route)}-${viewport.name}-${browserName}-light-ssr.png`
      await saveScreenshot(
        page,
        path.join(artifactRoot, browserName, fileName),
      )
      const result = {
        browser: browserName,
        phase: evidencePhase,
        route: target.route,
        viewport: viewport.name,
        ...measurement,
      }
      results.push(result)
      console.log(`NAV_SSR ${JSON.stringify(result)}`)

      if (enforce && measurement.actual !== null) {
        expect(
          Math.abs(measurement.actual - measurement.expected),
          `${target.route} must reserve its scaled height without JavaScript`,
        ).toBeLessThanOrEqual(1)
      }
    }
  }

  await context.close()
  await mkdir(path.join(artifactRoot, "metrics"), { recursive: true })
  await writeFile(
    path.join(artifactRoot, "metrics", `ssr-footprint-${browserName}.json`),
    `${JSON.stringify(results, null, 2)}\n`,
  )
})

test("client navigation resets scroll and preserves dark theme", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await serveProductionBuild(page)
  await installTheme(page, "dark")
  await page.goto("/")
  await waitForSettledDocument(page)

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(100)

  await page.locator('a[href="/about"]').last().click()
  await page.waitForURL("**/about")
  await page.waitForTimeout(100)

  expect(await page.evaluate(() => window.scrollY)).toBeLessThanOrEqual(1)
  await expect(page.locator("html")).toHaveClass(/dark/)
})

test("mobile bottom bar keeps a steady fixed footprint across routes", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await serveProductionBuild(page)
  await installTheme(page, "light")
  await page.goto("/m")
  await waitForSettledDocument(page)

  const before = await page
    .locator('nav[aria-label="Primary"].fixed')
    .boundingBox()
  await page
    .locator('nav[aria-label="Primary"].fixed a[href="/projects"]')
    .click()
  await page.waitForURL("**/projects")
  const after = await page
    .locator('nav[aria-label="Primary"].fixed')
    .boundingBox()

  expect(before).not.toBeNull()
  expect(after).not.toBeNull()
  expect(Math.abs(after!.height - before!.height)).toBeLessThanOrEqual(1)
  expect(Math.abs(after!.y - before!.y)).toBeLessThanOrEqual(1)
})

test("root chrome slot and scrollbar allocation stay constant", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1024 })
  await serveProductionBuild(page)
  await installTheme(page, "light")
  await page.goto("/")
  await waitForSettledDocument(page)

  const homeHeader = await page.locator("header.sticky").boundingBox()
  const homeMainTop = await page.locator("main").evaluate((main) =>
    main.getBoundingClientRect().top,
  )
  const homeWidth = await page.evaluate(() => ({
    client: document.documentElement.clientWidth,
    gutter: getComputedStyle(document.documentElement).scrollbarGutter,
    inner: window.innerWidth,
  }))

  await page.locator('main a[href="/projects"]').first().click()
  await page.waitForURL("**/projects")
  const projectsHeader = await page.locator("header.sticky").boundingBox()
  const projectsWidth = await page.evaluate(() => ({
    client: document.documentElement.clientWidth,
    gutter: getComputedStyle(document.documentElement).scrollbarGutter,
    inner: window.innerWidth,
  }))

  expect(homeHeader).not.toBeNull()
  expect(projectsHeader).not.toBeNull()
  expect(Math.abs(projectsHeader!.height - homeHeader!.height)).toBeLessThanOrEqual(
    1,
  )
  expect(Math.abs(homeMainTop)).toBeLessThanOrEqual(1)
  expect(homeWidth.gutter).toBe("stable")
  expect(projectsWidth.gutter).toBe("stable")
  expect(homeWidth.client).toBe(projectsWidth.client)
  expect(homeWidth.inner - homeWidth.client).toBeLessThanOrEqual(17)
})
