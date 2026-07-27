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

/** The Figma mobile frame's grid-lattice layer (164:4), extracted 1:1 —
 * pure thin drafting rules; crew-polaroid internals excluded. */
export const homeLatticeMobile: LatticeMark[] = [
  { type: "rule", x: 314, y: 984, w: 1, h: 59 },
  { type: "rule", x: 424, y: 698, w: 2, h: 117 },
  { type: "rule", x: 462, y: 638, w: 2, h: 118 },
  { type: "rule", x: 462, y: 1515, w: 2, h: 146 },
  { type: "rule", x: 498, y: 616, w: 2, h: 361 },
  { type: "rule", x: 498, y: 1514, w: 2, h: 168 },
  { type: "rule", x: 509, y: 1929, w: 1, h: 156 },
  { type: "rule", x: 512, y: 615, w: 2, h: 362 },
  { type: "rule", x: 512, y: 1501, w: 2, h: 160 },
  { type: "rule", x: 546, y: 832, w: 2, h: 145 },
  { type: "rule", x: 546, y: 1487, w: 2, h: 263 },
  { type: "rule", x: 546, y: 1924, w: 2, h: 98 },
  { type: "rule", x: 546, y: 2064, w: 2, h: 59 },
  { type: "rule", x: 564, y: 547, w: 2, h: 199 },
  { type: "rule", x: 564, y: 822, w: 2, h: 155 },
  { type: "rule", x: 564, y: 1464, w: 2, h: 287 },
  { type: "rule", x: 564, y: 1924, w: 2, h: 141 },
  { type: "rule", x: 578, y: 555, w: 2, h: 190 },
  { type: "rule", x: 578, y: 816, w: 2, h: 161 },
  { type: "rule", x: 578, y: 1458, w: 2, h: 293 },
  { type: "rule", x: 578, y: 1887, w: 2, h: 79 },
  { type: "rule", x: 588, y: 554, w: 3, h: 175 },
  { type: "rule", x: 588, y: 797, w: 3, h: 180 },
  { type: "rule", x: 588, y: 1458, w: 3, h: 381 },
  { type: "rule", x: 588, y: 1883, w: 3, h: 83 },
  { type: "rule", x: 625, y: 1976, w: 1, h: 109 },
  { type: "rule", x: 628, y: 793, w: 2, h: 184 },
  { type: "rule", x: 708, y: 776, w: 2, h: 96 },
  { type: "rule", x: 708, y: 924, w: 2, h: 65 },
  { type: "rule", x: 742, y: 776, w: 2, h: 57 },
  { type: "rule", x: 742, y: 923, w: 2, h: 66 },
  { type: "rule", x: 742, y: 1237, w: 2, h: 762 },
  { type: "rule", x: 768, y: 1216, w: 2, h: 144 },
  { type: "rule", x: 775, y: 1353, w: 2, h: 384 },
  { type: "rule", x: 788, y: 1208, w: 1, h: 61 },
  { type: "rule", x: 795, y: 1205, w: 2, h: 149 },
  { type: "rule", x: 807, y: 564, w: 2, h: 266 },
  { type: "rule", x: 807, y: 906, w: 2, h: 65 },
  { type: "rule", x: 807, y: 1198, w: 2, h: 651 },
  { type: "rule", x: 822, y: 1209, w: 1, h: 169 },
  { type: "rule", x: 838, y: 550, w: 1, h: 420 },
  { type: "rule", x: 838, y: 1184, w: 1, h: 181 },
  { type: "rule", x: 838, y: 1413, w: 1, h: 387 },
  { type: "rule", x: 868, y: 602, w: 2, h: 339 },
  { type: "rule", x: 868, y: 1184, w: 2, h: 635 },
  { type: "rule", x: 911, y: 1188, w: 3, h: 491 },
  { type: "rule", x: 675, y: 599, w: 193, h: 2 },
  { type: "rule", x: 465, y: 636, w: 139, h: 2 },
  { type: "rule", x: 675, y: 636, w: 163, h: 2 },
  { type: "rule", x: 320, y: 676, w: 269, h: 2 },
  { type: "rule", x: 427, y: 695, w: 162, h: 2 },
  { type: "rule", x: 300, y: 728, w: 289, h: 2 },
  { type: "rule", x: 745, y: 728, w: 181, h: 2 },
  { type: "rule", x: 427, y: 793, w: 90, h: 2 },
  { type: "rule", x: 628, y: 793, w: 267, h: 2 },
  { type: "rule", x: 506, y: 834, w: 279, h: 2 },
  { type: "rule", x: 761, y: 856, w: 126, h: 1 },
  { type: "rule", x: 792, y: 863, w: 101, h: 2 },
  { type: "rule", x: 420, y: 884, w: 265, h: 2 },
  { type: "rule", x: 300, y: 941, w: 568, h: 2 },
  { type: "rule", x: 318, y: 1021, w: 94, h: 1 },
  { type: "rule", x: 756, y: 1130, w: 129, h: 2 },
  { type: "rule", x: 657, y: 1355, w: 254, h: 2 },
  { type: "rule", x: 668, y: 1369, w: 107, h: 2 },
  { type: "rule", x: 657, y: 1390, w: 161, h: 2 },
  { type: "rule", x: 633, y: 1455, w: 244, h: 2 },
  { type: "rule", x: 567, y: 1465, w: 310, h: 2 },
  { type: "rule", x: 736, y: 1611, w: 152, h: 2 },
  { type: "rule", x: 465, y: 1661, w: 424, h: 2 },
  { type: "rule", x: 499, y: 1679, w: 403, h: 3 },
  { type: "rule", x: 509, y: 1737, w: 154, h: 1 },
  { type: "rule", x: 524, y: 1759, w: 119, h: 1 },
  { type: "rule", x: 589, y: 1884, w: 75, h: 1 },
  { type: "rule", x: 546, y: 1925, w: 355, h: 2 },
  { type: "rule", x: 511, y: 1974, w: 114, h: 1 },
  { type: "rule", x: 511, y: 2085, w: 114, h: 1 },
  { type: "rule", x: 317, y: 645, w: 2, h: 32 },
  { type: "rule", x: 776, y: 1258, w: 2, h: 64 },
  { type: "rule", x: 687, y: 1100, w: 2, h: 26 },
]
