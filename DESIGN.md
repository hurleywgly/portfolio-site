# DESIGN.md — ryanwigley.com
# STATUS: v1.2 (2026-07-29) — SHIPPED. The Working Exhibit redesign is live at
# https://ryanwigley.com (production push 2026-07-25 → 2026-07-29). This
# revision reconciles the canon with what actually shipped: the doc had
# drifted from both the Figma and the site (PLAN.md #53). Deliberate
# code-vs-Figma departures live in PLAN.md's DELIBERATE DIVERGENCE LOG —
# auditors read that table before flagging drift.
# Source of truth: Figma "ryanwigley.com — Page Designs" (sGFjHbsFwMriSNcfT7TQrc)
#   — pages: Design Language (0:1) · Home (164:2) · Projects (40:2) ·
#     Methodology (76:2) · Tools · Skill Playbook (16:2) · About (61:2)
#   — Design Language holds the module kit ("MODULES · v2 — home-aligned",
#     578:2, incl. RULES v3 text 578:3) and the og-card frames (1161:2 light /
#     1161:17 dark)
#   — Live frames named exactly: `page · {slug} · {desktop|mobile} · {light|dark}`
#     slugs: home · projects · playbook · about · methodology

---
version: 1.2
name: Working Exhibit
description: Personal site of an AI-systems builder — a working exhibit of live systems.
status: SHIPPED — live in production; this doc describes what shipped

themes:
  # 2026-07-29 audit: three muted tones were lifted from the Figma values to
  # clear WCAG AA 4.5:1 (PLAN.md #64) — the palette below is the SHIPPED one.
  # Figma still carries the old values; treat code as canon for these three.
  light:
    bg: "#E9EEDF"            # pale sage page
    surface: "#F3F4E9"       # selected-row plate, panels
    card: "#4F5F40"          # forest module surface
    card-deep: "#495A3D"     # waveform banner, writing tile
    card-border: "#445239"
    on-card: "#E8EBDD"
    on-card-muted: "#CED4C2" # AA-lifted (Figma has #AEB8A0)
    ink: "#222B1A"
    muted: "#5B6B4B"
    rule: "#C7CDB4"          # hairlines / lattice lines
    diagram-line: "#98A48C"  # lattice nodes (dots, squares), diagram strokes
    accent: "#A18A2E"        # GOLD — light's true accent
    nav-icon: "#8A9478"      # writing icon + mobile bar glyph tone
  dark:
    bg: "#192B43"            # midnight page
    surface: "#1F3149"
    card: "#2A3D54"          # ONE slate family for ALL tiles (incl. banner)
    card-border: "#3E5573"
    on-card: "#DDE5EE"
    on-card-muted: "#92AAC7" # AA-lifted (Figma has #8AA0BC)
    ink: "#E4EAF1"
    muted: "#879BB2"         # AA-lifted (Figma has #8295AB)
    rule: "#2E4259"
    diagram-line: "#3E5573"
    lattice-mid: "#516885"   # lattice lines/nodes in dark — brighter than rule, never ink
    accent: "#C9A85A"        # gold
    nav-icon: "#7E92A9"
  # RETIRED (2026-07-29): the dim-gold #94854A Figma bakes into some secondary
  # marks (chip arrows, kickers, methodology core) is NOT a token. Gold on the
  # site is `accent`, full stop. Remaining #94854A fills in Figma are stale.

typography:
  display:  { family: "Fraunces",       weight: "Black",    usage: "page headlines, hero name" }
  title:    { family: "Fraunces",       weight: "SemiBold", usage: "tile/card titles, skill names, stat numerals, mobile project-row names" }
  body:     { family: "Hanken Grotesk", usage: "running text, descriptions" }
  label:    { family: "Fragment Mono",  transform: "lowercase or UPPER tracked", usage: "kickers, nav, captions, status tags, data, footers" }
  desktop-display: >
    ONE size across pages (Ryan 2026-07-25: "headings should match"). Stage
    pages author 40px inside the 1440 ExhibitStage; reflow pages use
    min(40px, 2.778vw) — the same effective curve at every viewport
    (verified within 0.002px at 1280/1440/1920). About keeps the frame's
    −2px optical x-offset on its h1.
  mobile-display: >
    Fraunces Black 48 at 1054-artboard scale on the mock-scale pages. Reflow
    pages (projects, tools) express mobile type in vw of the artboard so the
    EFFECTIVE size matches: h1 4.554vw (48/1054), kicker 2.467vw, body
    3.321–3.9vw. Judge effective rendered px, never authored px.
  body-readability: >
    Projects + About body copy ships LARGER than the frames' literal px —
    Ryan's readability call, logged in the divergence table. Do not "fix" back.
  never: italic

spacing: { base: 8, page-pad-x: 80, content-max: 1280 }
mobile:  { artboard: "1054 wide", margins: 80 }

# ————— THE FIVE RULES (v3, amended v1.2) —————
rules:
  emphasis-strategy: >
    LIGHT inverts: cards go forest on pale sage — contrast carries hierarchy.
    DARK stays in one slate tile family — gold + position carry hierarchy.
    Never powder-invert dark.
  accent-dosage: >
    Gold in small doses only: NEW badges, active nav item, selected-row rail,
    kickers, one link per cluster. Never large fills. Gold is `accent` only —
    the dim-gold #94854A is retired (see themes).
  lattice-grammar: >
    Thin rules + L-brackets + hollow squares + filled junction dots, placed
    UNEVENLY in open space between objects. NEVER hollow circles. NEVER even
    grids. No lattice line within 24px of a card edge or text block. Dark
    lattice uses lattice-mid #516885 — visible but calm.
  nav: >
    Labeled everywhere, lowercase mono, REAL hand-drawn glyphs (see
    components.nav-icons). Desktop: shared glass top strip on EVERY route —
    home projects tools writing about — active page underlined gold;
    theme-switcher top-right. Mobile: bottom bar, icon + label, active page
    gold. 'writing' is an external link to blog.ryanwigley.com (no site page).
  chrome: >
    Kickers: '// lowercase mono' in accent gold on every page. Section labels:
    UPPER TRACKED MONO. Footer: socials row 'X · GITHUB · LINKEDIN · EMAIL'
    (about swaps it for 'BASED · SEATTLE, WA' — its socials live in the pill
    bar). The '● GRID NN · 47°N · PAGE' coordinate tag is RETIRED site-wide
    (2026-07-25); the frames still draw it — stale, ignore. HOME IS
    FOOTER-LESS by design (front-door exception).

# ————— COMPONENTS (exhibits in Figma modules section) —————
components:
  project-tile:      "140×128 desktop / 190×172 mobile · V-A motif set exported
                      from 578:4 (light) / 578:137 (dark): stumble flat-S ridge,
                      rainier mountain+rain+gold diamond, bookshelf
                      spines+broadcast, ryos chip+network+compass+folder ·
                      UPPER mono title on the FULL tile width, arrow pinned
                      top-right (title and arrow never share a flex row —
                      that wrapped titles an extra line)"
  waveform-banner:   "flagship strip, card-deep; PODCAST EDITOR kicker ·
                      Fraunces title · glyph = breaker-curl + gold crest → 13
                      midline-mirrored bars (1 gold) · mono tagline 'raw audio
                      → finished episodes' guarded whitespace-nowrap (ONE line)"
  selected-row:      "surface plate (r6, rule border) + 3px gold rail on the
                      left edge + mono hint. Rail only — the gold marker dot
                      was removed from the frames 2026-07-29 (Ryan)."
  project-rows:      "desktop: mono lowercase name + tag + summary + tagline.
                      mobile: COMPACT — display-serif name + dashed leader +
                      tag + arrow, one line, no preview text (Ryan 2026-07-29);
                      the featured panel above carries the description"
  theme-switcher:    "pill pair top-right; sun-active in light, moon-active gold in dark"
  social-pill-bar:   "forest (light) / slate (dark) rounded bar, mono X ·
                      LinkedIn · GitHub — about page only; text-only in BOTH
                      themes (the dark frame's baked glyphs are an accepted
                      divergence)"
  methodology-book:  "tarot-style constellation card (33-node mesh from
                      374:137/1003:103); mesh intentionally runs under the
                      title and HOW I THINK footer"
  arc-timeline:      "gold-dot node timeline with mono step labels + KNOWS chip
                      — authored in an 1120-wide local space (the frame's 1280
                      scaled ×0.875 into the 160..1280 content box)"
  arsenal-cluster:   "kicker + 2×2 chips + browse link, one unit; /capsule keeps NEW badge"
  shelf:             "personality diorama — never shrinks; UNIQUE drawing per
                      theme; taps through to /about (with the crew polaroid)"
  crew-polaroid:     "pixel family portrait; unique art per theme; links to /about"
  nav-icons:         "REAL hand-drawn vectors, inlined currentColor SVG:
                      house · rocket · hollow shield with the sword visible
                      inside (197:941 — the shield's mask/compound structure is
                      load-bearing, do NOT 'simplify' it; that flattened it to
                      a blob once) · document-nib · profile bust"
  rw-logo:           "the real single-path monogram vector (164:103) via
                      currentColor; also the favicon set + og-card mark"
  og-card:           "1200×630 share card — frames `og-card · light` (1161:2) /
                      `· dark` (1161:17) on the Design Language page: sage/
                      midnight field, monogram, gold '// ai systems builder &
                      product manager' kicker, Fraunces name, tagline, domain,
                      shelf nested in the lattice bracket. Ships as a STATIC
                      export (app/opengraph-image.png + twitter-image.png) —
                      satori can't render the shelf's masked SVG, and the
                      export is pixel-identical to the approved frame. Edit in
                      Figma → re-export. Dark kept at public/og/og-card-dark.png."

# ————— FILE HYGIENE (for future agents) —————
hygiene:
  frame-naming: "page · {slug} · {desktop|mobile} · {light|dark} — all 20 live frames conform"
  structure-rule: "NEW work ships as named groups ('module · …'); don't restructure old flat frames"
  figma-stale-backlog: >
    Known frame-side staleness (code is canon): GRID footer tags still drawn ·
    selected-row summaries/taglines on the projects mobile frame (site ships
    compact rows) · three pre-AA muted tone values · #94854A marks · About
    dark bio wording differs from the locked light copy · mobile home frame
    underlines 'tools' in the bottom bar while home is active.
  mobile-deltas: "acknowledged: crew polaroid mobile-About only; 1 expanded
                  skill on mobile playbook vs 3 desktop; mobile footers exist
                  without the (retired) GRID tag; frame heights content-driven"
  archives: "Archive page holds the playbook VIDEO iteration (implement once
             videos exist). Annotation/note frames live left of page frames —
             never inside them."

# ————— IMPLEMENTATION (shipped conventions, v1.2) —————
implementation:
  mobile-model: >
    Mobile pages render the Figma mobile artboard at MOCK SCALE — a uniformly
    scaled 1054-wide stage (ScaledStage). Home's mobile render is
    HomeMobileMock (ZoomableStage: fit-scaling + OPT-IN pinch-zoom 1×–3×;
    landing state is always the full artboard at 1:1 fit, never zoomed).
    `/` mobile and `/m` share this component; /m is a standalone noindex
    reference route. The reflowed-native-mobile approach was tried and
    REJECTED — do not reintroduce it. Projects and Tools are the two
    deliberate reflow pages; their mobile type tracks the artboard via vw.
  chrome: >
    ONE shared glass header (bg-page/90 backdrop-blur) renders REAL and
    VISIBLE on every route including / and /m — nav geometry is byte-identical
    everywhere (the old invisible-header-on-exhibit-routes model is DEAD; it
    made navigation jump). Each page crops its frame's baked chrome band via a
    DESK_TOP offset instead. scrollbar-gutter: stable. Mobile bottom bar is
    md:hidden.
  margins: >
    Desktop text margin is unified on the exhibit-shell line (max-w 1280 +
    80px padding → text edge at (vw−1280)/2+80 for vw≥1280). Reflow pages get
    it from .exhibit-shell; stage pages place their content box at 160..1280
    stage coords (About text column x=160; Methodology full band 160..1280
    with the timeline rescaled and glance cards at 360×240, x=160+i·380).
    The frames' 80..1360 box is superseded.
  projects-interaction: >
    Desktop: hover previews (pointerType mouse only), click launches. Mobile:
    lands with NOTHING selected → tap previews (panel appears) → tap again
    launches. Hover/focus selection is guarded (mouse / :focus-visible) so a
    touch tap can't select-and-launch in one gesture. No close-all control.
  art-exports: >
    All artwork is exported from the real Figma nodes — never hand-drawn
    approximations, never page-region crops. Shelf ships as one composed
    TRANSPARENT SVG per theme (~126KB, zero rasters, no background rect);
    crew polaroid per theme as transparent PNG. A region export once smuggled
    a 1.6MB page background + embedded raster into the shelf — check for
    `<image>` tags and full-artboard rects on every re-export.
  metadata: >
    Title 'Ryan Wigley | AI Systems Builder' (+ '%s | Ryan Wigley' template) —
    deliberately NOT '& product manager' (that lives in the og-card kicker
    only; Ryan's call 2026-07-29). Site description: "A working exhibit of
    live systems, tools, and methods by Ryan Wigley, an AI systems builder and
    product manager using AI to simplify work and life." Self-canonicals per
    page; /m noindex → /; JSON-LD Person(#person, jobTitle 'AI Systems
    Builder', worksFor Raya) + WebSite + ProfilePage on /about; og-card on
    every route (pages defining their own openGraph must spread OG_IMAGE from
    lib/site.ts — Next's shallow merge drops file-injected images);
    twitter summary_large_image · @rywigs; llms.txt project one-liners mirror
    lib/projects-data.ts copy — sync on copy changes.
  skill-playbook: >
    lib/tools-data.ts `detail` content is sourced from the Notion page
    "Ryan's Skills" (371ae786…) — re-sync from Notion on copy changes, never
    author skill copy in code. 1 panel open on mobile / 3 on desktop; feature
    plates aspect 464/300 standardized (taller than frame, approved).
  ambient-motion: >
    EXPLORING, NOT YET CANON — subtle lattice-line animation only (draw-in,
    surveyor's dot, drift). prefers-reduced-motion honored. Lattice + dots
    only, never text/cards.
---

## Status

**Locked (1.0):** both themes · type roles · the five v3 rules · module kit ·
all 20 page surfaces · file hygiene conventions.

**Locked (1.1, 2026-07-24):** mock-scale mobile rendering · per-theme composed
art exports · real RW monogram · mobile display = Fraunces Black 48.

**Shipped (1.2, 2026-07-25 → 29):** production at ryanwigley.com. Amendments
codified above: unified shared header (invisible-header model retired) ·
unified desktop heading size + exhibit-shell margin line · GRID tag retired ·
AA-lifted muted tones, dim-gold retired · compact mobile project rows +
tap-preview interaction · og-card + full metadata lane · nav-icon/shelf/tile
art re-exported from source nodes · selected-row is rail-only. Every
deliberate code-vs-Figma departure: PLAN.md → DELIBERATE DIVERGENCE LOG.

## The design in one paragraph

A working exhibit: live systems pinned to a drafting-table canvas. A sparse
architectural lattice (rules, brackets, squares, dots — never circles, never
grids) fills the open space between objects. Work carries the visual weight;
decoration recedes. Light mode argues with contrast (forest blocks on sage);
dark mode argues with restraint (one slate family, gold pointing at what
matters). Labels and data speak Fragment Mono, headlines speak Fraunces, and
home just ends — no footer on the front door.

## What it is NOT

Not dark-glow SaaS. Not Inter + purple gradient. No glassmorphism (the one
glass surface is the header), no glow, no eyebrow pills, no decorative
numbering, no italic-serif hero, no icon-tile cards, no hollow-circle
ornaments, no even background grids. The sage/forest palette is earned
through structure.

## Provenance

Foundation 2026-06 → Home alignment 2026-07-07 → V-A tile artwork 2026-07-16 →
writing nav + image-first playbook 2026-07-17 → Ryan's redesigns + dark parity
2026-07-22 → v3 codification 2026-07-23 → implementation round + v1.1
2026-07-24 → **production push 2026-07-25→29: Figma reconciliation (real
nav/tile/shelf/methodology art from source nodes), SEO/metadata lane, Codex QA
+ Fable 5 pixel audit, OG card, margin/heading unification, copy pass — v1.2
codified 2026-07-29.**
