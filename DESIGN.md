# DESIGN.md — ryanwigley.com
# STATUS: design stage COMPLETE (2026-07-23). All five pages aligned across 20 surfaces
# (5 pages × desktop/mobile × light/dark). Next stage: implementation.
# Source of truth: Figma "ryanwigley.com — Page Designs" (sGFjHbsFwMriSNcfT7TQrc)
#   — Design Language page, section "MODULES · v2 — home-aligned" (578:2, includes v3
#     additions band + RULES v3 text block 578:3)
#   — Live frames named exactly: `page · {slug} · {desktop|mobile} · {light|dark}`
#     slugs: home · projects · playbook · about · methodology

---
version: 1.0
name: Working Exhibit
description: Personal site of an AI-systems builder — a working exhibit of live systems.
status: design locked; porting to code is the next stage

themes:
  light:
    bg: "#E9EEDF"            # pale sage page
    surface: "#F3F4E9"       # selected-row plate, panels
    card: "#4F5F40"          # forest module surface
    card-deep: "#495A3D"     # waveform banner
    card-border: "#445239"
    on-card: "#E8EBDD"
    on-card-muted: "#AEB8A0"
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
    on-card-muted: "#8AA0BC"
    ink: "#E4EAF1"
    muted: "#8295AB"
    rule: "#2E4259"
    diagram-line: "#3E5573"
    lattice-mid: "#516885"   # lattice lines/nodes in dark — brighter than rule, never ink
    accent: "#C9A85A"        # gold
    nav-icon: "#7E92A9"

typography:
  display:  { family: "Fraunces",       weight: "Black",    usage: "page headlines ('Always tinkering.', 'Models change, but the system holds.'), hero name" }
  title:    { family: "Fraunces",       weight: "SemiBold", usage: "tile/card titles, skill names, stat numerals" }
  body:     { family: "Hanken Grotesk", usage: "running text, descriptions" }
  label:    { family: "Fragment Mono",  transform: "lowercase or UPPER tracked", usage: "kickers, nav, captions, status tags, data, footers" }
  never: italic

spacing: { base: 8, page-pad-x: 80, content-max: 1280 }
mobile:  { artboard: "1054 wide", margins: 80, bar: "mobile_buttons 1060×227 at frame-bottom−232, labels at bar+164" }

# ————— THE FIVE RULES (v3) —————
rules:
  emphasis-strategy: >
    LIGHT inverts: cards go forest on pale sage — contrast carries hierarchy.
    DARK stays in one slate tile family — gold + position carry hierarchy.
    Never powder-invert dark.
  accent-dosage: >
    Gold in small doses only: target dots, NEW badges, active nav item (mobile bar),
    selected-row rail, one link per cluster ('browse all my skills' goes gold in dark).
    Never large fills.
  lattice-grammar: >
    Thin rules + L-brackets + hollow squares + filled junction dots, placed UNEVENLY in
    open space between objects. NEVER hollow circles. NEVER even grids. No lattice line
    within 24px of a card edge or text block. Dark lattice uses lattice-mid #516885 —
    visible but calm (not rule-dark, never ink-light).
  nav: >
    Labeled everywhere, lowercase mono. Desktop: top strip, 16px icon beside each word —
    home projects tools writing about — active page underlined gold; theme-switcher
    top-right (1253,44), moon-active pill in dark. Mobile: bottom bar, icon + label,
    active page label gold. 'writing' is an external link to the blog (no site page).
  chrome: >
    Kickers: '// lowercase mono' (gold). Section labels: UPPER TRACKED MONO — FIG.-style
    labels are RETIRED. Footer: socials left ('X · GITHUB · LINKEDIN · EMAIL'; about uses
    'BASED · SEATTLE, WA' since socials live in its pill bar) + '● GRID NN · 47°N · PAGE'
    right (gold dot). HOME IS FOOTER-LESS by design (front-door exception). GRID numbers
    are arbitrary lore (about=01, projects=02, methodology=12) — set dressing, not data.

# ————— COMPONENTS (exhibits in Figma modules section) —————
components:
  project-tile:      "140×128 desktop / 190×172 mobile · V-A motif set: stumble flat-S ridge,
                      rainier mountain+rain+gold diamond, bookshelf spines+broadcast,
                      ryos chip+network+compass+folder · UPPER mono title + arrow"
  waveform-banner:   "flagship strip, card-deep; width = EXACTLY 2 tiles + gutter (292 desktop);
                      PODCAST EDITOR kicker · Fraunces title · glyph = breaker-curl + gold crest
                      → 13 midline-mirrored bars (1 gold) · mono caption"
  selected-row:      "surface plate (r6, rule border) + 3px gold rail on left edge + mono hint
                      ('hover a project to preview →' desktop / 'tap…' mobile, above list right)"
  theme-switcher:    "144×44 pill pair top-right; sun-active in light, moon-active gold in dark"
  footer-tag:        "gold 7px dot + 'GRID NN · 47°N · PAGE' mono 13 tracked, right-aligned"
  social-pill-bar:   "forest (light) / slate (dark) rounded bar, mono X · LinkedIn · GitHub,
                      inset padding — about page only"
  methodology-book:  "tarot-style constellation card, Fraunces title, HOW I THINK mono footer"
  arc-timeline:      "gold-dot node timeline with mono step labels (01 HOME → …) — methodology"
  arsenal-cluster:   "kicker + 2×2 chips + browse link, one unit; /capsule keeps NEW badge"
  shelf:             "personality diorama — never shrinks"
  crew-polaroid:     "pixel family portrait; small clone sits in About mobile empty space"
  writing-nav-icon:  "document/nib glyph 16px; #8A9478 light / #7E92A9 dark"

# ————— FILE HYGIENE (for future agents) —————
hygiene:
  frame-naming: "page · {slug} · {desktop|mobile} · {light|dark} — all 20 live frames conform"
  containers: "load-bearing containers carry module names ('module · waveform-banner',
               'module · waveform + tools-grid', 'mobile_buttons'); ~1.5k generic LEAF layers
               remain by decision (renaming them = low value)"
  structure-rule: "NEW work ships as named groups ('module · …'); don't restructure old flat frames"
  archives: "Archive page holds the playbook VIDEO iteration (implement once videos exist).
             Exploration pages deleted 2026-07-23. Annotation/note frames (terracotta) and
             'ryan comment' frames live left of page frames — never inside them."
  mobile-deltas: "acknowledged: crew polaroid mobile-About only; 1 expanded skill on mobile
                  playbook vs 3 desktop; mobile footers have no GRID tag; frame heights content-driven"
---

## Status

**Locked (1.0):** both themes · type roles · the five v3 rules · all components above ·
all 20 page surfaces · file hygiene conventions.

**Next (implementation):** port to code — `app/globals.css` tokens, nav/tile/banner/
selected-row/theme-switcher components, per-page builds from the Figma frames. The avatar
3D embed is NOT reserved in the layout anymore; it returns as its own future project
(see `metahuman-avatar-assistant-capsule.md`) with placement decided then.

## The design in one paragraph

A working exhibit: live systems pinned to a drafting-table canvas. A sparse architectural
lattice (rules, brackets, squares, dots — never circles, never grids) fills the open space
between objects. Work carries the visual weight; decoration recedes. Light mode argues with
contrast (forest blocks on sage); dark mode argues with restraint (one slate family, gold
pointing at what matters). Labels and data speak Fragment Mono, headlines speak Fraunces,
emphasis is a marker swash, and every page ends with its grid coordinates — except home,
which just ends.

## What it is NOT

Not dark-glow SaaS. Not Inter + purple gradient. No glassmorphism, no glow, no eyebrow
pills, no decorative numbering, no italic-serif hero, no icon-tile cards, no hollow-circle
ornaments, no even background grids. The sage/forest palette is earned through structure.

## Provenance

Foundation 2026-06 (FC-Mobile MJ recreation) → Home alignment 2026-07-07 (hierarchy flip,
gold promotion, labeled nav, clearance rule) → V-A tile artwork + banner glyph 2026-07-16 →
writing nav + image-first playbook 2026-07-17 → Ryan's Home/About/Methodology redesigns +
dark parity + mobile build-out 2026-07-22 → comment round, lattice/footer/naming canon,
file cleanup + v3 codification 2026-07-23.
