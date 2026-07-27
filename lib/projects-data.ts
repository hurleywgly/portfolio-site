/**
 * The projects showcase set — the six confirmed MJ LAB covers, in list order
 * (flagship first). Each entry drives one selectable row + the featured media
 * plate. Copy reconciled against Figma `40:2` (page · projects · desktop/
 * mobile · light/dark) 2026-07-26 — names, status tags, row summaries and
 * taglines are taken verbatim from the frame; `blurb`/`panelTag` are the
 * longer featured-panel copy (Figma only shows this state for the flagship,
 * so the other five keep their previously-approved panel copy). Covers live
 * under public/art/projects/ per assets-manifest.json.
 */
export type ProjectEntry = {
  slug: string
  /** Display name — shown (with a trailing period) as the panel title; the
   *  row renders it lowercase via CSS, matching the Figma catalogue style. */
  name: string
  /** Row-level status tag — mono, tracked, always visible next to the name. */
  tag: string
  /** Featured-panel status tag (kicker above the panel title). Usually the
   *  same as `tag`; the flagship's is more detailed in the Figma frame. */
  panelTag: string
  /** One-line summary shown directly in the row, under the name. */
  summary: string
  /** Small mono "input → output" caption under the row summary. */
  tagline: string
  /** Longer description for the featured panel. */
  blurb: string
  /** Cover art path under public/art/projects/. */
  cover: string
  /** Where "view the build →" points. */
  href: string
  external: boolean
  /** Link label in the featured panel (arrow appended in the component). */
  buildLabel: string
}

export const projectsData: ProjectEntry[] = [
  {
    slug: "waveform",
    name: "Waveform",
    tag: "FLAGSHIP · PRE-BETA",
    panelTag: "FLAGSHIP · PRE-BETA · WAITLIST Q3",
    summary: "The missing middle in podcast editing. Browser-native, studio quality audio.",
    tagline: "raw podcast recordings → publish-ready episodes",
    blurb:
      "The missing middle between Audacity's complexity and Descript's opinion — browser-native, AI-enhanced.",
    cover: "/art/projects/waveform-wave.jpg",
    href: "https://wavefrm.io",
    external: true,
    buildLabel: "view the build",
  },
  {
    slug: "stumble",
    name: "Stumble AI",
    tag: "LIVE",
    panelTag: "LIVE",
    summary: "Discover cool AI apps. 50k+ indexed.",
    tagline: "open web → daily tool discoveries",
    blurb:
      "An AI that surfs the web on its own and drops offbeat site discoveries straight into Discord.",
    cover: "/art/projects/stumble-ai.jpg",
    href: "https://stumble-ai.com",
    external: true,
    buildLabel: "visit the site",
  },
  {
    slug: "bookshelf",
    name: "Acquired Bookshelf",
    tag: "LIVE",
    panelTag: "LIVE",
    summary: "The Acquired podcast's books, auto-catalogued.",
    tagline: "episode mentions → browsable shelf",
    blurb:
      "Every book mentioned on the Acquired podcast, tracked and delivered as fresh alerts.",
    cover: "/art/projects/acquired-bookshelf.jpg",
    href: "https://acquired-bookshelf.vercel.app",
    external: true,
    buildLabel: "visit the site",
  },
  {
    slug: "rainier",
    name: "Rain or Rainier",
    tag: "LIVE",
    panelTag: "LIVE",
    summary: "Seattle's daily question, answered by weather telemetry.",
    tagline: "seattle sky → one-glance answer",
    blurb:
      "A one-glance Seattle sky-check — is it raining today, or can you actually see the mountain?",
    cover: "/art/projects/rain-or-rainier.jpg",
    href: "https://rain-or-rainier.netlify.app/",
    external: true,
    buildLabel: "visit the site",
  },
  {
    slug: "ryos",
    name: "RyOS Capsule",
    tag: "INSTALL",
    panelTag: "INSTALL",
    summary: "Build-your-own agent OS starter kit for work or life in minutes.",
    tagline: "ryan's agent os → portable knowledge",
    blurb:
      "A personal operating system that routes calendar, tasks, and knowledge through four specialized AI lenses.",
    cover: "/art/projects/ryos-capsule.jpg",
    // NOTE: github.com/hurleywgly/ryos is a PRIVATE repo — it 404s for every
    // visitor. Point at the public profile instead (Ryan: "just go to my
    // github for now"). Do not "restore" the ryos URL from `gh repo list`;
    // that listing shows private repos to the authenticated owner only.
    href: "https://github.com/hurleywgly",
    external: true,
    buildLabel: "view the github",
  },
  {
    slug: "skills",
    name: "My Skills",
    tag: "REPO",
    panelTag: "REPO",
    summary: "Drop-in skills I dogfood for months before sharing.",
    tagline: "choose your skill → upload-ready agent package",
    blurb:
      "The reusable Claude Code skills — the arsenal that runs my operating system, day to day.",
    cover: "/art/projects/my-skills.jpg",
    href: "/tools",
    external: false,
    buildLabel: "browse the arsenal",
  },
]
