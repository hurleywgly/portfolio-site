import { copyFile, mkdir } from "node:fs/promises"
import path from "node:path"
import { expect, test, type Browser, type Page } from "@playwright/test"

/**
 * User-acceptance proof for the home-page deep-link feature: the 2x2 work
 * grid tiles and the Tools/Arsenal chips on `/` now link straight to the
 * matching item on `/projects` or `/tools` instead of dumping the visitor at
 * the generic top of the page. This spec drives real taps/clicks starting
 * from `/`, records video of every flow, and measures the DOM state on
 * arrival (selection, expansion, scroll offset) plus the mobile tap-target
 * sizes.
 *
 * Contexts are created manually per test via `browser.newContext()` (rather
 * than describe-level `test.use({ video })`) because Playwright refuses to
 * mix worker-forcing options like `video` across describe blocks in one
 * spec file. This keeps mobile and desktop flows in a single file as
 * requested without touching the shared playwright.config.ts.
 *
 * Only meant to run against chromium (`--project=chromium`) — webkit would
 * just duplicate every flow.
 */

const ARTIFACT_DIR = path.resolve("test-artifacts/deeplink-proof")
const VIDEO_TMP_DIR = path.resolve("test-artifacts/deeplink-proof/_tmp-video")

const PROJECT_TILES = [
  { slug: "stumble", name: "Stumble AI" },
  { slug: "rainier", name: "Rain or Rainier" },
  { slug: "bookshelf", name: "Acquired Bookshelf" },
  { slug: "ryos", name: "RyOS Capsule" },
] as const

const ARSENAL_CHIPS = [
  { slug: "capsule", name: "/capsule" },
  { slug: "pitch-me", name: "/pitch-me" },
  { slug: "daily-brief", name: "/daily-brief" },
  { slug: "research", name: "/research" },
] as const

async function ensureArtifactDir() {
  await mkdir(ARTIFACT_DIR, { recursive: true })
  await mkdir(VIDEO_TMP_DIR, { recursive: true })
}

type Viewport = { width: number; height: number }

async function openContext(
  browser: Browser,
  opts: {
    viewport: Viewport
    isMobile: boolean
    hasTouch: boolean
  },
) {
  await ensureArtifactDir()
  const context = await browser.newContext({
    viewport: opts.viewport,
    isMobile: opts.isMobile,
    hasTouch: opts.hasTouch,
    recordVideo: { dir: VIDEO_TMP_DIR, size: opts.viewport },
  })
  const page = await context.newPage()
  return { context, page }
}

/** Closes the context (which finalizes the recorded video to disk) then
 *  copies it into the shared artifact folder under a descriptive name. */
async function closeAndSaveVideo(
  context: Awaited<ReturnType<Browser["newContext"]>>,
  page: Page,
  destName: string,
) {
  const video = page.video()
  await context.close()
  if (!video) throw new Error(`No video recorded for ${destName}`)
  const src = await video.path()
  await copyFile(src, path.join(ARTIFACT_DIR, destName))
}

async function saveScreenshot(page: Page, destName: string) {
  await ensureArtifactDir()
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, destName),
    fullPage: true,
  })
}

type ProjectMeasurement = {
  ariaPressed: string | null
  dataAttrPresent: boolean
  showcaseTop: number | null
  panelTitle: string | null
  panelTag: string | null
  buildHref: string | null
  coverAlt: string | null
  blurbPresent: boolean
}

async function measureProject(page: Page, slug: string): Promise<ProjectMeasurement> {
  return page.evaluate((s) => {
    const btn = document.querySelector<HTMLButtonElement>(
      `button[data-attr="project-launch-${s}"]`,
    )
    const showcase = document.getElementById("projects-showcase")
    const panelRoot = document.getElementById("projects-showcase")
    const panelTitle = panelRoot?.querySelector("h2")?.textContent ?? null
    const anchor = panelRoot?.querySelector("a[href]")
    // All six covers are stacked (cross-fade); the ACTIVE one is the only
    // one with opacity-100 and a non-empty alt — pick that one specifically
    // rather than the first <img> in DOM order (which is often a hidden one
    // with alt="").
    const img = Array.from(panelRoot?.querySelectorAll("img") ?? []).find(
      (i) => i.classList.contains("opacity-100"),
    )
    const tag = panelRoot?.querySelector("p")?.textContent ?? null
    const blurb = Array.from(panelRoot?.querySelectorAll("p") ?? []).some(
      (p) => (p.textContent?.length ?? 0) > 20,
    )
    return {
      ariaPressed: btn?.getAttribute("aria-pressed") ?? null,
      dataAttrPresent: !!btn,
      showcaseTop: showcase?.getBoundingClientRect().top ?? null,
      panelTitle,
      panelTag: tag,
      buildHref: (anchor as HTMLAnchorElement | null)?.href ?? null,
      coverAlt: (img as HTMLImageElement | null)?.alt ?? null,
      blurbPresent: blurb,
    }
  }, slug)
}

type SkillMeasurement = {
  ariaExpanded: string | null
  expandedPanelCount: number
  expandedPanelIds: string[]
  rowTop: number | null
  panelExists: boolean
}

async function measureSkill(page: Page, slug: string): Promise<SkillMeasurement> {
  return page.evaluate((s) => {
    const toggle = document.querySelector<HTMLButtonElement>(
      `button[data-attr="skill-toggle-${s}"]`,
    )
    const row = document.getElementById(`skill-row-${s}`)
    const panels = Array.from(
      document.querySelectorAll<HTMLElement>('[id^="skill-panel-"]'),
    )
    return {
      ariaExpanded: toggle?.getAttribute("aria-expanded") ?? null,
      expandedPanelCount: panels.length,
      expandedPanelIds: panels.map((p) => p.id),
      rowTop: row?.getBoundingClientRect().top ?? null,
      panelExists: !!document.getElementById(`skill-panel-${s}`),
    }
  }, slug)
}

async function waitForSettled(page: Page) {
  await page.waitForLoadState("domcontentloaded")
  await page.waitForTimeout(400)
}

/* ------------------------------------------------------------------ mobile */

const MOBILE_VIEWPORT: Viewport = { width: 375, height: 812 }

test.describe("home deep-links — mobile (375x812, touch)", () => {
  for (const tile of PROJECT_TILES) {
    test(`project tile → ${tile.slug}`, async ({ browser }) => {
      const { context, page } = await openContext(browser, {
        viewport: MOBILE_VIEWPORT,
        isMobile: true,
        hasTouch: true,
      })

      await page.goto("/")
      await waitForSettled(page)
      await page.waitForTimeout(500)

      const link = page.locator(`a[data-attr="home-tile-${tile.slug}"]:visible`)
      await link.scrollIntoViewIfNeeded()
      await page.waitForTimeout(300)
      await link.tap()

      await page.waitForURL(`**/projects?project=${tile.slug}`)
      await page.waitForFunction(
        (s) =>
          document
            .querySelector(`button[data-attr="project-launch-${s}"]`)
            ?.getAttribute("aria-pressed") === "true",
        tile.slug,
        { timeout: 5_000 },
      )
      await page.waitForTimeout(600)

      const measurement = await measureProject(page, tile.slug)
      console.log(
        `MOBILE_TILE_RESULT ${tile.slug} ${JSON.stringify(measurement)}`,
      )
      expect(measurement.ariaPressed).toBe("true")
      expect(measurement.dataAttrPresent).toBe(true)
      expect(measurement.showcaseTop).not.toBeNull()

      await saveScreenshot(page, `mobile-tile-${tile.slug}.png`)
      await closeAndSaveVideo(context, page, `mobile-tile-${tile.slug}.webm`)
    })
  }

  for (const chip of ARSENAL_CHIPS) {
    test(`arsenal chip → ${chip.slug}`, async ({ browser }) => {
      const { context, page } = await openContext(browser, {
        viewport: MOBILE_VIEWPORT,
        isMobile: true,
        hasTouch: true,
      })

      await page.goto("/")
      await waitForSettled(page)
      await page.waitForTimeout(500)

      const link = page.locator(`a[data-attr="home-arsenal-${chip.slug}"]:visible`)
      await link.scrollIntoViewIfNeeded()
      await page.waitForTimeout(300)
      await link.tap()

      await page.waitForURL(`**/tools?skill=${chip.slug}`)
      await page.waitForFunction(
        (s) =>
          document
            .querySelector(`button[data-attr="skill-toggle-${s}"]`)
            ?.getAttribute("aria-expanded") === "true",
        chip.slug,
        { timeout: 5_000 },
      )
      await page.waitForTimeout(600)

      const measurement = await measureSkill(page, chip.slug)
      console.log(
        `MOBILE_CHIP_RESULT ${chip.slug} ${JSON.stringify(measurement)}`,
      )
      expect(measurement.ariaExpanded).toBe("true")
      expect(measurement.expandedPanelCount).toBe(1)
      expect(measurement.expandedPanelIds).toEqual([`skill-panel-${chip.slug}`])

      const fileSlug = chip.slug.replace(/\//g, "")
      await saveScreenshot(page, `mobile-chip-${fileSlug}.png`)
      await closeAndSaveVideo(context, page, `mobile-chip-${fileSlug}.webm`)
    })
  }

  test("tap targets clear 44x44pt Apple HIG minimum", async ({ browser }) => {
    const { context, page } = await openContext(browser, {
      viewport: MOBILE_VIEWPORT,
      isMobile: true,
      hasTouch: true,
    })

    await page.goto("/")
    await waitForSettled(page)
    await page.waitForTimeout(500)

    const rects = await page.evaluate(() => {
      const els = Array.from(
        document.querySelectorAll<HTMLAnchorElement>(
          'a[data-attr^="home-tile-"], a[data-attr^="home-arsenal-"]',
        ),
      )
      // The desktop exhibit-stage markup and the mobile-mock markup both
      // exist in the DOM at all times (CSS `hidden md:block` / `md:hidden`
      // toggles visibility, not presence) — keep only the ones actually
      // rendered at this viewport.
      const visible = els.filter((el) => {
        const r = el.getBoundingClientRect()
        return r.width > 0 && r.height > 0 && el.offsetParent !== null
      })
      return visible.map((el) => {
        const r = el.getBoundingClientRect()
        return {
          dataAttr: el.getAttribute("data-attr"),
          width: r.width,
          height: r.height,
        }
      })
    })

    console.log(`TAP_TARGETS ${JSON.stringify(rects, null, 2)}`)
    expect(rects.length).toBe(8)
    for (const r of rects) {
      expect(r.width, `${r.dataAttr} width`).toBeGreaterThanOrEqual(44)
      expect(r.height, `${r.dataAttr} height`).toBeGreaterThanOrEqual(44)
    }

    await saveScreenshot(page, "mobile-tap-target-overview.png")
    await closeAndSaveVideo(context, page, "mobile-tap-target-measurement.webm")
  })
})

/* ----------------------------------------------------------------- desktop */

const DESKTOP_VIEWPORT: Viewport = { width: 1280, height: 720 }

test.describe("home deep-links — desktop (1280x720, mouse)", () => {
  for (const tile of PROJECT_TILES) {
    test(`project tile → ${tile.slug}`, async ({ browser }) => {
      const { context, page } = await openContext(browser, {
        viewport: DESKTOP_VIEWPORT,
        isMobile: false,
        hasTouch: false,
      })

      await page.goto("/")
      await waitForSettled(page)
      await page.waitForTimeout(500)

      const link = page.locator(`a[data-attr="home-tile-${tile.slug}"]:visible`)
      await link.scrollIntoViewIfNeeded()
      await page.waitForTimeout(300)
      await link.click()
      // Desktop rows preview on hover — move the mouse well away from the
      // list immediately so it can't land on/re-select a different row.
      await page.mouse.move(1200, 40)

      await page.waitForURL(`**/projects?project=${tile.slug}`)
      await page.waitForFunction(
        (s) =>
          document
            .querySelector(`button[data-attr="project-launch-${s}"]`)
            ?.getAttribute("aria-pressed") === "true",
        tile.slug,
        { timeout: 5_000 },
      )
      await page.mouse.move(1200, 40)
      await page.waitForTimeout(600)

      const measurement = await measureProject(page, tile.slug)
      console.log(
        `DESKTOP_TILE_RESULT ${tile.slug} ${JSON.stringify(measurement)}`,
      )
      expect(measurement.ariaPressed).toBe("true")
      expect(measurement.dataAttrPresent).toBe(true)
      expect(measurement.showcaseTop).not.toBeNull()

      await saveScreenshot(page, `desktop-tile-${tile.slug}.png`)
      await closeAndSaveVideo(context, page, `desktop-tile-${tile.slug}.webm`)
    })
  }

  for (const chip of ARSENAL_CHIPS) {
    test(`arsenal chip → ${chip.slug}`, async ({ browser }) => {
      const { context, page } = await openContext(browser, {
        viewport: DESKTOP_VIEWPORT,
        isMobile: false,
        hasTouch: false,
      })

      await page.goto("/")
      await waitForSettled(page)
      await page.waitForTimeout(500)

      const link = page.locator(`a[data-attr="home-arsenal-${chip.slug}"]:visible`)
      await link.scrollIntoViewIfNeeded()
      await page.waitForTimeout(300)
      await link.click()
      await page.mouse.move(1200, 40)

      await page.waitForURL(`**/tools?skill=${chip.slug}`)
      await page.waitForFunction(
        (s) =>
          document
            .querySelector(`button[data-attr="skill-toggle-${s}"]`)
            ?.getAttribute("aria-expanded") === "true",
        chip.slug,
        { timeout: 5_000 },
      )
      await page.mouse.move(1200, 40)
      await page.waitForTimeout(600)

      const measurement = await measureSkill(page, chip.slug)
      console.log(
        `DESKTOP_CHIP_RESULT ${chip.slug} ${JSON.stringify(measurement)}`,
      )
      expect(measurement.ariaExpanded).toBe("true")
      expect(measurement.expandedPanelCount).toBe(1)
      expect(measurement.expandedPanelIds).toEqual([`skill-panel-${chip.slug}`])

      const fileSlug = chip.slug.replace(/\//g, "")
      await saveScreenshot(page, `desktop-chip-${fileSlug}.png`)
      await closeAndSaveVideo(context, page, `desktop-chip-${fileSlug}.webm`)
    })
  }
})
