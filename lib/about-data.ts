import type { LatticeMark } from "@/components/lattice"

/**
 * About-page bio — the three paragraphs, copied verbatim from the Figma
 * `page · about` frames. Three of the four frames (desktop-light, mobile
 * light/dark) share this copy; the desktop-dark frame carried two stray word
 * variants ("rights technology", "helps my friends") — standardized here on
 * the majority copy.
 */
export const aboutBio: string[] = [
  "I'm a product person with fifteen years of building things people rely on: a blog 2 million people read every month, rights infra used by Spotify and Apple, APIs serving Amazon customers worldwide, and now technology that brings people together at Raya.",
  "Outside work I build AI systems to solve my own problems first: the operating system that runs my day also helps friends run their families and businesses.",
  "If something here is useful to you, I'd love to hear about it.",
]

/**
 * Desktop lattice — traced 1:1 from the `blueprint-grid` layer of
 * `page · about · desktop · light` (frame 1440×940), then shifted up by the
 * 124px chrome crop so the exhibit canvas sits flush under the global header.
 * Grammar only: thin rules, hollow squares (never circles), gold accent dots.
 */
export const aboutLatticeDesktop: LatticeMark[] = [
  // vertical drafting rules (open space between bio and the right column)
  { type: "rule", x: 760, y: 76, w: 1, h: 700, faint: true },
  { type: "rule", x: 840, y: -4, w: 1, h: 580 },
  { type: "rule", x: 940, y: 116, w: 1, h: 620, faint: true },
  { type: "rule", x: 1320, y: 36, w: 1, h: 600, faint: true },
  // horizontal baseline above the footer
  { type: "rule", x: 640, y: 736, w: 680, h: 1, faint: true },
  // hollow squares in the open middle band
  { type: "square", x: 835, y: 391, size: 11 },
  { type: "square", x: 635, y: 511, size: 11 },
  // gold accent dots — one by the headline, one on the footer baseline
  { type: "dot", x: 557, y: 133, gold: true },
  { type: "dot", x: 937, y: 733, gold: true },
]

/**
 * Mobile lattice — the real grid-lattice layer of
 * `page · about · mobile · light` (artboard 1054-wide), extracted 1:1 and
 * shifted up by the 250px chrome crop. Two thin rules + two junction dots;
 * nested art groups (headshot, crew) excluded.
 */
export const aboutLatticeMobile: LatticeMark[] = [
  { type: "rule", x: 560, y: 850, w: 2, h: 120 },
  { type: "dot", x: 556, y: 846 },
  { type: "rule", x: 80, y: 1370, w: 894, h: 2 },
  { type: "dot", x: 966, y: 1366 },
]
