/**
 * The projects showcase set — the six confirmed MJ LAB covers, in list order
 * (flagship first). Each entry drives one selectable row + the featured media
 * plate. Copy for Waveform and RyOS is drawn from the real project records;
 * covers live under public/art/projects/ per assets-manifest.json.
 */
export type ProjectEntry = {
  slug: string
  /** Display name — shown in the row and (with a trailing period) as the panel title. */
  name: string
  /** Short status / category tag — mono, tracked. Doubles as the panel kicker. */
  tag: string
  /** One-line description for the featured panel. */
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
    tag: "FLAGSHIP",
    blurb:
      "A browser-native audio editor for podcasters — the missing middle between Audacity and Descript, AI-enhanced.",
    cover: "/art/projects/waveform-wave.jpg",
    href: "https://wavefrm.io",
    external: true,
    buildLabel: "view the build",
  },
  {
    slug: "ryos",
    name: "RyOS Starter Kit",
    tag: "LIVE SYSTEM",
    blurb:
      "A personal operating system that routes calendar, tasks, and knowledge through four specialized AI lenses.",
    cover: "/art/projects/ryos-capsule.jpg",
    href: "https://mc.ryanwigley.com",
    external: true,
    buildLabel: "open the dashboard",
  },
  {
    slug: "stumble",
    name: "Stumble AI",
    tag: "DEPLOYED",
    blurb:
      "An AI that surfs the web on its own and drops offbeat site discoveries straight into Discord.",
    cover: "/art/projects/stumble-ai.jpg",
    href: "https://github.com/hurleywgly",
    external: true,
    buildLabel: "view the build",
  },
  {
    slug: "bookshelf",
    name: "Acquired Bookshelf",
    tag: "DEPLOYED",
    blurb:
      "Every book mentioned on the Acquired podcast, tracked and delivered as fresh alerts.",
    cover: "/art/projects/acquired-bookshelf.jpg",
    href: "https://github.com/hurleywgly",
    external: true,
    buildLabel: "view the build",
  },
  {
    slug: "rainier",
    name: "Rain or Rainier?",
    tag: "SHIPPED",
    blurb:
      "A one-glance Seattle sky-check — is it raining today, or can you actually see the mountain?",
    cover: "/art/projects/rain-or-rainier.jpg",
    href: "https://github.com/hurleywgly",
    external: true,
    buildLabel: "view the build",
  },
  {
    slug: "skills",
    name: "My Skills",
    tag: "ARSENAL",
    blurb:
      "The reusable Claude Code skills — the arsenal that runs my operating system, day to day.",
    cover: "/art/projects/my-skills.jpg",
    href: "/tools",
    external: false,
    buildLabel: "browse the arsenal",
  },
]
