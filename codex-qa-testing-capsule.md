# CODEX-QA.CAPSULE.md

> Adversarial QA pass on a freshly-shipped portfolio redesign: browse it like a skeptical stranger, break it, and report only real defects.

**Version:** 1.0
**Created:** 2026-07-25
**From:** Claude Opus 5 (orchestrator) — ryan_portfolio production push session
**To:** Codex, running browser-use QA
**Purpose:** Independently test the live ryanwigley.com redesign across routes, themes, and breakpoints; surface defects the building agents missed. A second pair of eyes from a different lineage.
**Tier:** Standard
**Category:** Conversation Thread
**Archetype:** Perishable (pinned to this release; re-runnable per deploy)

---

## 1. Dispatch Summary

`ryanwigley.com` just shipped a full redesign ("Working Exhibit") — six routes, two themes, a bespoke mock-scale mobile rendering model, and a lot of hand-exported Figma vector art. It was built by Claude agents that repeatedly declared things "verified" that were not. You are the independent check.

Your job: **find what's actually broken.** Do not re-report the deliberate choices listed in §4 — they are intentional and were argued through with Ryan. Everything else is fair game.

Bias toward **skepticism**: the building agents produced at least four false "verified" claims this session (a stripped SVG mask that silently flattened an icon, two lazy-load screenshot artifacts misread as missing images, and a wrong root-cause diagnosis). Trust the rendered DOM over any claim in this document.

## 2. Core Content

### Environment

| | |
|---|---|
| **Live production** | https://ryanwigley.com |
| Repo | `~/my_projects/ryan_portfolio`, branch `main` (merge `35c3008`) |
| Stack | Next.js 16 (app router, webpack), Tailwind, deployed on Vercel |
| Build | `npm run build` · Lint `npm run lint` (tsc --noEmit) · E2E `npm run test:e2e` (Playwright, incl. `navigation-stability.spec.ts`) |
| Design source of truth | Figma `sGFjHbsFwMriSNcfT7TQrc` — Home `164:2`, Projects `40:2`, Methodology `76:2`, Tools `16:2`, About `61:2` |

### Routes

`/` (home exhibit) · `/about` · `/methodology` · `/projects` · `/tools` · `/m` (mobile home reference build, `noindex`, not linked from nav)

### The two rendering models — understand this before judging layout

- **Mock-scale pages** (`/`, `/m`, `/about`, `/methodology` on mobile): render the Figma **1054-wide artboard** as one uniformly scaled object (`ScaledStage` / `ZoomableStage`). At a 375px viewport the scale is `375/1054 ≈ 0.356`, so an authored 48px heading renders at ~17 effective px. **This is correct and intended.** A "reflowed native mobile" layout was tried and explicitly rejected — if you see one, that's a bug.
- **Reflow pages** (`/projects`, `/tools`): real-px responsive layouts. Their mobile type uses `vw` units specifically so the effective size tracks the mock-scale pages (heading `4.554vw` = 48/1054).
- `/m` additionally supports pinch-zoom 1×–3× and double-tap; the fixed bottom nav sits outside the zoom transform.

## 3. Patterns and Learnings

- **Verify via DOM, not a single screenshot.** `next/image` lazy-loads; screenshots caught mid-load twice this session and produced two false "the image is missing" alarms. Use `getBoundingClientRect()` / `getComputedStyle()` / `naturalWidth` to confirm an element really rendered.
- **Editing `next.config.mjs` under a live dev server produces phantom breakage.** Next does not hot-reload config; restart before judging. This caused a third false alarm.
- **Figma is the arbiter, not intuition.** One "defect" (the methodology constellation overlapping its own title and footer) turned out to be exactly what the frame draws — an intentional tarot-card look. Check the frame before calling drift.

## 4. DO NOT FLAG — deliberate divergences from Figma

Every item below is intentional, decided with Ryan. Reporting these as bugs is noise.

| Area | Divergence | Why |
|---|---|---|
| Tools feature-image plate | Taller than the frame; heights standardized across skills | Ryan asked for it explicitly |
| Projects + About body copy | Larger than the frame's literal px | Readability — "I don't imagine a lot of people like to read text that small" |
| About mobile headshot | Smaller than the frame (440→360 artboard px) | Needed to fit the page above the mobile nav fold |
| Projects mobile | Interaction favored over strict artboard fidelity | Ryan likes the tap-to-preview → tap-again-to-launch behavior; preserve it |
| Desktop headings | All pages forced to 40px, overriding Figma's per-page 40/52/56/58/60 | Ryan: "heading on desktop should match across pages" |
| Footer `● GRID NN · 47°N · PAGE` | Removed site-wide even though the frames still contain it | Ryan retired the GRID tag; Figma is stale here |
| Home page | No footer at all | Front-door exception, by design |
| Writing tile | Figma's decorative offset "stacked paper" backing rect omitted | No matching light-theme token; overflow risk to sibling tiles |
| `/m` route | Orphaned, `noindex`, not in nav | Intentional reference/QA route |

## 5. Integration Plan

Prerequisites: browser-use capability, network access to the live site. Read-only — **do not modify the repo**; Ryan's build session owns the working tree.

- **Step 1: Smoke every route** `[auto]` — Load all six routes on the live site. Verify: HTTP 200, no console errors, no hydration warnings, no layout shift on load. Rollback: n/a (read-only).
- **Step 2: Theme matrix** `[auto]` — Toggle light/dark (sun/moon pill, top right) on every route. Verify: no unreadable contrast, no element that vanishes into its background, no flash of wrong theme on navigation. Light and dark shelf/crew art are *different drawings*, not recolors — both should look deliberate.
- **Step 3: Breakpoint matrix** `[auto]` — Test at 375, 390, 430 (phones), 768 (tablet), 1280, 1440, 1920. Verify: the mobile bottom bar appears ONLY below `md`; the desktop nav strip only at/above it; never both; no horizontal scroll at any width; mock-scale pages show the full artboard width with no clipping.
- **Step 4: Navigation stability** `[auto]` — Click through every nav item repeatedly, both directions. Verify: no content jump/shift between routes (constant-footprint chrome + `scrollbar-gutter: stable` are supposed to guarantee this). Confirm the active-page indicator is correct on each route (desktop = gold underline, mobile = gold label+glyph).
- **Step 5: Interactions** `[auto]` — `/tools`: expand and collapse skills, confirm the +/− spin animation runs and content renders; exercise all seven filter chips including "all"; test the copy-to-clipboard on the install bar. `/projects`: tap/click each project to preview, then again to launch — confirm the preview pane updates and the transition is smooth. Verify every outbound link resolves (see Step 6).
- **Step 6: Links** `[auto]` — Verify each destination returns 200 and is the right site: `wavefrm.io` · `stumble-ai.com` · `acquired-bookshelf.vercel.app` · `rain-or-rainier.netlify.app` · `github.com/hurleywgly/ryos` · `github.com/hurleywgly/skills` · `blog.ryanwigley.com` (the "writing" nav item, external) · socials `x.com/rywigs`, `linkedin.com/in/rywigs`, `github.com/hurleywgly`. Flag any 404, redirect chain, or wrong-destination link. **Note:** `mc.ryanwigley.com` was intentionally taken offline — it should NOT appear anywhere.
- **Step 7: Assets** `[auto]` — Confirm images are crisp at 2×/3× DPR (image optimization was just enabled; look for `_next/image` with proper `srcset`, not raw files). Confirm no image is a soft/upscaled raster. The shelf diorama and nav glyphs are inline/exported SVG — they must be sharp at any zoom.
- **Step 8: Accessibility sweep** `[auto]` — Keyboard-only traversal of every interactive element (focus visible? logical order? skill accordion operable via keyboard? `aria-expanded` correct?). Check alt text, heading hierarchy, and contrast ratios in both themes.
- **Step 9: SEO/meta spot-check** `[auto]` — Per route: `<title>` is unique and not double-branded, `<link rel="canonical">` is SELF-referential (this was a real shipped bug — `/about` must canonical to `/about`, not `/`), OG tags present, JSON-LD parses. `/m` must be `noindex` and canonical to `/`. Verify `/robots.txt`, `/sitemap.xml`, `/llms.txt` all serve.
- **Step 10: Report** `[manual]` — See §6.

## 6. Signals

- **The highest-yield areas**, based on where this build has actually been fragile: (1) hand-recomposed SVG art — the shelf was rebuilt from ~40 vector assets with some placement done by inset math, so look for misplaced or clipped pieces; (2) the mock-scale ↔ reflow seam around the `md` breakpoint; (3) anything involving `next/image` after the optimization flip.
- Rank findings by **user impact**, not by how clever the catch is. A broken link on the projects page beats a 2px misalignment.
- For each finding give: route · viewport · theme · repro steps · expected vs actual · severity. Include a screenshot only when the defect is visual.
- If you find **nothing** in a category, say so explicitly — a clean bill for an area is useful signal, and silence is ambiguous.
- Do not fix anything. Report only. The orchestrator triages and dispatches fixes.

## 7. Sanitization Notes

Skipped (same-owner transfer — Ryan owns both this session and Codex). Personal handles, email, and repo paths retained deliberately because they are part of what must be tested. No credentials or tokens are included; none are needed for a read-only pass against the public site.

---

*Dispatch complete.*
