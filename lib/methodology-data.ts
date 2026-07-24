import type { LatticeMark } from "@/components/lattice"

/**
 * Methodology desktop diagram lattice — the visible architectural marks around
 * the ARC timeline and AT A GLANCE cards, traced 1:1 from the Figma frame
 * `page · methodology · desktop · light` (76:3, 1440-wide, content 80–1360).
 * Grammar only: an L-bracket, thin rules, hollow squares and junction dots
 * placed in open space. Coordinates are frame-space; the page shifts them up by
 * DESK_TOP so the exhibit sits under the shared glass header.
 *
 * The frame's 7%-opacity "base-grid" substrate is intentionally omitted: its
 * lines cross card edges and read as an even grid, both barred by the DESIGN.md
 * lattice-grammar law. The compliant diagram marks below carry the structure.
 */
export const methodologyDiagram: LatticeMark[] = [
  // top-right L-bracket → terminal dot → foot square
  { type: "rule", x: 1080, y: 120, w: 180, h: 2 },
  { type: "rule", x: 1080, y: 120, w: 2, h: 150 },
  { type: "dot", x: 1257, y: 117 },
  { type: "square", x: 1075, y: 266, size: 10 },
  // far-left vertical + terminal dot
  { type: "rule", x: 30, y: 640, w: 2, h: 180 },
  { type: "dot", x: 27, y: 817 },
  // left run into the card band: dot → long rule → drop → square
  { type: "dot", x: 57, y: 957 },
  { type: "rule", x: 60, y: 960, w: 520, h: 2 },
  { type: "rule", x: 576, y: 960, w: 2, h: 60 },
  { type: "square", x: 570, y: 1018, size: 12 },
  // between cards 2 and 3: rule → terminal dot
  { type: "rule", x: 760, y: 990, w: 420, h: 2 },
  { type: "dot", x: 1177, y: 987 },
  // right vertical over card 3: dot → rule → foot square
  { type: "dot", x: 1297, y: 836 },
  { type: "rule", x: 1300, y: 840, w: 2, h: 160 },
  { type: "square", x: 1294, y: 1000, size: 10 },
]

/** AT A GLANCE card trio (desktop), in Figma order. Cards 1 & 2 carry a mini
 * process timeline; card 3 (THE BAR) is timeline-less. */
export type GlanceCardData = {
  body: string
  label: string
  caption: string
  timeline: boolean
}

export const glanceCards: GlanceCardData[] = [
  {
    body: "the models know how I think",
    label: "ON FILE",
    caption: "how I'm spoken to · what I care about · my voice",
    timeline: true,
  },
  {
    body: "zoom out → patch the biggest friction → run more through it",
    label: "THE LOOP",
    caption: "that's how it compounds",
    timeline: true,
  },
  {
    body: "does it look good? · does it feel good? · does it play good?",
    label: "THE BAR",
    caption: "every solution stands up to it, then scales",
    timeline: false,
  },
]

/** Mobile ARC rows — compact mono data lines. The ONE SYSTEM row goes gold. */
export const mobileArc: { text: string; gold?: boolean }[] = [
  { text: "01 · HOME · a system that helped at home" },
  { text: "02 · WORK · a work multiplier" },
  { text: "03 · FAMILY · life admin for my family" },
  { text: "04 · ONE SYSTEM · it knows me", gold: true },
]

/** Mobile AT A GLANCE rows — statement lines (label tag + line). */
export const mobileGlance: string[] = [
  "ON FILE · the models know how I think",
  "THE LOOP · zoom out → patch the biggest friction → run more through it",
  "THE BAR · does it look good? · does it feel good? · does it play good?",
]
