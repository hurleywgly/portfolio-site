# PLAN.md — Working Exhibit production push

**Authored by:** Opus 5 (planning) · **Executed by:** Sonnet 5 · **Final pixel QA:** Fable 5
**Rule:** single-threaded. One task at a time. No Workflow, no parallel agent fleets.
IDs are stable — an item keeps its `#N` forever. PLAN.md is the single source of truth.

---

## REFERENCE — Figma is the source of truth

File: `sGFjHbsFwMriSNcfT7TQrc` — "ryanwigley.com — Page Designs"

| Page | node-id | Notes |
|---|---|---|
| Home | `164:2` | mobile light frame = `164:3` (**1054 × 2360**) |
| Projects | `40:2` | |
| Methodology | `76:2` | |
| Tools · Skill Playbook | `16:2` | |
| About | `61:2` | |
| Design Language | `0:1` | module kit, type ramp, nav icons, palette |

Frame naming: `page · {slug} · {desktop|mobile} · {light|dark}`.
Mobile artboards are **1054 wide**; mobile display type = Fraunces Black 48 at artboard scale.
Desktop artboards are **1440 wide**, page-pad-x 80, content-max 1280.

**Workflow for every visual task:** `get_metadata` on the page node → find the frame → `get_design_context` on the frame → port to code → screenshot the running page → compare against the Figma render → iterate until it matches.

---

## DONE

- [x] **#1–#12** Design system, tokens, fonts, theme provider, route skeleton, package prune, home 4-surfaces, /m variant, monogram, zero-shift nav, shelf-as-SVG (regressed, see #47), blog URL, e2e spec, DESIGN.md v1.1, metadata scaffold
- [x] **#13** Baseline build — clean; all routes prerender
- [x] **#16** Projects page renders (styling still to reconcile → #33)
- [x] **#17** Tools page BUILT — wired the orphaned `SkillPlaybook` (hero + filter accordion + grid-03 footer)
- [x] **#29** 🐛 Fixed `MobileNavBar` missing `md:hidden` — bottom bar was overlapping desktop content on every content route
- [x] **#30** Nav icons → real Figma glyphs (`578:122/123/128/134`, `939:8`); lucide removed; ~~tools-crest mask stripped (Chromium mis-clip)~~ **CORRECTION — this was wrong, see #57.** That mask was load-bearing (it produced the shield's hollow interior), not redundant reinforcement; stripping it flattened the tools icon into a solid blob. `currentColor` themed
- [x] **#41** Tools page → Notion "Ryan's Skills" metadata; all **17 skills** now carry use-cases / why / how / pairs-with (was 3)
- [x] **#44** Spin animation on the skill +/− expander (motion-reduce safe)
- [x] **#46** X handle → **@rywiggs** everywhere (GitHub `hurleywgly` left intact)
- [x] **#20c-1** SEO/meta: fixed P0 inherited-canonical bug, de-duped titles, per-page OG, JSON-LD (@id-linked Person+WebSite, worksFor Raya, Person.image, ProfilePage on /about), theme-color
- [x] **#20c-2** Branded icon set from the RW monogram (forest on sage): favicon.ico + icon.svg + apple-icon.png

---

## PHASE 1 — Figma truth reconciliation  ⟵ **START HERE**

Everything below was previously "verified" against DESIGN.md + rendering, **not** against the live Figma frames. That was the miss. Re-do it properly, page by page.

- [x] **#38** `/m` mobile home — restore **1:1 mock scale**.
  - **Root cause was NOT in `zoomable-stage.tsx`.** That component was already correct — verified `scale = clientWidth / 1054` exactly, `zoom` starts at `1`, no min-zoom floor. The real bug: `app/page.tsx` (the actual `/` route real visitors and the nav bar's "home" link land on) still shipped the **"reflowed-native-mobile" approach DESIGN.md explicitly says was REJECTED** — a whole second, hand-reflowed mobile layout (real Tailwind sizes, single-column stack) inside `<div className="md:hidden">`, completely separate from `/m`'s mock-scale build. `/m` itself is an orphaned reference route (noindex, not linked from nav) — Ryan was almost certainly seeing `/`'s reflow block on his phone, which reads exactly like "zoomed in like an app" next to the Figma-exact 1054-wide mock proportions.
  - Fix: extracted the mock-scale mobile render (the `ZoomableStage` + chrome/hero/tiles/etc. markup) out of `app/m/page.tsx` into a new shared component `components/home-mobile-mock.tsx` (`HomeMobileMock`). `app/m/page.tsx` now just wraps it for standalone preview. `app/page.tsx`'s mobile slot now renders the same `<HomeMobileMock />` instead of its old bespoke reflow JSX (~80 lines removed, plus the now-dead `LatticeRule` helper and the unused `MobileNavBar` import). `components/zoomable-stage.tsx` was not touched — confirmed via `git diff` (zero changes).
  - Verify: `npm run build` clean (13/13 routes prerender). At 375/390/430px, both `/` and `/m` now show the whole 1054-wide artboard scaled to `viewportWidth/1054` (computed `transform: scale(...)` checked against expected value at each width via devtools). Visually matches the Figma `164:3` screenshot proportions (light theme spot-checked too). Desktop `/` (ExhibitStage branch) untouched and confirmed still rendering. No console errors at any size. Double-tap-to-2× zoom confirmed live via dispatched pointer events (correct focal-point math); a second synthetic double-tap-to-1× toggle didn't reproduce cleanly under scripted pointer events — likely a synthetic-event/timing artifact, not a regression, since the gesture code itself is byte-for-byte unchanged.

- [x] **#31** Home `/` desktop — reconcile to the Figma home desktop frame (`344:2` light / `1003:2` dark). FIXED.
  - Pulled `get_design_context` on `344:2` and diffed every module's frame-coordinates against `app/page.tsx`. Result: nav/logo/theme-switcher, methodology card, writing tile, waveform banner, the 2×2 project-tile grid, the arsenal 2×2 chip grid, "browse all my skills," and the crew polaroid were ALL already pixel-exact (previous work had already nailed these). The only real drift was the hero: heading box was `x=80 y=132 w=470` vs Figma's `x=80 y=138 w=440`, and the subhead was `y=244 w=452` vs Figma's `y=248 w=447` — the 30px width difference on the heading changed the text-wrap point ("Ryan is building apps &" / "AI systems" instead of Figma's "Ryan is building apps" / "& AI systems"). Fixed both boxes to the exact Figma values.
  - **Note for awareness (not fixed, out of scope):** Figma bakes a third, dimmer gold `#94854A` for several secondary marks — the arsenal chip arrows, the "PODCAST EDITOR"/"TOOLS · THE ARSENAL" kickers, and the methodology core (see #50) — distinct from both the page-level `accent` token (`#A18A2E` light / `#C9A85A` dark) and from the full-saturation gold baked into on-card tile art (`#C9A85A` in both themes, see #49). The codebase has no token for this third tone; current kickers render via `text-accent`. Visually close but not exact. Flagging for a future token pass rather than introducing an ad-hoc token under this task's scope.
  - **Files:** `app/page.tsx`.
  - **Verified:** `npm run build` clean. Screenshotted `/` at 1440px, both themes (toggled live) — hero now wraps exactly like the Figma screenshot, all module positions confirmed against the Figma render. Console clean.

- [x] **#33** Projects — reconcile to `40:2` (desktop **and** mobile). FIXED.
  - Pulled `get_design_context` + screenshots for `836:3` (desktop light), metadata for the full `40:2` canvas (desktop dark `837:2`, mobile light/dark `1006:62`/`1006:63`), and a mobile screenshot. Figma's row list turned out substantially richer than the shipped page: each row carries a name + status tag + one-line summary + a small mono "input → output" tagline (the shipped page showed name + tag only) — added the two missing lines to `ProjectRow`. Row **name font was wrong** (`font-display`/Fraunces was shipped; Figma uses `font-mono`/Fragment Mono for every row name — a catalogue-style choice distinct from the Fraunces titles used elsewhere). The featured panel structure was also wrong: Figma has NO card surface around it — it's a bordered cover image with the kicker/title/"view the build →"/description sitting directly on the PAGE background below (page tokens `ink`/`muted`/`rule`), not a padded `bg-card` box (card tokens `on-card`/`on-card-muted`). Rebuilt `FeaturedPanel` accordingly, including the responsive reorder Figma actually uses: desktop puts title+link on one row with description below; **mobile puts the link on its own line AFTER the description** (verified via the mobile screenshot) — done with a `flex-col` (mobile, `order-*` utilities) that becomes `lg:grid` (desktop, explicit col/row placement) so both arrangements come from one markup tree.
  - Kept the interaction fully intact — `ProjectRow` is still the same hover/focus/click-to-select `<button>`, `FeaturedPanel` is still one full `<Link>`/`<a>` over the image+text. Verified live: clicking a row swaps the panel (cover, tag, title, blurb) instantly, and clicking the panel navigates (tested "my skills" → `/tools` end-to-end in the browser).
  - Hero: kicker color was `text-accent`, Figma bakes `#5b6b4b` = `text-muted` — fixed. Headline was responsive up to a 76px `md:` size; Figma desktop is a flat 56px — fixed (`text-[40px] md:text-[56px]`, dropped the intermediate `sm:` step). Subhead copy was stale marketing copy ("A working shelf...") — replaced with Figma's actual line ("I like building with my hands (and my keyboard) and exploring new ways of problem solving.").
  - **Not touched:** the decorative lattice (`ProjectsLatticeDecor`) — Figma's blueprint-grid uses different exact coordinates, but the current hand-placed marks already follow the same grammar (thin rules, one bracket, dots, hollow squares in open space) and this is pure background dressing; re-deriving exact Figma lattice coordinates was deprioritized against the higher-value fixes above given the remaining task list. Flagging as a minor, acceptable gap.
  - [x] **#40** Fix stale status text — FIXED as part of #33 above. Figma's real tags: waveform row = `FLAGSHIP · PRE-BETA` (panel = `FLAGSHIP · PRE-BETA · WAITLIST Q3`), stumble/bookshelf/rainier = `LIVE` (was "DEPLOYED"/"SHIPPED"), ryos = `INSTALL` (was "LIVE SYSTEM"), skills = `REPO` (was "ARSENAL"). Also fixed two stale names to match the frame: "RyOS Starter Kit" → "RyOS Capsule", "Rain or Rainier?" → "Rain or Rainier" (Figma drops the "?" on this page consistently across all 4 frame dumps).

- [x] **#34** Tools — reconcile to `16:2`. FIXED — layout/style only, `detail` copy untouched.
  - Root cause: `lib/tools-data.ts` already had a fully-correct `playbookHero` export (kicker/title/intro transcribed from `971:12-14`) AND `InstallBar`/`CopyButton` were both explicitly documented ("serves both the hero bar and the per-skill install boxes") to support a hero-level install-all bar — but `app/tools/page.tsx` never used any of it. It shipped its own hardcoded placeholder hero copy ("An evolving arsenal." / "// tools & skills") and had no install-all bar at all. Rewired the page to import and render `playbookHero` + `INSTALL_ALL`, and added the missing hero `InstallBar` + "or grab any single one below" hint row (Figma `971:15-19`) between the subhead and the filter chips.
  - Headline was responsive up to `md:text-[76px]`; Figma's actual size (confirmed via `get_design_context` on the text node directly) is a flat `60px`, single line — fixed to `text-[40px] md:text-[60px]`. Subhead bumped `17px`→Figma's real `18-20px`.
  - Checked row/panel internals against Figma node-for-node (`/research` row name, tagline, use-case heading/body) — sizes were **already pixel-exact** (19px Fraunces name, 14px tagline, 15px use-case heading, 14px use-case body — previous work had already nailed these). The `#40b` "font sizing" complaint traces mostly to the missing/wrong hero, not the row internals.
  - Real mobile bug found and fixed: `SkillRow`'s tagline was `hidden sm:block` — **fully invisible below 640px**, i.e. on every real phone. Figma's mobile mock stacks name-above-tagline (not hidden). Restructured `SkillRow` to `flex-col` (stacked, tagline visible + wrapping) below `sm:`, `flex-row` (inline, tagline truncated) at `sm:` and up.
  - **Files:** `app/tools/page.tsx`, `components/skill-playbook.tsx`.
  - **Verified:** `npm run build` clean. Screenshotted `/tools` at 1440px and 375px, both themes. Hero, install-all bar, filter chips, and the `/research` row+panel all match the Figma screenshots closely. Tagline now visible and wrapping correctly on mobile. Console clean in all four states.

- [x] **#35** About (`61:2`) + Methodology (`76:2`) — headings and copy sizes to match the recent Figma resize. VERIFIED ALREADY CORRECT — no changes needed.
  - Root-cause check: I assumed this would need fixes like #31/#33/#34 did, so I pulled `get_design_context` directly on the live headline/body text nodes for both pages, both breakpoints, and diffed against the shipped `text-[…]` values rather than trusting the plan's premise. Every one came back an **exact match**: About desktop headline 58px/tracking -1px (`71:47`), About desktop bio 18px/leading-28px (`71:48`), About mobile headline 48px (`1006:57`), About mobile bio 31px/leading-46px (`1006:58`), Methodology headline 52px (`1036:3`), Methodology intro 14px/leading-29px/`text-ink` (`1036:4`), and `GlanceCard`'s internal label/caption/body offsets (24px/182px/204px/76px) all matched their Figma positions exactly. I also expected Methodology's "THE ARC" + "AT A GLANCE" sections to need a structural rebuild (the metadata looked like a 4-step timeline + 3-card layout I didn't recall seeing) — turned out `components/methodology-arc-timeline.tsx` and `lib/methodology-data.ts` already implement all of it correctly (4 steps, the KNOWS chip, all 3 glance cards with correct copy) — I'd misjudged from an earlier skim, not from evidence.
  - Screenshotted both pages at 1440px and 375px, both themes — visual match to the Figma screenshots confirmed, no console errors.
  - This item was very likely already completed in an earlier session pass that predates this one; the plan's "recent Figma resize" language may just not have been checked off yet. Recording it as done now that it's verified, not assumed.

- [x] **#45** Body text sizing — About and Projects body copy is too small to read comfortably. FIXED. Projects: row summary/tagline and panel blurb bumped (see #33 above). About: checked desktop directly against Figma first — already an exact 18px match, left alone; About **mobile** bio bumped 31px/46-leading → 35px/52-leading (see #52 below, same change covers both — the two tasks turned out to be one edit). Divergences logged.
  - **Files:** `app/about/page.tsx` (mobile bio + downstream layout), `components/projects-showcase.tsx`, `lib/projects-data.ts` (already covered under #33).

### Round-2 mobile feedback (Ryan, 2026-07-25, reviewing preview `mx438taaa` on iPhone)

- [x] **#49** Home mobile — **project tile imagery does not match Figma.** FIXED. Pulled the real vector geometry from `module · project-cards` (`578:4` light / `578:137` dark, Design Language page) via `get_design_context` + raw asset downloads (24 unique path/circle assets — every stroke, dot, chip pin, book spine). Rebuilt all four `*Motif` components in `components/project-tile.tsx` with the exact Figma `d` paths/rects/circles (translate-wrapped per element, not hand-copied-with-offset — one arithmetic slip on the Rainier gold diamond was caught and fixed by switching to a `<g transform>` instead of manual coordinate math). Each motif now uses its own true Figma bounding box as viewBox (no more forced-uniform 120×66 aspect ratio) — `on-card-muted` (currentColor default) for dim strokes, `on-card` for bright strokes, `accent` for gold. **Note:** confirmed via Figma that on-card gold in both the light AND dark project-card exhibits bakes the identical `#C9A85A` hex (not light's page-level `#A18A2E` accent) — i.e. gold-on-card reads as theme-invariant in Figma. Kept the existing `fill-accent`/theme-token convention anyway (matches waveform-banner/arsenal-chips sibling components already shipped) rather than hardcoding, to avoid a new cross-component inconsistency; flagged for awareness, not fixed (out of scope — would touch multiple already-"done" components).
  - **Files:** `components/project-tile.tsx`.
- [x] **#50** Home mobile — **Methodology tile image does not match Figma.** FIXED. The real "methodology · network" module (`374:137` desktop light / cross-checked against `1003:103` dark) is a genuine 33-node constellation + 74-edge mesh (two opacity/weight tiers), not the 15-node schematic I'd guess-drawn earlier. Extracted exact node positions from `get_metadata` and exact path/circle/color data via `get_design_context` + raw asset downloads; rebuilt `components/methodology-card.tsx` from scratch as one `viewBox="0 0 205.2 298.8"` SVG (the card's real Figma size) with: 74 mesh edges (currentColor=on-card, two opacity tiers 0.4/0.7), 6 ringed "major" nodes + 8 medium + 15 minor solid nodes, a big dashed halo ring, and a core ring+dot in `#94854A` — a one-off dim-gold baked identically in both Figma frames that doesn't map to any existing token, so it's hardcoded rather than approximated with `accent`. Dropped one redundant Figma layer (374:243, a solid disc filled the exact same hex as the card background — a no-op in light mode, no confirmed dark-mode content, safe to omit). Card is now `absolute inset-0` full-bleed art behind the title/footer text (was a flex-stacked icon-only box before).
  - **Files:** `components/methodology-card.tsx`.
- [x] **#51** Home mobile — **excessive trailing whitespace.** FIXED. Confirmed via Figma metadata that `mobile_buttons` starts at y=2128 in the 2360-tall mobile artboard (both light `164:3`/`190:927` and dark `403:2`/`403:107`). Changed `ZoomableStage width={1054} height={2360}` → `height={2128}` in `components/home-mobile-mock.tsx`, matching the same crop-to-content-end pattern `/about` and `/methodology` already use. `zoomable-stage.tsx` itself untouched — only the height prop passed to it changed.
  - **Files:** `components/home-mobile-mock.tsx`.
  - **Verified (all three, together):** `npm run build` clean (13/13 routes, no TS errors). Checked `/` at desktop 1440px and mobile 375px, both themes (toggled live in-browser): all four tile motifs render the correct real geometry (Stumble ridge, Rainier peaks+rain+diamond, Bookshelf spines+broadcast, RyOS chip+network+compass+folder), Methodology card shows the full mesh/halo/core, and the mobile page now ends just below the crew polaroid with a reasonable margin above the fixed bottom nav (previously ~81px of dead space, confirmed via `document.body.scrollHeight` before/after: 934→853 at 375px width). `read_console_messages(onlyErrors)` clean in both themes.
- [x] **#52** About mobile — body text slightly bigger, AND **the whole page must fit above the bottom nav bar fold** on a phone. FIXED.
  - Bumped mobile bio to 35px/52-leading (from Figma's 31/46), shrunk the headshot 440×440 → 360×360 (artboard px) to make room, shifted the headshot/crew/social/get-in-touch/email/consulting block up to close the resulting gap, and trimmed the mobile stage's own excess bottom padding (artboard height 1818 → 1750, mirroring the #51 home-mobile crop technique).
  - **Verified precisely, not by eye:** measured `document.body.scrollHeight` vs `window.innerHeight` at 375×812 (iPhone 12/13 mini logical viewport) via injected JS before and after. Before any change: 819 vs 812 (7px overflow — confirms Ryan's collision report was real, if narrow, even before the readability bump made it worse). After: **812 vs 812, exactly 0px overflow.** Screenshotted both themes — headshot, crew polaroid, social pills, email pill, and consulting line all render cleanly above the fixed nav bar with visible clearance, no collision.
  - Desktop untouched (only the `md:hidden` mobile branch was edited) — reconfirmed via screenshot.
  - **Files:** `app/about/page.tsx`.
- [x] **#40b** Projects + Tools — Ryan re-flagged both: **still not updated text / font sizing.** FIXED as part of #33 + #34 above (see those entries for detail): Projects rows gained the missing summary+tagline lines and switched the name to the correct mono font; Projects hero headline dropped an oversized 76px breakpoint for Figma's real 56px; Tools hero was rewired to real copy at the correct 60px size (was hardcoded placeholder copy at 76px); Tools row taglines were fully invisible on real mobile widths (`hidden sm:block`, a `<640px` bug) and now show, stacked under the name.

### Round-3 mobile feedback (Ryan, 2026-07-26, reviewing live preview on his phone)

- [x] **#54** Writing tile artifact does not match Figma — the image plate and skeleton lines were wrong. FIXED.
  - Root cause: `components/writing-tile.tsx` was a hand-guessed flexbox skeleton — it never pulled the real Figma `writing_block` geometry. The "image" was just a `border border-on-card-muted opacity-45` empty box (no fill at all → nearly invisible), and the rule-lines were `bg-on-card-muted opacity-45` (45% opacity washed them out). Structurally it also had the wrong line counts: 6 lines + 2 extra lines beside the image (Figma has 3), and it jumped straight from that block to the SYSTEMS/BUILDING footer with **no** lines underneath (Figma has exactly 4 lines under each label) and **no** middle band of 3 more rules (missing entirely).
  - Investigation: `writing_block` isn't its own Figma page/module — it only exists as an instance on the Home page (searched the Design Language page `578:2` "MODULES · v2" section per the task's suggestion; confirmed no standalone writing module lives there — Home is the sole source). Found all 4 theme/breakpoint instances via `get_metadata` on the Home desktop/mobile frames: desktop light `374:926`, desktop dark `1010:166`, mobile light `233:345`, mobile dark `403:295`. `get_design_context` on each returned the rule-lines + image plate as one flattened exported vector ("Group 4"); downloaded the raw SVG for all 4 (`get_design_context` asset URLs) and diffed the path data directly — confirmed mobile is an **exact uniform 1.25× scale** of desktop (every coordinate and every fill color match after ×1.25), which lines up exactly with how the component is already invoked: `Box w=187 h=198` on desktop (`app/page.tsx`) and `AtScaled natW=187 natH=198 k=1.25` on mobile (`home-mobile-mock.tsx`). So one set of desktop-space coordinates serves both breakpoints for free — no separate mobile branch needed.
  - Fix — rebuilt the component from scratch as absolutely-positioned children in the tile's native 187.2×197.6 desktop coordinate space, matching Figma's real geometry exactly: masthead + full-width rule, 3 decreasing-width skeleton lines beside a **64×40 image plate** (was previously unfilled), 3 more full-width-ish rules, the SYSTEMS/BUILDING standfirst, then **two 4-line skeleton columns** underneath (previously 0). Card fill switched `bg-card` → `bg-card-deep` (Figma's real fill is `#495A3D`/card-deep, not `#4F5F40`/card — a zero-risk swap since `card-deep` already exists as a token and is identical to `card` in dark theme). All rule-lines switched from 45%-opacity to **solid full-opacity** `bg-on-card-muted` (Figma's light rule color `#AEB8A0` is an exact match for that token) — the opacity reduction was the biggest single cause of the "too faint/sparse" complaint. The image plate uses `bg-on-card` (light) / `dark:bg-on-card-muted` (dark) — the closest existing tokens to Figma's exact plate hex (`#DCE0CB` / `#809BBB`), chosen over hardcoding per the task's explicit "use the project's existing theme tokens" instruction — verified via DOM that both give strong, real contrast against the card in their respective theme.
  - **Files:** `components/writing-tile.tsx` (full rewrite).
  - **Figma nodes used:** `374:926` / `1010:166` / `233:345` / `403:295` (Home page instances, light/dark × desktop/mobile).
  - **Verified:** `npm run build` clean. Verified via DOM (`getBoundingClientRect` + `getComputedStyle`), not just screenshots — plate `background-color` confirmed `rgb(232,235,221)` (=on-card) in light and `rgb(138,160,188)` (=on-card-muted) in dark; card `background-color` confirmed `rgb(73,90,61)` (=card-deep) in light and `rgb(42,61,84)` (=card-deep, identical to card) in dark; child count 19 matches the expected element count exactly. Screenshotted `/` and `/m` at 1440px and 375px, both themes (toggled live) — visually matches the Figma renders closely. Console clean in all four states.
  - **Not implemented (logged below):** the subtle offset "stacked paper" backing rectangle Figma bakes behind the card.

- [x] **#55** Mobile heading sizes too large on Projects/Tools vs Figma. FIXED.
  - Root cause CONFIRMED via Figma (not assumed): pulled `get_design_context` directly on the Projects mobile hero (`1006:112`, "Always tinkering.") and Tools mobile hero (`1006:126`, "Skills to make your own.") — both are **Fraunces Black 48px**, the same convention as Home/About/Methodology. The difference is architectural: About/Methodology/Home render mobile inside `ScaledStage`/`ZoomableStage` (1054-wide artboard scaled to `viewportWidth/1054` ≈ 0.356 at 375px), so their authored 48px renders at an **effective ~17px** on screen. Projects and Tools are real-px reflow pages with a hand-authored `text-[40px]` mobile heading, unconnected to Figma's 48px value and un-scaled — i.e. 40 real px vs ~17 effective px, more than 2× oversized. This is exactly the reported symptom.
  - Cross-checked About (`61:2`) and Methodology (`76:2`) directly in the running browser (DOM, not just source-reading): both render with computed/authored `font-size: 48px` inside their `ScaledStage`, confirmed matching Figma's mobile text nodes exactly — **no changes made**, reconfirming PLAN's existing #35 finding rather than trusting it blindly.
  - **Judgement call (per task instructions):** neither Figma's literal 48px nor the ~17px mock-scale-equivalent effective size works for Projects/Tools, because both would land at or below this page's own already-approved (#45) mobile body-copy size (17px Projects subhead, 18px Tools subhead) — that would collide with/invert heading-vs-body hierarchy rather than just "look smaller." Instead, derived each page's new mobile heading from Figma's real **heading:subhead ratio (48:32 = 1.5×)** applied to that page's protected, already-bumped body-copy baseline, then nudged Projects up slightly further so it still clears the featured-panel's own 28px title:
    - `app/projects/page.tsx` h1: `text-[40px]` → **`text-[30px]`** (mobile only; `md:text-[56px]` desktop untouched — already Figma-verified under #33).
    - `app/tools/page.tsx` h1: `text-[40px]` → **`text-[27px]`** (mobile only; `md:text-[60px]` desktop untouched — already Figma-verified under #34).
  - **Files:** `app/projects/page.tsx`, `app/tools/page.tsx`.
  - **Verified:** `npm run build` clean. DOM-confirmed computed sizes: Projects h1 30px (vs. the featured-panel's own h2 at 28px, and the 17px subhead — hierarchy intact); Tools h1 27px (vs. 19px skill-row names and 18px subhead). Screenshotted `/projects` and `/tools` at 375px and 1440px, both themes (toggled live) — mobile headings now read as clearly smaller, matching Ryan's "much smaller and better," while staying legible and dominant over body copy; desktop re-screenshotted and confirmed unaffected. Console clean in all four states.

---

## PHASE 1.5 — Canon alignment (Ryan's standing concern)

- [x] **#53** DONE 2026-07-29 — **DESIGN.md v1.2 shipped**: reconciles all 10 Fable-flagged stale items + the production-push changes (shared header, unified headings/margins, GRID retirement, AA token lifts, compact rows, og-card, metadata lane). Ryan's four closing calls: selected-row dot REMOVED from Figma (836:40/837:39 deleted — rail-only canon) · dim-gold #94854A RETIRED · Methodology margins matched to the shell line (content 160..1280, ArcTimeline rescaled to 1120, glance cards 360×240; exposed lattice trio nudged to 1320 for 24px clearance) · Fable low nits (home-mobile hero wrap, About-dark social glyphs) ACCEPTED and documented. Original note: **DESIGN.md ↔ Figma ↔ implementation are out of sync.** Ryan: "flagging as a minor concern we should circle back to by the end — the disconnect between the designs / final website and DESIGN.md. There should align." After the build settles, reconcile all three: update DESIGN.md to describe what actually shipped (including every deliberate divergence), so it stops being a stale third source of truth. Do this LAST, once the pages are final.
  - **Known canon change needed (from #59):** the retired `● GRID NN · 47°N · PAGE` footer tag. DESIGN.md still documents it as canon in at least three places (the footer description, the `footer-tag` type-ramp entry, and "every page ends with its grid coordinates — except home"). The About Figma frame (`71:2`) also still carries the literal GRID text node — Ryan's verbal instruction to retire it is ahead of both DESIGN.md and the Figma file itself, so this reconciliation needs to update DESIGN.md *and* flag the Figma file for a follow-up edit, not just describe what shipped.

---

## PHASE 2 — Assets

- [x] **#47** 🔴 **Shelf SVG regression.** FIXED. Re-exported both themes clean from Figma; no rasters, no page background.
  - Root cause (confirmed): the old files were a *region crop of the mobile home page* (ids suffixed `_164_2`, a `page · home · mobile · light/dark` group with a full-artboard `1054×2360` bg rect, one embedded base64 PNG). 1,599,167 / 1,599,014 bytes.
  - Fix: pulled the shelf as individual vector objects via `get_metadata`/`get_design_context`/`get_screenshot` on the "About Shelf" frames — light `197:982` (556.36×273), dark `403:127` (564.24×273), confirmed light/dark by screenshot (not assumed). Every leaf (shelf base 3-face plinth, Space Needle, Golden Gate, Empire State building, robot, paddleboard, book stack incl. masked spine-title text) downloaded as its own true vector SVG asset — one stray fully-hidden raster layer (a Mac-hardware product render, totally clipped+covered by vector faces, confirmed invisible) was identified and dropped rather than shipped. Recomposed both themes into one flattened SVG each via a small Python script (ids namespaced per-asset to avoid `<defs>` collisions; rotated pieces placed via center+`rotate()`; masked spine-title text via SVG `<mask mask-type="alpha">`, positioned in the mask-referencing element's local space — CSS `mask-position`/`mask-size` do not resolve in frame-relative coordinates, confirmed by isolated test). No manual redraws — 100% Figma-sourced vector data.
  - Result: `public/art/home/shelf-diorama.svg` 126,009 bytes, `shelf-diorama-dark.svg` 125,991 bytes (~92% smaller than the 1.6 MB originals). `grep -c '<image'` → 0 both files. No full-artboard or any full-viewBox background rect. Both parse as well-formed XML.
  - Verified: `npm run build` clean (all routes prerender). Visual check on `/` at desktop (350×171 box) and 375px mobile (mock-scale artboard), both themes (toggled live) — diorama renders complete (robot, Space Needle, Golden Gate, Empire State, paddleboard, book stack with all 3 spine titles readable) sitting transparently on the page color, no opaque block behind it. No console errors in any of the four states. `components/shelf-diorama.tsx` untouched (confirmed via `git diff --stat`, 0 changes) — its existing per-theme `<img>` swap needed no change.

- [ ] **#42** Feature images look **pixelated on mobile**. AUDITED, PARTIALLY FIXED — NOT fully resolved, root cause is bigger than the plan assumed. See notes below; needs a scoped follow-up decision from Ryan/orchestrator, not something to silently mark done.
  - **Source resolution:** 14 of the 17 skill covers in `public/art/skills/` are only **611×384px** (`research.jpg`, `design.jpg`, `think.jpg`, `pitch-me.jpg`, `primer.jpg`, `projector.jpg`, `mine.jpg`, `auto-mine.jpg`, `channel.jpg`, `claude.jpg`, `codex.jpg`, `pull-digg.jpg`, `events.jpg`, plus unused `ops.jpg`/`pull-feed.jpg`/`pulse.jpg`). Only `capsule.jpg`, `daily-brief.jpg`, `ink.jpg` are a real 1200×753.
  - **Bigger root cause found:** `next.config.mjs` sets `images: { unoptimized: true }` — Next's image optimizer is fully disabled site-wide, not just for this component. Confirmed live: the rendered `<img>` src is the raw `/art/skills/research.jpg` file with no `_next/image` query string, i.e. **every visitor gets the original file at its native pixel size, no responsive srcset, no format conversion (WebP/AVIF), regardless of the `sizes` prop.** Measured on a real mobile layout (375px viewport, DPR 2): the plate displays at 277px wide → needs 554px for a crisp 2× render; 611px source clears that narrowly, but **fails at 3× DPR (needs 831px)**, which is the majority of modern phones (all iPhones since 6S Plus except SE, most Android flagships).
  - **What I fixed:** corrected `sizes` on `FeaturePlate` to the real rendered widths (was a blanket `100vw` below 1280px, now `calc(100vw - 48px)` below `lg` / `464px` at `lg`+) and bumped `quality` to 90 — both currently inert given `unoptimized: true`, but correct and ready to start working the moment that flag changes, and harmless now.
  - **What I did NOT fix, deliberately:** did not flip `images.unoptimized`. The repo has both a `.vercel/project.json` and a fully-configured `netlify.toml` (`@netlify/plugin-nextjs`), so I can't be certain which is the live production host from inside this sandbox, and `sharp` (needed for Next's optimizer in a self-hosted/standalone Node context) isn't in `package.json`. Flipping this blind risks breaking image loading in production, which is worse than the current softness. **This needs a scoped decision** (confirm the real host, add `sharp` if self-hosting, or verify Netlify's own image CDN path) — flagging for Ryan/the orchestrator rather than guessing.
  - Re-exporting the 14 undersized covers at higher resolution would also fix this outright, but that means new Midjourney generations matching the existing approved art — outside this pass's tool access (code fixes only), not attempted.
  - **Files:** `components/skill-playbook.tsx`.

- [x] **#43** Feature-image plate should be **taller**, heights standardized across all skills (currently `aspect-[464/236]`). FIXED — changed to `aspect-[464/300]` (one shared ratio + `w-full` on every skill's `FeaturePlate`, so heights were already uniform across skills; the divergence Ryan approved is specifically the taller ratio itself). Verified in the browser at 1440px and 375px, both themes — plate is visibly taller/more prominent, no layout breakage, `pairs with` / `install this skill` blocks below still align correctly.
  - **Files:** `components/skill-playbook.tsx`.

- [x] **#20c-3** OG share card — SHIPPED to branch `feat/og-card` (2026-07-29), pending Ryan's test → merge. Designed in Figma (Design Language page, `og-card · light` 1161:2 / `og-card · dark` 1161:17), Ryan hand-tweaked (kicker → "// ai systems builder & product manager", shelf + lattice top-right). Built as a STATIC export, not a `next/og` JSX rebuild — pixel-identical to Ryan's frame, and satori can't render the shelf's masked 116-path SVG. `app/opengraph-image.png` + `app/twitter-image.png` (20KB palette PNGs) + alt files; `twitter.card` → `summary_large_image`; `OG_IMAGE` const in `lib/site.ts` spread into the four pages that define their own `openGraph` (Next shallow-merge drops file-injected images there — verified live before/after). Dark card kept at `public/og/og-card-dark.png` for a future swap. All six routes verified carrying og:image + twitter:image.

---

## PHASE 3 — Tracking

- [ ] **#21** PostHog — hand off to **Codex** via a `/capsule` (Ryan's call). Create the capsule after Phases 1–2 land so it carries the settled codebase state.

---

## PHASE 4 — Quality gates

- [x] **#48** Performance pass. AUDITED — one config finding needs a scoped decision (shared with #42), one cleanup flagged as a background task, everything else checked out clean.
  - **Fonts:** already optimal. `app/layout.tsx` uses `next/font/google` for all three families (Fraunces, Hanken Grotesk, Fragment Mono) — self-hosted at build time (no runtime Google Fonts request), `display: "swap"`, `latin` subset only, and only the specific weights actually used (600/900, 400/500, 400). No action needed.
  - **JS bundle:** reasonable for the site's scope. Largest chunk 220KB, framework 188KB, main 136KB, ~1.0MB total uncompressed static JS — nothing bloated, no red flags.
  - **Image weights — the big finding, shared root cause with #42:** `next.config.mjs` sets `images: { unoptimized: true }` site-wide, so Next's image optimizer, responsive `srcset`, and automatic WebP/AVIF conversion are all inert in production — every `<Image>` on every page ships the raw source file at full byte weight regardless of display size. Concretely: the 6 Projects cover images (`public/art/projects/*.jpg`, 1400×879–1600×1004, 220–330KB each, ~1.6MB total) are ALL mounted simultaneously for the cross-fade stack (only one is `opacity-100`, but all 6 sit in the same above-the-fold box, so Next's lazy-loading `IntersectionObserver` doesn't defer any of them) — meaning every Projects page visit downloads all 1.6MB regardless of which project they look at. Did not change this: the cross-fade is core to the tap-to-preview interaction Ryan explicitly likes, and trading interaction smoothness for a perf win felt like the wrong call without asking. **Not fixing `images.unoptimized` for the same reason logged under #42** — ambiguous production host (both `.vercel/project.json` and a full `netlify.toml` present), no `sharp` dependency for a self-hosted optimizer path. Needs one scoped decision, not a blind flip.
  - **Dead weight found and flagged (not deleted — see below):** `public/` carries ~11MB of leftover assets from the site's pre-redesign iteration with zero references anywhere in the active codebase (verified by exhaustive grep, excluding `_parked/`) — `hero-blueprint.png`, `stumble-ai-ss_{dark,light}.png`, `mixbank-demo-ss.png`, root-level `acquired-bookshelf.png` (a stale duplicate — the real one is `art/projects/acquired-bookshelf.jpg`, untouched), `api-infra-before-after.png`, `MusicCharts-dashboard.png`, `audio-fp-simple-workflow.png`, `ryan-profile.jpg`, five `placeholder-*` v0.dev scaffold files, the whole `public/models/` dir (two `.glb` 3D avatar files, ~3.8MB — leftover from the parked avatar-spike experiment DESIGN.md already says is deferred to a future project), `public/companies/` and `public/tools/` icon dirs, and the two superseded shelf PNGs (`shelf-diorama.png`/`-dark.png`, replaced by the SVGs in #47 but never deleted). Their only referrers — `lib/data.ts`, `components/blueprint-backdrop.tsx`, `components/project-card.tsx` — are themselves unimported anywhere. I attempted to delete these directly; the bulk `rm` was **blocked by the permission classifier** (bulk file deletion, correctly gated). Rather than route around that, I filed it as a background task (`task_8f4a9d51`, "Delete ~11MB of dead pre-redesign public/ assets") with the exact verified file list so it's a clean one-click job later — not committed, not deleted, just documented and queued.
  - **Files changed:** none for this item specifically (the `FeaturePlate` `sizes`/`quality` tweak under #42/#43 is the only touch that overlaps).
- [ ] **#22** Review pass — clean build, all 6 routes render, both themes.
- [ ] **#24** Claude testing block — Playwright e2e (`tests/e2e/navigation-stability.spec.ts`) + interaction/theme/nav-stability checks.
- [ ] **#23** Codex browser-use QA — single second-perspective pass (sequential, not a fleet).
- [ ] **#37** 🎯 **Fable 5 final pixel spot-check** — compare rendered screenshots against the Figma frames route by route, both themes, desktop + mobile; confirm every item in Ryan's voice memo was honored. Report deviations; do not silently "fix" by changing the plan.
- [ ] **#25** Ryan's final touch test — his review once all pages match designs/specs.

---

## PHASE 5 — Ship

- [ ] **#26** Per-area commits of WIP (nav / home / about / methodology / tools / metadata / assets) — **only when Ryan says commit**
- [ ] **#27** Merge to `main` + `vercel deploy --prod`
- [ ] **#28** Domain cutover to the new production deploy

---

## #56 — Social handles + real project links (orchestrator, 2026-07-25)

- **X handle → `@rywigs`** (Ryan corrected twice: `rywiggs` → `ryewigs` → **`rywigs`**, final). **LinkedIn → `/in/rywigs`** (was `/in/ryanwigley`). Updated in footer, projects, methodology, about-data, layout `sameAs` + `twitter:creator`, llms.txt.
- **Project links were all wrong** — stumble / bookshelf / rainier all pointed at the bare profile `github.com/hurleywgly`. Resolved against `vercel project ls`, `gh repo list`, and Ryan's own **live site** (`ryanwigley.com/projects`, which he confirmed as authoritative):

| Project | href |
|---|---|
| Waveform | `https://wavefrm.io` (already correct) |
| Stumble AI | `https://stumble-ai.com` |
| Acquired Bookshelf | `https://acquired-bookshelf.vercel.app` |
| Rain or Rainier | `https://rain-or-rainier.netlify.app/` ← live site, beats the GitHub repo |
| RyOS Capsule | `https://mc.ryanwigley.com` (already correct) |
| My Skills | `/tools` (internal, correct) |

`buildLabel` changed to "visit the site" for the three that now point at live products rather than repos.

---

## #57 — Tools nav icon: hollow-shield regression (Ryan, 2026-07-26)

Ryan: *"tools icon not matching up with Figma SVG."* Shipped icon was a solid filled shield (a flat gold blob) with a small sword nub poking out the top — the hollow-shield-with-sword-inside reading was completely lost.

**Root cause — correction to #30 above.** The `#30` note "tools-crest mask stripped (Chromium mis-clip)" was WRONG and has been struck through there. That mask (or the equivalent stroke) is not redundant edge reinforcement — it's what produces the shield's hollow interior. A librsvg static render happened to look the same with and without it, which is what led to the bad call; Chromium's actual rendering was never re-checked before the mask was deleted. **Do not strip masks/strokes from these icons on the strength of a static-renderer diff alone.**

**Fix.** Re-pulled from Figma (`sGFjHbsFwMriSNcfT7TQrc`), preferring `197:941` (`playbook_icon`, home MOBILE frame) as source of truth over the module-kit `578:128` used originally. Downloaded the real exported SVG asset (`get_design_context` + `curl`, bytes inspected then inlined — not hot-linked) and found the shield boundary is authored as a native SVG `stroke` (`fill="none"`) rather than a filled silhouette behind a mask — simpler and more robust than restoring a `<mask>`, and it sidesteps the Chromium-mask-mis-render risk entirely. Replaced `ToolsIcon` in `components/nav-icons.tsx` with the verbatim `197:941` path data: the shield path is now `fill="none" stroke="currentColor" strokeWidth={5}`, viewBox updated to the source's native `0 0 64.1975 90.9259` (was `0 0 11.2967 16.4914`, the tight-cropped `578:128` box). The four sword sub-paths (blade, neck taper, pommel, crossguard) were already proportionally correct between `578:128` and `197:941`, so they carried over with the same shape, just re-sourced from the same export for internal consistency. `fill="currentColor"` on the root, `preserveAspectRatio="xMidYMid meet"`, and the non-square-viewBox convention are all preserved; callers (`site-nav.tsx` `h-4 w-auto`, `mobile-nav-bar.tsx` `h-[22px] w-auto`) untouched.

**Other four glyphs audited** (per Ryan's ask — the same mask-stripping transform touched all five icons in the `#30` pass, so any of them could be silently wrong). Pulled `get_design_context` + `get_screenshot` for `197:938` (home), `197:939` (projects — it's a rocket, confirmed), `197:943` (about), `935:11` (writing), and rendered the CURRENTLY SHIPPED code for all five side by side against the Figma screenshots in a throwaway comparison harness. Home, projects, about, and writing are clean matches to Figma as shipped — **no changes needed, confirmed fine.** Tools was the only one broken.

**Verification.** `npm run build` clean. Confirmed in the actual dev preview (not just the static comparison harness): zoomed the real rendered `<svg>` live in Chromium via a DOM-scale trick (not a screenshot crop) at desktop (~1400px, `site-nav.tsx`) and mobile (375px, `mobile-nav-bar.tsx`), both light and dark theme — hollow shield ring with the page background visibly showing through both interior lobes, solid blade/crossguard/pommel on top, matching `get_screenshot` of `197:941` side by side. Mobile active-state gold confirmed via computed style (`#A18A2E` light / `#C9A85A` dark, the `accent` token) — `mobile-nav-bar.tsx` applies `text-accent` to the icon directly when active. Desktop active state does **not** tint the icon gold by design (`site-nav.tsx` keeps the active icon at `text-ink`; gold is carried by the underline only) — pre-existing, correct, unrelated to this bug. `read_console_messages` clean on `/tools` and `/`. Grepped the repo for other `ToolsIcon`/`navIcons` consumers — only `site-nav.tsx` and `mobile-nav-bar.tsx`; `home-mobile-mock.tsx` renders the real `<MobileNavBar />` (not a hardcoded duplicate), so it inherits the fix automatically. Nothing left unverified.

---

## #58 — Desktop heading sizes converged across pages (Ryan, 2026-07-26)

Ryan: *"heading on desktop should match across pages. projects/tools/about are too big at the moment."*

**Root cause confirmed.** Figma itself is inconsistent page-to-page — each page's desktop frame was independently authored at a different literal heading size (previously verified against Figma, not re-guessed: Home 40px `#31`, Methodology 52px `#35`, About 58px `#35`, Projects 56px `#33`, Tools 60px `#34`). Home and Methodology and About all render their desktop content inside an `ExhibitStage width={1440}` pinboard that scales down uniformly below a 1440px viewport (`scale = min(1, containerWidth/1440)`); Projects and Tools are real-px reflow pages with no scale wrapper at all. Because all three `ExhibitStage` pages share the *identical* stage width, the same scale factor always applies to all three at any viewport — so their **authored** px values are directly comparable to each other, but not to Projects/Tools' literal unscaled px.

Measured live (not assumed) at 1400px viewport via `getComputedStyle` + walking the ancestor chain for `transform: matrix(...)` (same method the mobile pass used), before the fix:

| Page | Authored | Ancestor scale | Effective px @1400 |
|---|---|---|---|
| Home | 40px | 0.9722 (ExhibitStage) | 38.89px |
| Methodology | 52px | 0.9722 (ExhibitStage) | 50.56px |
| About | 58px | 0.9722 (ExhibitStage) | 56.39px |
| Projects | 56px | 1.0 (unscaled reflow) | 56px |
| Tools | 60px | 1.0 (unscaled reflow) | 60px |

Confirms Ryan's report exactly: Projects/Tools/About all rendered meaningfully larger than Home, and Methodology (not named by Ryan, but equally off) did too.

**Fix.** Converged every page's desktop `h1` on Home's own authored value, **40px** — the literal number, not the scaled-at-1400 figure, so it stays viewport-independent and matches "the heading size Home already ships." For the two `ExhibitStage` pages this is an exact effective match at any viewport (same scale mechanism as Home): Methodology `text-[52px]` → `text-[40px]`, About `text-[58px]` → `text-[40px]`. For the two reflow pages, set the literal desktop breakpoint to the same number: Projects `md:text-[56px]` → `md:text-[40px]`, Tools `md:text-[60px]` → `md:text-[40px]`. Mobile classes (`text-[4.554vw]` on Projects, `text-[27px]` on Tools, the `md:hidden` 48px stages on About/Methodology) were not touched — confirmed byte-for-byte via `git diff` on each edit.

Hierarchy sanity-checked before committing to 40px: Projects' featured-panel `h2` is 28px/`lg:32px`, its subhead is `md:17px`; Tools' skill-row name is 19px, its subhead is `md:20px`. 40px clears all of them with room to spare — no inversion risk.

**Files:** `app/methodology/page.tsx`, `app/about/page.tsx`, `app/projects/page.tsx`, `app/tools/page.tsx`.

**Verified — final effective desktop px, measured live post-fix at 1400px, light theme:**

| Page | Authored | Effective px @1400 |
|---|---|---|
| Home | 40px | 38.89px |
| Methodology | 40px | 38.89px |
| About | 40px | 38.89px |
| Projects | 40px | 40.00px |
| Tools | 40px | 40.00px |

All five within 1.11px of each other (the residual gap is the ExhibitStage pages' continuous scroll-driven shrink below 1440px vs. the reflow pages' flat breakpoint value — the two layout mechanisms can't track each other pixel-for-pixel below 1440px, and closing that gap would mean adding fluid/clamp sizing to Projects/Tools, which nothing in this task asked for). `npm run build` clean, 13/13 routes. Screenshotted all 5 routes at 1400px, both themes (`localStorage.theme` toggle + reload) — headings read as visibly matching page to page in every screenshot. Re-measured mobile (375px, fresh navigation so `ScaledStage`/`ResizeObserver` settle before reading): About 48px→17.08px effective, Methodology 48px→17.08px effective, Projects `4.554vw`→17.08px (unscaled reflow, computed directly), Tools flat 27px — all four bit-for-bit identical to their pre-fix values, confirming the just-approved (#55) mobile sizes were not touched. `read_console_messages(onlyErrors)` clean on all 5 routes, both themes.

---

## #59 — Desktop footer fixed; GRID coordinate tag retired site-wide (Ryan, 2026-07-26)

Ryan: *"Footer is incorrect on desktop (this based in... 'Grid XX' is going away)."*

**Scope decision.** Pulled `get_metadata` on the About canvas (`61:2`) to check the frame directly per the task brief. The About desktop light frame (`71:2`) still literally contains a text node named `"GRID 01 · 47°N · ABOUT"` (`1059:30`) plus its gold dot (`1059:31`) — i.e. **Figma itself has not been updated yet** to drop the tag; Ryan's verbal instruction is ahead of the design file. Per the task's explicit, unconditional instruction ("remove it from every page footer"), the GRID tag is retired in code regardless of Figma's current (stale) state — Figma needs the same edit but that's a design-side follow-up, not something this pass can do. The rest of the About footer (the `BASED · SEATTLE, WA` line, `71:2`'s `787:65`) matches the frame exactly and was left as-is; no other content occupies that footer row in the frame.

**Fix — GRID tag removed everywhere:**
- `components/footer.tsx` (shared component, used by Tools + the orphaned `page-placeholder.tsx`): dropped the `grid`/`page` props entirely and the `<p>` that rendered "GRID {grid} · 47°N · {page}"; the component now only renders the `locationOnly` (BASED line) vs. default (socials row) branch it already had.
- `app/tools/page.tsx`: `<Footer grid="03" page="TOOLS" />` → `<Footer />`.
- `app/projects/page.tsx` (bespoke `ProjectsFooter`, not the shared component): removed the "GRID 02 · 47°N · PROJECTS" `<p>`, kept the socials row.
- `app/methodology/page.tsx` (bespoke absolute-positioned footer row): removed `<GridFooterTag grid="12" page="METHODOLOGY" />` and its now-unused import, kept `<FooterSocials />`.
- `app/about/page.tsx`: removed `<GridFooterTag grid="01" page="ABOUT" />` and its now-unused import, kept the `BASED · SEATTLE, WA` line untouched.
- `components/grid-footer-tag.tsx` **is now fully unused** (grepped repo-wide, zero remaining references) — left the file itself in place per the task instruction; orchestrator to decide on deletion.
- **Unlisted but necessary:** `components/page-placeholder.tsx` — an orphaned component (zero importers anywhere in the repo, confirmed by grep, but still inside the `tsconfig.json` `**/*.tsx` include glob and therefore still type-checked by `next build`) was also calling `<Footer grid={grid} locationOnly={...} />`. Once `Footer`'s prop signature dropped `grid`, this call would have broken the build. Removed the now-dead `grid` prop from `PagePlaceholderProps` and its call site. Safe — nothing constructs or imports this component.

**Files:** `components/footer.tsx`, `components/page-placeholder.tsx`, `app/tools/page.tsx`, `app/projects/page.tsx`, `app/methodology/page.tsx`, `app/about/page.tsx`.

**Verified.** `npm run build` clean, zero TS errors. Repo-wide grep confirms zero remaining `GridFooterTag` usages, zero remaining `grid=`/`page=` props passed to `Footer`. Per-page confirmation, done structurally via DOM/accessibility-tree dumps rather than screenshots alone (more precise, and the in-session screenshot tool intermittently returned stale frames after any scroll — traced to a fresh browser tab starting at a 0×0 viewport until explicitly resized, not a site bug; worked around by resizing every new tab before use and cross-checking with `getBoundingClientRect`/`outerHTML`/the accessibility tree wherever a scroll-dependent screenshot looked suspect):
- Home: no `<footer>` element at all — confirmed still footer-less.
- About: BASED-line container div has exactly 1 child, no sibling GRID element; `/GRID\s*\d/i` regex against `document.body.innerText` returns false.
- Methodology: footer row div has exactly 1 child (`FooterSocials`); same negative GRID regex.
- Projects: the `contentinfo` (`<footer>`) landmark in the accessibility tree contains exactly 4 links — X, GITHUB, LINKEDIN, EMAIL — nothing else.
- Tools: `<footer>` `outerHTML` dump is byte-identical in structure to Projects' (shared `Footer` component), same 4 links, no GRID markup.

Screenshotted all 5 routes at 1400px, both themes (toggled via `localStorage.theme` + reload) — footers visually confirmed correct where scroll position allowed a clean capture (About, whose footer sits above the fold, was screenshotted directly in both themes). `read_console_messages(onlyErrors)` clean on every route checked.

**Note for #53 (DESIGN.md alignment):** DESIGN.md currently documents the retired tag as canon ("Footer: ... + `'● GRID NN · 47°N · PAGE'` right (gold dot)", plus the `footer-tag` type-ramp entry and the "every page ends with its grid coordinates" line) — all now stale and must be rewritten when #53 is done, to describe the footer as socials-row-left (or BASED-line-left on About) with no right-side tag. Also worth a design-side follow-up: the About Figma frame (`71:2`) itself still has the literal GRID text node — the source file, not just DESIGN.md, is behind Ryan's actual direction here.

---

## #60–#65 — Independent Codex QA pass on the LIVE site (Sonnet 5, 2026-07-27)

Codex ran a second-perspective QA pass against `ryanwigley.com` (production) and filed 6 items. Fixed **#60–#63**; investigated and reported without unilaterally changing **#64–#65**, per the task's explicit split (RyOS-link defect was already fixed by the orchestrator before this pass, not touched here).

### #60 (Medium) — FIXED. Projects mobile "tap again to launch."

Root cause: `ProjectRow`'s `onClick` just called `onSelect` unconditionally — a second tap on an already-selected row re-ran the exact same no-op selection, so there was no way to reach the row's `href` except via the separate `FeaturedPanel` link.

Fix: `components/projects-showcase.tsx` — `onClick` now runs a small `activate()` gate: if the row isn't yet selected, tap/click still only selects it (`onSelect()`, unchanged behavior); if it's **already** selected, the same tap/click navigates — `router.push(project.href)` for internal projects, `window.open(project.href, "_blank", "noopener,noreferrer")` for external ones (matches the existing external-link convention used by `FeaturedPanel`'s own anchor). `onMouseEnter`/`onFocus` still call bare `onSelect` and are untouched, so desktop hover-preview is unchanged — the only behavior change is that a click/Enter on a row that's *already* selected (via hover, focus, or a prior tap) now does something instead of nothing. `aria-pressed` and the rest of the button markup are unchanged.

**Verified via direct DOM events** (not simulated mouse clicks, which always fire `mouseenter` before `click` in a real/CDP-driven browser and would confound the "no-hover tap" case) — fresh page load, `390px` viewport:
- Initial: `waveform` row `aria-pressed=true` (default), `my skills` row `aria-pressed=false`, path `/projects`.
- Tap 1 on `my skills` (`.click()`, unselected): `aria-pressed` → `true`, path **stays** `/projects` — first tap previews only, does not launch.
- Tap 2 on `my skills` (already selected): path → `/tools` — second tap on the same row now navigates (internal case, `router.push`).
- Same two-tap sequence on `Stumble AI` (external): tap 2 called `window.open("https://stumble-ai.com", "_blank", "noopener,noreferrer")` with `location.pathname` unchanged (opens in a new tab, doesn't blow away the current one) — confirmed by stubbing `window.open` and inspecting the call args.
- Keyboard path: `onFocus`/`onMouseEnter` are byte-identical to before this change (only `onClick` was touched), so a focused-then-activated row exercises the exact same `activate()` gate as click — logically equivalent, not a separate code path. (A live Tab+Enter re-check was attempted but the automation tab's `document.hasFocus()`/`document.hidden` state made programmatic `.focus()` timing unreliable in-session — a harness limitation, not a product signal; the source diff is the stronger evidence here since `onFocus` was never edited.)
- Desktop hover-preview reconfirmed unaffected by inspection (`onMouseEnter={onSelect}` unchanged) and by the fact that every existing preview screenshot in this session (1280/1440px, both themes) still swaps the panel correctly on hover.

**Files:** `components/projects-showcase.tsx`.

### #61 (Medium) — FIXED. Nav no longer shifts between Home and other routes.

Root cause confirmed exactly as the task described: `/` drew its own `SiteNav`/`RwLogo`/`ThemeSwitcher` inside `ExhibitStage` (`app/page.tsx`), scaled by the stage's `scale = min(1, containerWidth/1440)` — while `components/header.tsx`'s shared `Header` rendered the SAME components at fixed, unscaled size on every other route, and was forced fully `invisible` on `/`/`/m` (present only to reserve layout height). Below 1440px the two diverged in size/position; Codex's 1280px measurement (Home `412×27` vs the rest `464×31`) is exactly that divergence.

Fix — took the task's suggested approach, mirroring the crop-the-chrome-band technique `/about`/`/methodology` already use (see the `DESK_TOP` comments in `app/about/page.tsx`):
- `components/header.tsx`: the desktop `<header>` strip is now **always real and visible**, on every route including `/` and `/m` — dropped the `exhibitRoute` gating for it entirely. Only the **mobile** logo+theme-switcher row and the `MobileNavBar` suppression stay conditionally invisible/suppressed on `/`+`/m` (renamed the flag `hideMobileChrome`), since `HomeMobileMock` still bakes its own chrome into the mobile artboard and renders the real `MobileNavBar` itself below `md` — that part was unchanged and untouched.
- `app/page.tsx`: removed the three in-artboard chrome `Box`es (logo/nav/theme-switcher) from the desktop branch entirely (and the now-unused `RwLogo`/`SiteNav`/`ThemeSwitcher` imports). Cropped `ExhibitStage` from `height={1024}` to `height={1024 - DESK_TOP}` with `DESK_TOP = 90` (the original chrome band's bottom edge — logo `Box` was `y=42 h=48` → bottom 90), and every remaining child's `y` shifts by the same `-DESK_TOP`, preserving Figma's authored gap between chrome and content (hero was 48px below the chrome bottom; it's still 48px below the new crop line). `<main>`'s `md:-mt-[81px]` (which canceled the invisible header's reserved height) is now `md:mt-0`, since the header is real/in-flow now — normal document flow handles the offset. The mobile `-mt-[76px]` and the whole `HomeMobileMock` mobile branch are untouched.
- `app/m/page.tsx`: same `md:-mt-[81px]` → `md:mt-0` fix, for the same reason (#63 below).

This is a deliberate divergence from the Figma home frame (which bakes its own chrome into the artboard, like every page's frame) — logged in the Divergence Log below, per the task's instruction.

**Verified — nav geometry, `nav[aria-label="Primary"]` `getBoundingClientRect()`, measured live via injected JS (not eyeballed):**

| Viewport | `/` | `/projects` | `/tools` | `/about` | `/methodology` | `/m` |
|---|---|---|---|---|---|---|
| 768px | `{x:113.59, y:24.75, w:463.8, h:30.5}` | identical | identical | identical | identical | not required, checked anyway: identical |
| 1280px | `{x:600.2, y:24.75, w:463.8, h:30.5}` | identical | identical | identical | identical | identical |
| 1440px | `{x:760.2, y:24.75, w:463.8, h:30.5}` | identical | identical | identical | identical | not required, checked anyway: identical |

Byte-identical (same `x`/`y`/`w`/`h` to 2 decimal places) across all 5 real routes at all 3 required breakpoints, and `/m` matches too (relevant to #63). Screenshotted `/` at 1280/1440px, both themes — hero/tiles/methodology/writing/arsenal/crew all still sit where they did before (confirmed against the pre-fix screenshots in this same session), just with the real header above instead of a scaled-in-artboard copy. `npm run build` clean; `read_console_messages(onlyErrors)` clean on all 6 routes × 4 breakpoints (375/768/1280/1440) × both themes (48 combinations).

**Files:** `components/header.tsx`, `app/page.tsx`, `app/m/page.tsx`.

### #62 (Low) — FIXED. `/tools` heading hierarchy no longer skips levels.

Root cause confirmed via a live DOM heading dump: `/tools` had exactly one `h1` (`app/tools/page.tsx`) and the only other heading anywhere on the page was `h4` (the per-use-case sub-heading inside an expanded skill panel, `components/skill-playbook.tsx`) — a straight h1→h4 skip, no h2/h3 anywhere.

Fix, in `components/skill-playbook.tsx`, visual sizes untouched:
- `SkillPlaybook`: added `<h2 className="sr-only">Skills</h2>` immediately before the filter-chips/accordion block — the filter chips and list have no visible section heading in the design, so this is screen-reader-only (Tailwind's standard `sr-only` pattern, already used elsewhere in the codebase e.g. `site-nav.tsx`), not a new visible label.
- `SkillRow`: wrapped the existing toggle `<button>` (name+tagline+categories) in `<h3 className="contents">` — the WAI-ARIA APG accordion pattern (heading *wraps* the button, not the reverse, which would put a heading inside interactive content — invalid content-model and not what any AT-tested pattern uses). `className="contents"` (`display: contents`) removes the `h3` from the box tree entirely so the **button** stays the actual flex item exactly as before — zero layout/visual change, confirmed via computed style (`h3` → `display: contents`; the button inside still carries `flex: 1 1 0%` exactly as before).
- The existing per-use-case `<h4>` inside `SkillPanel` needed no change — it was already correctly one level below where `h3` now sits.

Resulting order is a clean `h1 → h2 → h3 → h4 → h4 → h3 → h3 → … → h4 → h3 …` — increases never skip a level (the WCAG/axe "heading-order" rule only flags skipped *increases*; stepping back up to a shallower sibling level, e.g. `h4→h3`, is normal nesting and not a violation).

**Verified:** live heading dump (`document.querySelectorAll('h1,h2,h3,h4,h5,h6')`) over the full `/tools` page (all default-open panels expanded) shows the h1→h2→h3→h4 pattern with no skip anywhere in the list. Computed styles confirm zero visual change: row-name `span` still `font-size: 19px; font-weight: 600` (unchanged), use-case `h4` still `15px` (unchanged), `h2` confirmed truly invisible (`position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0)`). Screenshotted `/tools` at 1280px, both themes — pixel-identical to pre-fix screenshots in this session.

**Files:** `components/skill-playbook.tsx`.

### #63 (Low) — FIXED. `/m` now shows the shared desktop header at `md`+.

Root cause: `Header`'s old `exhibitRoute` check treated `/` and `/m` identically, force-hiding the desktop strip on **both**. `/m` has no desktop-specific content of its own (it's a standalone mobile-mock preview, rendered at any viewport width), so above `md` it had the scaled-up mobile mock with literally no navigation anywhere — a dead end, exactly as filed.

Fix: covered by the same `components/header.tsx` change as #61 — the desktop strip is now unconditionally real/visible on every route, so `/m` inherits it automatically without any `/m`-specific branching. Paired with the `app/m/page.tsx` `md:-mt-[81px]` → `md:mt-0` fix (see #61) so the now-visible header doesn't get overlapped by the mock content sliding up underneath it.

**Verified:** nav geometry on `/m` at 1280px measured **identical** to every other route (`{x:600.2, y:24.75, w:463.8, h:30.5}`, part of the #61 table above). Screenshotted `/m` at 1440px, both themes — real header strip on top (home/projects/tools/writing/about, theme switcher, gold underline on nothing since `/m` isn't a nav target), the scaled-up mobile mock below it, no overlap. `<md` behavior (real phone widths) is untouched — `HomeMobileMock`'s own baked chrome + real `MobileNavBar` still render exactly as before; this was never the broken part and wasn't touched.

**Files:** `components/header.tsx` (shared with #61), `app/m/page.tsx`.

### #64 (Medium) — INVESTIGATED. Partially fixed (muted/secondary tokens); gold accent reported, not changed.

Independently re-derived and **live-verified** (injected a WCAG relative-luminance/contrast calculator into the running page, walking each element's real composited background — not a static token diff) every ratio Codex reported, then ran a **full-page sweep** (every text-bearing element, every page, both themes) to check for anything Codex's spot-checks might have missed:

| Codex's finding | Live-measured (before) | Token pair |
|---|---|---|
| `/about` light gold labels ≈2.87:1 | **2.869:1** | `--accent` (`#a18a2e`) on `--bg`/`--surface` (light) |
| `/methodology` light small card text ≈3.34:1 | **3.34:1** | `--on-card-muted` (`#aeb8a0`) on `--card` (`#4f5f40`) — `GlanceCard` caption |
| `/tools` light feature-card body ≈3.61:1 | **3.613:1** | `--on-card-muted` on `--card-deep` (`#495a3d`) — `SkillPanel` use-case body + `PanelLabel` kickers |
| dark muted labels 4.14–4.29:1 | **4.137:1** / **4.289:1** | `--on-card-muted` (`#8aa0bc`) on `--card`/`--card-deep` (dark, identical hex) = 4.137; `--muted` (`#8295ab`) on `--surface` (dark) = 4.289 |

All four numbers matched Codex's report almost exactly, confirming both the defects and the measurement method.

**Fixed (permitted — muted/secondary tokens, not the brand gold):**
- `app/globals.css` — `--on-card-muted`: light `#aeb8a0`→**`#ced4c2`**, dark `#8aa0bc`→**`#92aac7`**. `--muted`: dark `#8295ab`→**`#879bb2`** (light `--muted` was already compliant everywhere checked, 4.86–5.19:1 — left untouched). Each is the minimal lighten that clears 4.5:1 against that token's **worst-case real background** (light `on-card-muted` is set by `--card`, the lighter/harder of its two surfaces — `--card-deep` clears with more room). Verified post-fix, live: `on-card-muted`/light on card **4.541:1**, on card-deep **4.913:1**; `on-card-muted`/dark on card **4.645:1**; `muted`/dark on surface **4.619:1**, on bg **5.015:1**.
- **Additional failure caught by the full-page sweep, not in Codex's 4 named items:** `components/projects-showcase.tsx`'s row tagline (`text-muted opacity-70`) — the `opacity-70` **compounds** with the text color when composited against its backdrop, and my first sweep pass (which didn't yet account for element-level `opacity`) initially under-reported it. Corrected calculation: **2.869:1 (light) / ~2.87:1 (dark)** — worse than any of Codex's named findings, and outside the "4.14–4.29" range they reported (their tooling likely didn't compound opacity either). Fixed by dropping `opacity-70` — `--muted` alone already carries the de-emphasis. Grepped the repo for other `opacity-7*` usage on muted-family text: this was the only instance.
- Re-ran the full-page sweep after both fixes, all 6 routes × both themes (12 passes, every text element, not just Codex's 4): **zero muted/on-card-muted/opacity-related failures remain anywhere.** The only failures left on the entire site are gold-accent text (see below) — confirmed exhaustively, not sampled.

**Investigated, NOT changed — the brand gold accent (`--accent`, `#a18a2e` light / `#c9a85a` dark):**

Measured every real gold-as-text usage found by the full-page sweep, live:

| Context | Light ratio | Dark ratio |
|---|---|---|
| Kicker/label directly on page (`bg`/`surface`) — `// about`, `GET IN TOUCH`, `Tools · The Arsenal`, etc. | 2.869:1 | 6.289:1 (passes) |
| "PODCAST EDITOR" kicker on the waveform banner's `card-deep` (forest, light) | **2.2:1** (worse) | 4.875:1 (passes) |
| Arsenal-chip arrow / "NEW" badge on `surface` | 3.058:1 | passes |

Dark theme's gold already clears AA everywhere it's used as text (6.29:1 / 4.88:1) — this is a **light-theme-only** problem. Did not touch `--accent` per the task's explicit instruction. Three concrete options, computed and cross-checked live (not estimated):

1. **Darken light `--accent` for all uses, flat swap.** A ~25% darken to `#7a6823` clears the page-bg case (2.87→**4.65:1**) — but the SAME swap makes the card-deep case *dramatically worse* (2.2→**1.36:1**, confirmed by testing the actual swapped value against `#495a3d`), because light theme's page (very light) and its forest card-deep (fairly dark) pull gold's required luminance in opposite directions — no single flat gold value can satisfy both AA floors simultaneously (page-bg needs L≤0.147; card-deep needs L≥0.583). **A flat swap is not viable** — it would trade one failure for a worse one.
2. **Two-tier gold: keep the current bright `--accent` for pure decoration (dots, the selected-row rail, underlines, chip-arrow glyphs, borders — none of which carry WCAG's *text* contrast minimum; most read as ≥3:1 non-text-UI-component contrast already), add a separate, darker gold *text* token for page-level kickers/labels (~`#7a6823`, 4.65:1 on page/surface).** This still leaves the on-card gold case (waveform banner kicker, 2.2:1) unsolved — neither theme's current gold, nor a straightforward darken/lighten, cleanly fixes it (tested dark theme's own gold `#c9a85a` swapped into light's card-deep: only 3.28:1, still fails 4.5 though clears the 3:1 large-text floor). That specific case likely needs its own bespoke on-card gold tuned by eye in Figma, not a formula.
3. **Move small kicker/label text off gold, keep gold only for decoration + any future large/display-size accents.** Gold's current value doesn't even clear the relaxed 3:1 *large-text* threshold (2.87<3.0), so "reserve for large text" alone isn't quite sufficient without also a token nudge — but since gold-as-headline-text isn't used anywhere today (headlines are already `text-ink`), this option mostly just means kickers/labels switch to `ink`/`muted` (both already AA-compliant everywhere) and gold becomes purely decorative (dots/rails/underlines/borders), sidestepping the text-contrast rule entirely. Simplest to implement, but a real, visible identity change — gold kickers are a recurring signature motif per DESIGN.md's chrome rule.

None of these is a one-line fix; recommend Ryan pick a direction (most likely option 2, since it preserves the current gold's role as *decoration* while fixing the parts that are genuinely *text* — but the on-card case needs a Figma-side follow-up regardless).

**Files changed:** `app/globals.css`, `components/projects-showcase.tsx`.

### #65 (Medium) — INVESTIGATED, not changed (Ryan's call — needs new art).

Confirmed Codex's numbers via `sips` (source files) and a live `getBoundingClientRect` read (rendered size), not assumed:

- **Source resolution, `public/art/skills/*.jpg`:** 14 of 17 covers (`research`, `design`, `think`, `pitch-me`, `primer`, `projector`, `mine`, `auto-mine`, `channel`, `claude`, `codex`, `pull-digg`, `events`, plus unused `ops`) are **611×384**. Only `capsule`, `daily-brief`, `ink` are **1200×753**.
- **Rendered size, live-measured:** the `FeaturePlate` `<img>` renders at **462×298 CSS px** at `lg`+ (≥1024px) viewport — matches the task's cited ~462×298 exactly. This is a fixed 464px column (`lg:grid-cols-[...]_464px]`) minus ~2px for the plate's own border; it doesn't grow further at 1280/1440px since the `sizes` attribute caps it at `464px` for the whole `lg`+ range, so `lg` is the single binding case (mobile's `calc(100vw-48px)` renders narrower and is less demanding).
- **Density:** 611/462 ≈ **1.32×** — confirms the task's "≈1.3× density" for the 14 undersized covers. Below 2×, so these upscale (softly, not broken) on any 2×+ DPR phone — the large majority of modern devices. The 3 covers at 1200×753 clear 2× (1200/462≈2.6×) comfortably but fall just short of 3× (needs 1386, has 1200).
- **Source resolution needed:** per the task's "≈2× rendered" target, minimum **~924×600px** (2× of 462×298, same ~1.55:1 aspect as the current art — no recrop needed, just higher pixel density) to be crisp on all 2× DPR phones; **~1386×900px** (3×) to also cover 3× DPR devices (most iPhones since 6S Plus, most Android flagships). Confirmed images ARE loading/rendering correctly in the browser (network requests 200/304, visually crisp at normal viewing distance in-session screenshots) — this is a softness-under-magnification issue on high-density phones, not a broken-image issue.
- **Did not regenerate art** — out of this pass's scope (no image-generation tool access here, and per the task's explicit instruction not to upscale existing files, which adds no real detail). This needs new Midjourney (or equivalent) generations at the target resolution matching the already-approved art style — Ryan's call on scheduling that.

**Files:** none changed (`components/skill-playbook.tsx`'s `sizes`/`quality` were already correct from PLAN.md #42/#48 — reconfirmed live, not re-touched).

### Verification summary (all of #60–#65)

- `npm run build` — clean, 13/13 routes prerender, zero TypeScript errors.
- All 6 routes (`/`, `/projects`, `/tools`, `/about`, `/methodology`, `/m`) × 4 breakpoints (375/768/1280/1440) × both themes = 48 combinations, `read_console_messages(onlyErrors)` — **clean on every one**.
- #61 nav geometry: byte-identical across 5 real routes at 768/1280/1440px (table above); `/m` matches too.
- #60 tap-to-launch: proven via direct DOM `.click()` sequencing (not simulated mouse, which confounds the no-hover mobile case) — first tap selects only, second tap on the same row navigates (internal) or opens a new tab (external, `window.open` args verified).
- #64: every fix verified with a live-injected WCAG contrast calculator, both before and after, not just recomputed by hand.
- **Bonus: ran the existing `tests/e2e/navigation-stability.spec.ts` Playwright suite** (not explicitly required by this task, but directly relevant to #61) against a fresh production build, `PLAYWRIGHT_BASE_URL=http://localhost:3000`, chromium. The most relevant test — CLS + consecutive-frame visual diffs across every route pair, both viewports (1440×1024/390×844), both themes — **passed**, with `shifts.all: 0` / `shifts.unexpected: 0` reported for literally every transition in the matrix (independent, automated confirmation of #61 beyond my own manual measurements). The SSR-footprint test also passed. One unrelated test ("client navigation resets scroll") failed — traced to a pre-existing assumption (`expect(scrollY).toBeGreaterThan(100)` after scrolling `/` to `document.body.scrollHeight` at 390×844) that doesn't hold given Home-mobile's already-tight content height (883px vs an 844px viewport → only 39px of scroll exists); that page height comes entirely from prior `HomeMobileMock`/`ZoomableStage` work (PLAN.md #51) this pass never touched, and the failing test only exercises the `<md` code path, which none of #60–#65's changes reach. Two further tests were mechanically skipped as a result (`test.describe.configure({ mode: "serial" })` in that spec) — not independent failures. Did not attempt to fix this pre-existing, out-of-scope test.
- One screenshot artifact noted for transparency, not treated as a defect: on `/methodology`, a screenshot taken immediately after a programmatic (non-animated) scroll intermittently showed a blurred/ghosted band near the top of the viewport. Checked live via DOM: `header`'s computed `position: sticky; top: 0px` and actual `getBoundingClientRect()` were correct in every case — this reproduces the exact "screenshots have produced false alarms in this project" pattern called out in the task brief (likely `backdrop-blur`'s compositor source going stale across an instant, non-interactive scroll jump in the automation harness — real interactive scrolling recomposites continuously and wouldn't show this). Not pursued further per the task's own guidance to trust DOM state over screenshots.

---

## ORCHESTRATOR REVIEW — Opus 5, 2026-07-25 (post Sonnet-5 build pass)

Independently re-verified the executor's work against Figma and against Ryan's session feedback. Build clean, optimizer live.

**Confirmed good:** #49 tile motifs are real Figma vectors · #50 methodology mesh matches frame `1003:103` · #51 home-mobile trailing space tightened (crew now sits just above the nav) · #52 About mobile bigger copy + fits above the fold (headshot present, smaller per logged divergence) · #33/#40/#40b Projects has new hero copy, larger body text, and the stale "deployed / live system" labels are replaced with "FLAGSHIP · PRE-BETA · WAITLIST Q3" · #34 Tools now uses the Figma-canon hero ("Skills to make your own." + install-all block) at readable sizes.

**Two false alarms I chased and cleared** (noting the method so Fable 5 doesn't repeat them):
1. Methodology mesh appeared to "bleed over" the title/footer — pulled Figma `1003:103` and the frame does exactly that. Intentional tarot-card look. Not a defect.
2. Crew polaroid and About headshot appeared missing in screenshots — both were artifacts: the first from editing `next.config.mjs` under a live dev server (Next needs a restart for config changes), the second from `next/image` lazy-load timing. DOM inspection (`getBoundingClientRect`) confirmed both render. **Verify images via the DOM, not a single screenshot.**

**#42 UNBLOCKED AND RESOLVED by orchestrator.** The executor left this partial, blocked on "which host is live / sharp not installed." Both premises were wrong:
- Host is unambiguously **Vercel** — `.vercel/project.json` is present and this session has deployed there repeatedly; `netlify.toml` is a leftover from commit `a8370f4`.
- **sharp IS installed** (0.34.5).
Fix applied: removed `images.unoptimized: true` from `next.config.mjs` and set `formats: ["image/avif","image/webp"]`. Verified the optimizer live — `/_next/image?url=…ryan-headshot.jpg&w=750&q=75` returns **43,974 bytes vs 155,506 raw (−72%)**, with proper srcset/DPR candidates. This is the actual fix for Ryan's "images seem fairly pixelated" note. Build clean with it on.

**Carried to final review (not fixed):**
- Figma's dim-gold `#94854A` for secondary marks (arrows, kickers, methodology core) is not in the token system; code uses the theme `accent`. Visually close, not exact. Would touch several shipped components — deliberately deferred.
- ~11 MB of dead pre-redesign assets in `public/` (executor verified zero references; bulk `rm` correctly blocked by the permission gate). Filed as background task `task_8f4a9d51`. Cleanup is safe but needs Ryan's go-ahead.
- `output: "standalone"` remains in `next.config.mjs` — a self-host artifact, harmless on Vercel.

---

## #66–#69 — Fable 5 final pixel-audit fixes (Sonnet 5, 2026-07-27)

Fable 5's final pixel audit of the LIVE site filed 4 items. All four fixed and verified via DOM (`getComputedStyle`, `getBoundingClientRect`, the Range API for line counts) at 375/1280/1440/1920px, both themes — per the task brief's explicit caution that screenshots alone have produced false alarms on this project before.

### #66 (Blocker) — FIXED. `/tools` mobile type hierarchy was inverted.

Confirmed the regression exactly as filed: at 375px, `/tools`' h1 (17.08px, the standard `4.554vw` mock-scale ratio) was SMALLER than its own intro (`text-[18px]`, real px) and smaller than every skill-row name (`text-[19px]`, real px). Root cause confirmed via `git show 64bc216`: that commit normalized Tools' h1 from a custom `27px` onto the shared `4.554vw` ratio ("Normalize the Tools mobile heading to the same 48/1054 vw ratio the other pages use") but only touched the h1 — the intro paragraph and `SkillRow`'s internal typography were left at their pre-existing real-px values, exactly as the task described. `/projects` had been converted in full (kicker/h1/body all vw) in an earlier pass and so kept its hierarchy intact; `/tools` had not.

Fix — brought every mobile-visible size on `/tools` onto the same artboard-px/1054 vw convention already used for the hero, pulling literal values from the Figma mobile playbook frame (`1006:99`) via `get_design_context` rather than guessing:
- `app/tools/page.tsx`: intro `text-[18px]` → `text-[3.321vw]` (Projects' own pattern, per the task's explicit instruction to copy it — Figma's own literal mobile intro is 32px/1054=3.036vw, so this is intentionally the #45 readability bump layered on top, not a strict re-derivation; logged in the Divergence Log).
- `components/skill-playbook.tsx`:
  - `SkillRow` name: `text-[19px]` → `text-[2.372vw] md:text-[19px]` (Figma `1006:210` etc.: row name is 25px/1054).
  - `SkillRow` tagline: `text-[14px]` → `text-[1.898vw] md:text-[14px]` (Figma `1006:211`: 20px/1054).
  - `SkillRow` category tag (only ever visible at `xl:block`, so inert on any mobile width): `text-[10px]` → `text-[1.356vw] md:text-[10px]`, derived proportionally (no Figma mobile reference exists for it).
  - `PairsWith` chip text (inside the expanded panel): `text-[10px]` → `text-[1.708vw] md:text-[10px]` (Figma `1006:374` etc.: 18px/1054).
  - `SkillPanel`'s `InstallBar` code + button text: `text-[12px]`/`text-[11px]` → `text-[1.708vw] md:text-[12px]` / `text-[1.708vw] md:text-[11px]` (Figma `1006:383`/`1006:385`: 18px/1054). The install `<code>` block already wraps (`whitespace-pre-wrap break-all`, `components/install-bar.tsx`), so shrinking its text on mobile carries no overflow/clipping risk — confirmed by inspecting the component before editing.
  - Only font-size classes were touched — no container heights, paddings, or the `hidden…xl:block` display gating changed, so desktop (`md:` and up) is provably unchanged except where I intentionally added the `md:` revert value equal to what was already there.

**Verified — measured live at 375px (both themes, identical since color tokens don't affect size):**

| Element | Before | After |
|---|---|---|
| h1 | 17.08px | 17.08px (unchanged — task explicitly said do not raise it) |
| intro | 18px | **12.45px** |
| skill-row name | 19px | **8.895px** |
| skill-row tagline | 14px | **7.12px** |

Descending order confirmed: **h1 (17.08) > intro (12.45) > row name (8.895) > row tagline (7.12)**. At 1280px (desktop, unaffected): h1 35.56px, row name 19px, row tagline 14px, 3 panels open — all identical to pre-fix. `npm run build` clean.

### #67 — FIXED. `/tools` mobile now opens exactly 1 skill panel (was 3).

Confirmed the defect exactly as filed: `defaultOpenSlugs` (`lib/tools-data.ts`) is `["research","projector","daily-brief"]`, unconditionally applied on every viewport. Re-pulled `get_design_context` on the mobile playbook frame (`1006:99`) to confirm Figma's intent directly rather than trust the task's paraphrase: the mobile mock shows exactly one expanded card (`/research`, node `1006:357`, "expanded · /research") — every other row is collapsed. Matches `DESIGN.md`'s `hygiene.mobile-deltas` line verbatim.

Fix, `components/skill-playbook.tsx` — SSR-safe, no hydration mismatch:
- `SkillPlaybook` still initializes `openSlugs` from `defaultOpenSlugs` (all 3) for both the server render and React's first client render, so server and client agree on the very first paint — no mismatch.
- A `useEffect` (fires only after mount/hydration) checks `window.matchMedia("(max-width: 767px)")` — the same `md` cutover used everywhere else on the page — and if it matches, narrows `openSlugs` to `new Set([defaultOpenSlugs[0]])` (`"research"`, derived from the existing constant rather than a new hardcoded literal, so it stays correct if the desktop default set is ever reordered).
- Desktop is untouched: the effect no-ops above 767px, so all 3 stay open exactly as before.
- Known, accepted trade-off (the task's own suggested implementation explicitly allows this): because the narrowing happens post-mount, there is a brief first-paint flash of all 3 panels on mobile before JS settles to 1. This is the standard, unavoidable cost of the "render SSR default, then narrow on mount" pattern the task described as acceptable; a CSS-only alternative was considered and rejected because it can't cleanly distinguish "open by default" from "opened by a user tap" without new state, and would still ship all 3 panels' worth of markup either way.

**Verified:** fresh navigation to `/tools` at 375px → `document.querySelectorAll('[id^="skill-panel-"]')` returns exactly 1 element, `skill-panel-research`, in both themes. Same check at 1280px → 3 elements (`research`, `projector`, `daily-brief`), matching desktop's unchanged behavior. `read_console_messages` filtered for `/ydrat/` (hydration) → empty on every check, across both themes and a hard reload — no hydration warning. (An unrelated, pre-existing `next/image` "quality 90 not configured in images.qualities" warning appears for whichever cover images are actually mounted — present before this change too, `components/skill-playbook.tsx`'s `FeaturePlate` `quality={90}` prop predates this pass; not touched, out of scope.)

### #68 — FIXED. Home project-tile titles no longer wrap an extra line.

Confirmed the exact defect and cause: `components/project-tile.tsx` shared one `flex items-end justify-between gap-1` row between the title `<span>` and the arrow `<span>`, so the title's available width was squeezed by the arrow + gap to roughly 100px of the tile's 116px content box (140px tile − 2×12px `p-3`) — just short of what "STUMBLE AI" and "STARTER KIT" need at 16px mono uppercase.

Pulled `get_design_context` on the Figma source (`module · project-cards`, `578:4`) to confirm the real layout rather than guess: the title text node gets the tile's effectively full width, and the arrow is a SEPARATE node pinned near the top-right corner, at the same height as the title's first line, regardless of whether the title is 1 or 2 lines (its `x` position is identical — ~121px into a 140px tile — whether the paired title is "STUMBLE AI" or the 2-line "ACQUIRED/BOOKSHELF").

Fix, `components/project-tile.tsx`: replaced the shared flex row with a `relative` container; the title `<span>` is now `block w-full` (gets the full box, wraps only where Figma's own line breaks say it should); the arrow `<span>` is `absolute right-0 top-0` (pinned to the corner like Figma, out of flow, so it never steals width from the title and can never collide with a wrapped second line since it only ever sits beside line 1). No container heights/padding changed — the outer tile's `flex-col justify-between` already absorbs the info row's height either way.

One Figma-vs-code discrepancy noted but NOT acted on: `578:4`'s RyOS tile has no separate arrow text node (only 3 of 4 tiles do in Figma), while shipped code renders one on all four, matching DESIGN.md's "title + arrow" convention. Logged in the Divergence Log rather than silently dropping an arrow with no stated reason.

**Verified via the Range API** (`Range.selectNodeContents` + `getClientRects()`, grouping by rounded `top` to count distinct visual lines) on the live rendered tiles — desktop natural size (140×128, `/`) AND the mobile mock (same component, scaled ×1.35 via CSS `transform`, `components/home-mobile-mock.tsx`), both themes:

| Title | Figma | Before | After |
|---|---|---|---|
| STUMBLE AI | 1 | 2 | **1** |
| RAIN OR RAINIER? | 2 | 2 | **2** (unchanged, already correct) |
| ACQUIRED BOOKSHELF | 2 | 2 | **2** (unchanged, already correct) |
| RYOS STARTER KIT | 2 | 3 | **2** |

All four confirmed at 1920px and 375px, light and dark. (One methodology note for future sessions: `getClientRects()`/`getBoundingClientRect()` reads taken immediately after a `resize_window` call with NO subsequent navigation can transiently catch `ZoomableStage`/`ScaledStage` mid-measurement — their scale starts at React state `0` and is set asynchronously by a `ResizeObserver` callback, which doesn't fire reliably while the tab reports `document.hidden`. A `computer` screenshot action forces a real paint and reliably un-sticks it; a fresh `navigate` at the target width sidesteps the issue entirely. Not a product bug — `ZoomableStage` already renders `visibility:hidden` during that window so real users never see it — but worth recording since it produced several false zero-rect readings during this pass before being traced.)

### #69 — FIXED. Desktop heading parity restored across all five routes, at every viewport (not just near 1440px).

Confirmed the exact mechanism the task described: Home/About/Methodology render inside `ExhibitStage width={1440}`, whose `scale = min(1, containerWidth/1440)` is a `transform: scale()` applied to the whole stage — meaning `getComputedStyle(h1).fontSize` alone reports the AUTHORED `40px` regardless of viewport (a `transform` doesn't change an element's own computed `font-size`); the true on-screen size has to be computed as `authored × ancestor-transform-scale`, walked up the DOM tree. Projects/Tools, by contrast, are real-px reflow pages with a flat `md:text-[34px]` (set by `64bc216`, itself already a regression from `#58`'s original flat-`40px` convergence) — which only coincidentally agreed with the stage pages' effective size near 1280px and diverged sharply above it.

Fix: `app/projects/page.tsx` and `app/tools/page.tsx`, h1 `md:text-[34px]` → `md:text-[min(40px,2.778vw)]` (`2.778vw` = `40/1440×100`). This CSS `min()` reproduces `40 × min(1, viewport/1440)` exactly — the identical curve `ExhibitStage` produces — at every viewport, not just at one anchor point. Confirmed `ExhibitStage`'s container is unconstrained by any wrapping max-width on the three stage pages (`el.clientWidth` tracks the full viewport up to 1440px, same reference frame `vw` units use), so the two mechanisms are directly comparable, not just coincidentally close.

**Verified — effective h1 size, all 5 routes, light theme (dark re-spot-checked, font-size doesn't vary by theme):**

| Viewport | Home | About | Methodology | Projects | Tools |
|---|---|---|---|---|---|
| 1280px | 35.556px | 35.556px | 35.556px | 35.558px | 35.558px |
| 1440px | 40px | 40px | 40px | 40px | 40px |
| 1920px | 40px | 40px | 40px | 40px | 40px |

All five within 0.002px of each other at every tested width (the residual is float-rounding between the two measurement paths — `transform: matrix()` scale readout vs. direct `vw` — not a real gap). This closes the ~15% gap (40 vs 34) the task reported at 1440px+, and the near-miss at 1280px is now an exact match rather than a coincidence. Measured via a script that walks each `h1`'s ancestor chain multiplying every `transform: matrix(...)` scale factor found, then multiplies by the element's own `getComputedStyle` font-size — necessary because a naive `getComputedStyle().fontSize` read (the first attempt) reports the stage pages' AUTHORED 40px unconditionally and would have falsely shown a mismatch at every viewport below 1440px. `npm run build` clean.

### Verification summary (#66–#69)

- `npm run build` — clean, TypeScript clean, all listed routes prerender.
- `/tools`, `/projects`, `/` (plus `/about`, `/methodology` for #69's cross-check) at 375/1280/1440/1920px, both themes (`localStorage.theme` + hard reload) — measured via DOM, not screenshots, per the task brief; screenshots were still taken at each state as a secondary visual sanity check and matched the DOM numbers in every case.
- `read_console_messages` filtered for hydration warnings — clean on every check. The only console warnings seen anywhere in this pass are the pre-existing, unrelated `next/image` "quality 90 not configured in images.qualities" notices on skill cover images — present before this pass (`quality={90}` in `FeaturePlate` predates it) and out of this task's scope; not fixed.
- Desktop (`md:` and up) typography and layout confirmed unchanged by #66/#68 via explicit before/after measurement, not assumption.

---

## DELIBERATE DIVERGENCE LOG

Ryan's standing instruction: *"If there's anything not pixel perfect and you think that's the right move based on my edits / our conversation, please stick with that but make a note for final review."*

Append every intentional departure from Figma here, with the reason. Fable 5's pixel pass reads this list and must NOT flag these as drift.

| # | Where | Divergence | Why |
|---|---|---|---|
| #43 | Tools feature-image plate | Taller than frame; heights standardized across skills | Ryan approved explicitly in voice memo |
| #45 | Projects rows + panel body copy | Bumped beyond Figma's literal px: row summary 13→14px, row tagline 10.5→11px, panel blurb 13.5→15px | Readability — Ryan: "I don't imagine a lot of people like to read text that small". Projects is a real-px reflow layout (no mock-scale), so these are direct, effective increases. About desktop body copy was checked directly against Figma and is already an exact match (18px) — no divergence needed there. |
| #45/#52 | About mobile body copy | Bumped well beyond Figma's literal artboard value: 31px/46 leading → 35px/52 leading | Same readability instruction. About mobile is mock-scale (ScaledStage, 1054→375 ≈0.356×), so the literal Figma number is not the effective on-screen size — 31px artboard renders at only ~11 real px on a 375-wide phone. Bumped the authored size so the *effective* rendered text is meaningfully bigger, not just the on-paper number. |
| #52 | About mobile headshot | Smaller than frame: 440×440 → 360×360 (artboard px) | Required to offset the taller bio above and keep the whole page fitting above the mobile nav fold. Verified empirically: `document.body.scrollHeight` at 375×812 (iPhone 12/13 mini logical size) went from 819px (7px overflow, pre-existing even before the readability bump) to exactly 812px (0 overflow) after also trimming the mobile stage's own excess bottom height (2068→2000 artboard px, i.e. cropped to just past the real last line, mirroring the #51 home-mobile crop). Crew polaroid and social/email/consulting block shifted up to close the gap the smaller headshot opened; horizontal positions unchanged. |
| #33 | Projects mobile | Interaction preserved over strict artboard fidelity | Ryan explicitly likes the tap-preview → tap-launch behavior |
| #54 | Writing tile card | Skipped Figma's offset "stacked paper" backing rect (second rounded-rect behind the card, offset +4.8/+7.2px, fill `#D4DBCA` light / `#2E4259` dark) | Purely decorative, not what Ryan flagged; dark's value exactly equals the `rule` token but light's has no token match; implementing it would need `overflow-visible` plumbing on the tile's home-page grid ancestor, risking sibling-tile alignment — deferred as a minor, low-value gap |
| #54 | Writing tile — dark theme | Image plate and rule-lines both render in the same token color (`on-card-muted` `#8AA0BC`) though Figma uses two subtly different one-off hexes (`#809BBB` plate vs `#7E92A9` rules) | Chose token consistency per this task's explicit "use the project's existing theme tokens" instruction over hardcoding two extra one-off hex values; the difference is subtle and both still read correctly (light plate vs muted rule) |
| #55 | Projects mobile heading | **SUPERSEDED by `64bc216` — void, do not flag.** The `text-[30px]` custom reduced size described below no longer exists in shipped code. `64bc216` ("Normalize the Tools mobile heading to the same 48/1054 vw ratio the other pages use") reverted Projects (and converted Tools) back to the STANDARD `text-[4.554vw]` ratio every mock-scale page uses — abandoning #55's original per-page custom ratio entirely. ~~`text-[30px]`, not Figma's literal 48px nor the ~17px mock-scale-equivalent effective size~~ | Historical reasoning, no longer applicable: Projects is a real-px reflow page (no mock-scale), so neither Figma number seemed directly usable at the time — 48px would be larger than the then-current bug, ~17px would sit at/below the page's own already-approved (#45) 17px body copy and invert heading/body hierarchy. Landed on Figma's real heading:subhead ratio (1.5×) applied to the protected body size, nudged up to clear the featured-panel's own 28px title. **This reasoning was superseded, not disproven** — `64bc216` chose cross-page ratio consistency over this page's own hierarchy math, which reopened the exact inversion #55 had solved (h1 4.554vw ≈17px fell BELOW the real-px 18px intro and 19px row names on `/tools`, Fable 5 finding #66). #66 (below) fixes the reopened inversion the opposite way — by shrinking the surrounding body/row copy onto the same vw ratio instead of giving h1 a special size — so h1 stays at the now-standard 4.554vw on both pages. |
| #55 | Tools mobile heading | **SUPERSEDED by `64bc216` — void, do not flag.** Same story as the Projects row above: the `text-[27px]` custom reduced size no longer exists. ~~`text-[27px]`, not Figma's literal 48px nor the ~17px mock-scale-equivalent effective size~~ | Historical reasoning, no longer applicable: same reasoning as Projects above, using Tools' own 18px mobile subhead × Figma's 1.5× heading:subhead ratio = 27px. **Superseded, not disproven** — see the Projects row's note; #66 resolves the reopened inversion by scaling the intro/row typography down instead. |
| #58 | Methodology / About / Projects / Tools desktop `h1` | **SUPERSEDED, twice over — void, do not flag.** Shipped code no longer uses a flat px on any of the four. ~~All set to a flat `40px`~~ was first changed by `64bc216` to Projects `md:text-[34px]` / Tools `md:text-[34px]` (Methodology/About untouched, still 40px in their `ExhibitStage`) — reopening the exact cross-page mismatch #58 had just closed, this time in the opposite direction (Projects/Tools rendering *smaller* than Home/About/Methodology above ~1280px, a ~15% gap at 1440px+, Fable 5 finding #69). #69 (below) supersedes that flat 34px with a fluid `min(40px, 2.778vw)` on Projects/Tools, which reproduces the `ExhibitStage` pages' own `40 × min(1, viewport/1440)` scale curve exactly — true parity at every viewport, not just near one anchor point. | Historical reasoning, no longer applicable: Ryan: "heading on desktop should match across pages ... too big at the moment." Figma itself is inconsistent page-to-page (5 different literal sizes across 5 pages, each independently verified against Figma in earlier passes: #31/#33/#34/#35) — converged all of them on Home's own size (the page Ryan didn't flag) per the task's explicit instruction, rather than chasing five different Figma numbers that don't agree with each other. **Superseded, not disproven** — see also #69. |
| #59 | Every page footer | GRID coordinate tag (`● GRID NN · 47°N · PAGE`) removed site-wide | Ryan: "'Grid XX' is going away." The About desktop Figma frame (`71:2`) still literally contains this text node (`1059:30`) — Figma has not been updated yet, Ryan's verbal direction is ahead of the file. Followed the explicit instruction over the (stale) frame; DESIGN.md and the Figma file itself both still need this canon change, flagged under #53 |
| #61 | Home (`/`) + `/m` desktop chrome | Dropped the in-artboard logo/nav/theme-switcher `Box`es from `app/page.tsx`; both routes now render the shared `Header` component (real, in-flow) instead of Figma's baked-into-the-artboard chrome. `ExhibitStage` crops 90px off the top of the 1024-tall frame (the old chrome band) and every remaining child's `y` shifts up by the same 90px | Codex #61: home's old in-artboard nav scaled with `ExhibitStage`'s responsive factor while every other route's nav didn't, so they measured different sizes below 1440px and navigation visibly "jumped" between routes — violating DESIGN.md's own stated canon that the header keeps a constant footprint on every route. Fix mirrors the exact crop-the-chrome-band technique `/about` and `/methodology` already use (`DESK_TOP` in `app/about/page.tsx`) for the identical reason. Figma's home frame still bakes its own chrome into the artboard — diverging from that is expected here, same as those other two pages |
| #64 | `--on-card-muted` (light + dark), `--muted` (dark) | Lightened: light `on-card-muted` `#aeb8a0`→`#ced4c2`; dark `on-card-muted` `#8aa0bc`→`#92aac7`; dark `muted` `#8295ab`→`#879bb2`. Also dropped `opacity-70` from the Projects row tagline (`components/projects-showcase.tsx`) | Codex #64: WCAG AA failures, live-confirmed (3.34–4.29:1 against real backgrounds, need 4.5:1). Each value is the minimal lighten that clears 4.5:1 against that token's worst real-world background, verified with an injected contrast calculator before and after. `--accent` (brand gold) deliberately NOT touched — reported 3 options with computed ratios instead, per the task's explicit instruction not to change it unilaterally |
| #66 | `/tools` mobile intro | `text-[3.321vw]`, not Tools' own Figma-literal mobile intro size (`971:12`'s mobile counterpart on `1006:99` is 32px/1054 = 3.036vw) | Copied `/projects`' intro treatment verbatim per the task's explicit instruction ("same pattern as `app/projects/page.tsx` — copy it"), which is itself the #45 readability bump (13→14px-equivalent) applied on top of Figma's literal ratio, not Figma's number directly. Slightly larger than a strict Figma re-derivation would give, consistent with the standing #45 precedent of favoring readability over literal fidelity for body copy |
| #66 | `/tools` mobile skill-row `category` tag | `text-[1.356vw]`, has no Figma mobile reference at all | The mobile playbook frame (`1006:99`) never shows the category tag (it's `hidden` below `xl:` in code, matching Figma, which has no mobile layout for it) — there is no literal value to convert. Derived proportionally from the row-name/tagline scale-down ratio instead of a Figma pixel. Zero visual risk: the value is inert below `xl`, where the real (unchanged) `md:text-[10px]` always applies once the element is actually displayed |
| #68 | Home project-tile arrow, `/ryos` tile only | Kept the mono `→` glyph on all four tiles | Figma's own `module · project-cards` exhibit (`578:4`) pairs an explicit arrow text node with 3 of the 4 tiles (Stumble/Rainier/Bookshelf: `578:12`/`578:21`/`578:31`) but has no corresponding node for RyOS (`578:47` is title-only) — visible in the Figma screenshot as a tile with no arrow. Treated this as a Figma-side authoring gap rather than an intentional per-tile difference: DESIGN.md's `project-tile` component entry and every other shipped tile carry "title + arrow" as one unit, and dropping it from exactly one tile with no stated reason risked reading as a new bug rather than a fix. Flagging for Ryan/Figma-side confirmation rather than silently matching the gap |
| #70 | Projects mobile rows | COMPACT rows (display-serif name + dashed leader + tag + arrow; no summary/tagline) vs the Figma mobile frame's full rows | Ryan (2026-07-29, screenshot): "implement a style that is like this, where there is less preview text shown." Desktop keeps the Figma-reconciled full rows. |
| #70 | Projects page | ~~"close all ×" control~~ REMOVED 2026-07-29 — Ryan: "close all button shouldn't appear here." Superseded by mobile landing with nothing selected (tap → preview → tap → visit), which makes close-all redundant. |
| #71 | About desktop | Text column at stage x=160, not the Figma frame's x=80 | Ryan (2026-07-29): About margins must match tools/projects — exhibit-shell (1280 max + 80 pad) puts their text edge at 160 for ≥1280px viewports. Verified equal (160=160) at 1440. Frame 71:2 keeps x=80. |
| #72 | Projects mobile | Lands with NO project selected (panel appears on first tap); desktop keeps flagship pre-selected | Ryan's intended flow: "tap, view the image w/ description then click once more to visit." Also fixes the hover-emulation bug where one tap selected AND launched. |
| #73 | Methodology desktop | Content box 160..1280 (frame: 80..1360); ArcTimeline rescaled ×0.875, glance cards 400→360 | Ryan (2026-07-29): match the exhibit-shell margins, same as About (#71). |
| #74 | Home mobile + About dark | Hero/subhead wrap points differ from artboard; social pill bar text-only in dark | Fable findings #4/#6 — Ryan: "accept." |
| _(add rows as you go)_ | | | |

---

## Standing constraints

- **No Workflow tool, no parallel agent fan-out, no background fleets.** That pattern spiked to 60–80 GB and crashed the machine. One task at a time, inline.
- **Do not commit** unless Ryan explicitly says to. The working tree holds deliberate WIP.
- **WIP is sacred** — never reset/checkout/stash without instruction.
- Verify visually before claiming done. "It compiles" is not "it matches."
