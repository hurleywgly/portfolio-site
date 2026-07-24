# FIGMA-THEME-ALIGNMENT.CAPSULE.md

> Handoff for an Opus 4.8 agent to align the remaining Figma pages (Projects, Methodology, Tools, About) with the settled home-page design system — light & dark, mobile & desktop.

**Version:** 1.0
**Created:** 2026-07-07
**From:** Ryan portfolio design-pass session (Claude Fable 5 + Ryan, iterating live in Figma)
**To:** Opus 4.8 agent with Figma MCP access (get_metadata / get_screenshot / get_design_context / use_figma)
**Purpose:** Transfer the aligned design system, the five house rules, exact node references, and the per-page work orders so the receiving agent can update every non-home page without re-deriving decisions.
**Tier:** Standard
**Category:** Design System Handoff
**Archetype:** Work Order

---

## 1. Dispatch Summary

Ryan's portfolio Figma file went through a full home-page alignment: hierarchy was flipped so the work (project cards + Waveform) carries visual weight, the avatar was removed for v1 (bottom-left corner stays reserved for a future 3D embed), navs became labeled lowercase-mono icons, gold was promoted to light mode's true accent, dark mode was calmed into a single slate tile family, and a 24px backdrop-clearance rule was applied. All of this is codified in `DESIGN.md` (repo: `~/my_projects/ryan_portfolio/`) and exhibited in Figma.

Your job: bring the four remaining pages up to this system across **all four surfaces each** (light/dark × mobile/desktop, where frames exist — audit first, some pages may have fewer frames). The About page needs the deepest pass and explicit new-component exploration. Home and the Design Language exhibits are **reference only — do not restyle them**.

Ryan reviews visually and iterates by leaving "Ryan Reply" frames near your work. Leave your own annotations adjacent to (never inside) his frames.

---

## 2. Core Content

### 2.1 File + page map

File key: `sGFjHbsFwMriSNcfT7TQrc` (ryanwigley.com — Page Designs, light)

| Page | Node | Role |
|---|---|---|
| Design Language | `0:1` | Reference. Modules-v2 section = `578:2`. Read, clone from, never restyle. |
| Home | `164:2` | Reference standard. Frames: desktop light `344:2`, desktop dark `385:2`, mobile light `164:3`, mobile dark `403:2`. Do not touch. |
| **Projects** | `40:2` | Align. |
| **Methodology** | `76:2` | Align. |
| **Tools · Skill Playbook** | `16:2` | Align. |
| **About** | `61:2` | Align + component exploration (deepest pass). |
| Projects - Artwork | `147:2` | Reference for artwork language (Ink & Marker / Style C won the exploration). |
| Artwork · Explorations | `465:2` | Archive. Do not touch. |

### 2.2 Tokens (authoritative — mirror of DESIGN.md)

LIGHT: bg `#E9EEDF` · surface `#F3F4E9` · card `#4F5F40` (forest) · card-border `#445239` · on-card `#E8EBDD` · on-card-muted `#AEB8A0` · ink `#222B1A` · muted `#5B6B4B` · rule `#C7CDB4` · diagram `#98A48C` · **accent gold `#A18A2E`** (legacy muted gold `#94854A` may appear; migrate prominent marks to `#A18A2E`).

DARK: bg `#192B43` · surface `#1F3149` · card `#2A3D54` (slate) · card-border `#3E5573` · on-card `#DDE5EE` · on-card-muted `#8AA0BC` · ink `#E4EAF1` · muted `#8295AB` · rule `#2E4259` · diagram `#3E5573` · **accent gold `#C9A85A`**.

Type: **Fraunces Black** (display/tile titles) · **Hanken Grotesk** (body) · **Fragment Mono Regular** (labels, nav, captions, card titles, data — lowercase or UPPER tracked). Never italic.

### 2.3 The five rules (non-negotiable)

1. **Emphasis strategy.** Light inverts: primary content cards go forest `#4F5F40` on sage — contrast carries hierarchy. Dark stays in ONE slate family (`#2A3D54` tiles on `#192B43`) — gold + position carry hierarchy. Never invert dark cards to light/powder fills (tried, rolled back: too loud).
2. **Accent dosage.** Gold in small doses only: target dots, NEW badges, marker swash, one link per cluster. Never as a large fill.
3. **Backdrop clearance.** No blueprint/lattice line within 24px of a card edge or text block. When you add/move content, sweep thin segments (≤6px thick) intersecting the inflated zone and delete them.
4. **Nav.** Labeled lowercase Fragment Mono everywhere: mobile bottom bar = icon + label; desktop top strip = 16px icon beside each word (`home  projects  tools  about`). Clone the icons from Home rather than redrawing (light `504:14/15/20/26`, dark `504:27/28/33/39`).
5. **Theme parity.** Themes restyle, never re-curate: identical objects and positions in light and dark versions of the same layout.

Plus the layout grammar from Home: content order **hero → primary content → personality → tools/detail**; feature tiles run narrow + tall (desktop 140×128, mobile 190×172, gutters 12/16); shelf/diorama elements never shrink; bottom-left corner of full-page layouts stays open for the future avatar embed.

### 2.4 Reusable modules — clone, don't redraw

All live in Design Language → section `578:2` ("MODULES · v2 — home-aligned"):
- `module · project-cards · light` and `· dark` — the card recipe (diagram top, mono title bottom-left, arrow bottom-right).
- Arsenal cluster (kicker + 2×2 chips + browse link), both themes.
- Labeled nav strips, both themes.
- Rules text block (same five rules, in-file).

For other motifs (waveform banner, methodology constellation, writing block, shelf, crew polaroid) clone from the Home frames listed in 2.1.

### 2.5 Per-page work orders

Audit each page first (`get_metadata` → `get_screenshot` per frame) — frame inventories below may be incomplete; some pages may lack dark or mobile variants entirely. **Missing variants are in scope: create them by duplicating the light/desktop frame and re-skinning via token map** (the light→dark hex map in 2.2; see also the Home dark frames for precedent).

**Projects (`40:2`)** — likely predates the card recipe. Bring every project tile to the project-card anatomy and tokens; apply emphasis strategy per theme; clearance sweep; labeled nav; check gold dosage (one focal per card max).

**Methodology (`76:2`)** — the constellation tile is this page's hero; keep it. Align surfaces/type to tokens, ensure dark uses the slate family, add labeled nav, clearance sweep.

**Tools · Skill Playbook (`16:2`)** — this page IS the arsenal expanded ("kiosk" energy: skills must read as usable, valuable, installable). Reuse the arsenal cluster module as the base unit; the `/capsule` chip keeps its NEW + accent-stroke emphasis; every chip row gets a clear affordance (arrow) and an install/browse exit link per section. Check against the Design Language install-block module (`/research` example) for the command + copy treatment — fix its truncation behavior if you reuse it (fade or wrap, never hard-clip).

**About (`61:2`) — deepest pass + exploration.** The home page already tells "builder with personality" (shelf, crew, avatar-to-come); About must go deeper, not repeat it. Beyond token/nav/clearance alignment, explore **3–4 new component concepts** as variants side-by-side on the canvas, each labeled with a Fragment Mono caption, for Ryan to pick from. Candidate directions (explore, don't assume):
  - **spec-card · person** — the Design Language spec-card (serif stat + mono metadata) applied to Ryan: years building, systems shipped, current focus.
  - **timeline / career arc** — node-graph dots on a path (reuses the stumble/diagram language) marking career waypoints.
  - **shelf · expanded** — the personality diorama at larger scale with more objects (each object = a story hook).
  - **crew module · expanded** — the pixel-portrait language extended (individual polaroids, captions).
  - **"now" block** — current-state panel in mono (reading / building / listening), kiosk-adjacent.
  Build each variant in light first, on-canvas next to the existing About content; after Ryan picks, roll the winner into all four surfaces and add it to the modules-v2 section.

### 2.6 Working protocol

1. Load the `figma-use` skill BEFORE any `use_figma` call. Work incrementally (≤10 logical ops per call), return node IDs from every script.
2. Per page: audit (metadata + screenshots) → plan → execute in small calls → screenshot-verify each frame → clearance sweep last.
3. Clearance sweep pattern (proven in this session): find nodes of type RECTANGLE/LINE/VECTOR with width≤6 or height≤6 in backdrop/lattice groups whose `absoluteBoundingBox` intersects content zones inflated 24px; delete. Protect content subtrees by walking `parent` chains. Beware: callout rules often have paired dots + mono labels (`v1.0`, `node · 07` style) — remove those together or not at all.
4. Fonts must be loaded before text edits (`getStyledTextSegments(['fontName'])` → `loadFontAsync`). File faces: Fraunces Black, Hanken Grotesk, Fragment Mono Regular. Never use group-resize to shrink containers holding text — text reflows and wraps (bit us on the Waveform banner); resize background rects independently.
5. Leave a short annotation card next to each completed frame summarizing what changed (terracotta cards, `#FFF6EE` fill / `#D66A4A` stroke / Inter text, matching the existing crit-rail convention at x≈−480 on Home).

### 2.7 Guardrails

- Do NOT restyle Home (`164:2` frames), the Design Language exhibits, or the Artwork pages.
- Do NOT delete or move any frame named `Ryan Reply *` or `CRIT · *` — they are the conversation record.
- Do NOT re-introduce: avatar figures/placeholder humans (reserved for the 3D embed), powder-inverted dark cards, unlabeled nav icons, italic emphasis, large gold fills.
- If a page's existing content contradicts these rules in a way that seems intentional (e.g., a deliberate hero treatment), annotate and ask via an adjacent note rather than bulldozing.
- Screenshots after every frame's changes; if a result looks wrong, fix before moving to the next frame.

### 2.8 Definition of done

Every frame on Projects, Methodology, Tools, and About: (a) tokens match 2.2, (b) all five rules pass, (c) nav labeled, (d) clearance swept, (e) light/dark parity verified side-by-side, (f) annotation card placed. About additionally has 3–4 labeled component explorations awaiting Ryan's pick. Nothing on reference pages changed. Report back with per-page before/after screenshots and open questions.
