import type { LatticeMark } from "@/components/lattice"

export type TileConfig = {
  title: string | [string, string]
  slug: "stumble" | "rainier" | "bookshelf" | "ryos"
  href: string
}

/** The 2×2 work grid, in Figma order. */
export const homeTiles: TileConfig[] = [
  { title: "Stumble AI", slug: "stumble", href: "/projects" },
  { title: ["Rain or", "Rainier?"], slug: "rainier", href: "/projects" },
  { title: ["Acquired", "Bookshelf"], slug: "bookshelf", href: "/projects" },
  { title: ["RyOS", "Starter Kit"], slug: "ryos", href: "/projects" },
]

export type ChipConfig = {
  name: string
  desc: string
  glyph: "capsule" | "pitch" | "brief" | "research"
  href: string
  isNew?: boolean
}

/** The arsenal cluster, in Figma order — /capsule keeps its NEW badge. */
export const homeChips: ChipConfig[] = [
  { name: "/capsule", desc: "agent-ready knowledge", glyph: "capsule", href: "/tools", isNew: true },
  { name: "/pitch-me", desc: "divergent concept pitches", glyph: "pitch", href: "/tools" },
  { name: "/daily-brief", desc: "your morning brief", glyph: "brief", href: "/tools" },
  { name: "/research", desc: "scored web research", glyph: "research", href: "/tools" },
]

/**
 * Home desktop lattice — exact placements traced from the Figma frame
 * (1440×1024, frame coordinates). Two families: solid `rule`-tone marks and a
 * fainter set. Grammar only: rules, one L-bracket, hollow squares, junction
 * dots — placed in open space, clear of every card and text block.
 */
export const homeLatticeDesktop: LatticeMark[] = [
  // top-left L bracket + terminal dot
  { type: "bracket", x: 560, y: 110, w: 140, h: 185, corner: "tl" },
  { type: "dot", x: 697, y: 107 },
  { type: "square", x: 555, y: 290, size: 10 },
  // right-of-methodology cluster
  { type: "rule", x: 1105, y: 455, w: 2, h: 130 },
  { type: "dot", x: 1102, y: 452 },
  { type: "rule", x: 830, y: 480, w: 270, h: 2 },
  { type: "square", x: 975, y: 474, size: 12 },
  // big square, lower-left margin
  { type: "square", x: 20, y: 540, size: 70 },
  { type: "dot", x: 86, y: 536 },
  // lower-left run
  { type: "rule", x: 90, y: 735, w: 470, h: 2 },
  { type: "dot", x: 87, y: 732 },
  { type: "rule", x: 430, y: 735, w: 2, h: 95 },
  // lower-right run
  { type: "rule", x: 900, y: 975, w: 430, h: 2 },
  { type: "dot", x: 1327, y: 972 },
  { type: "rule", x: 1390, y: 470, w: 2, h: 290 },
  { type: "dot", x: 1387, y: 757 },
  { type: "square", x: 300, y: 856, size: 12 },
  // top-right short mark
  { type: "rule", x: 1010, y: 96, w: 2, h: 74 },
  { type: "dot", x: 1007, y: 167 },
  // fainter family
  { type: "rule", x: 692, y: 329, w: 2, h: 32, faint: true },
  { type: "dot", x: 689, y: 326, faint: true },
  { type: "rule", x: 466, y: 395, w: 114, h: 2, faint: true },
  { type: "dot", x: 463, y: 392, faint: true },
  { type: "rule", x: 805, y: 600, w: 356, h: 2, faint: true },
  { type: "dot", x: 1158, y: 597, faint: true },
  { type: "rule", x: 989, y: 260, w: 168, h: 2, faint: true },
  { type: "dot", x: 986, y: 257, faint: true },
  { type: "rule", x: 297, y: 703, w: 2, h: 150, faint: true },
  { type: "dot", x: 294, y: 850, faint: true },
  { type: "rule", x: 1265, y: 439, w: 2, h: 128, faint: true },
  { type: "dot", x: 1262, y: 564, faint: true },
  { type: "rule", x: 380, y: 476, w: 72, h: 2, faint: true },
  { type: "dot", x: 377, y: 473, faint: true },
  { type: "rule", x: 140, y: 624, w: 2, h: 132, faint: true },
  { type: "dot", x: 137, y: 621, faint: true },
]
