/**
 * Data for the /tools "Skill Playbook" page, transcribed from the Figma frames
 * `page · playbook · desktop|mobile · light|dark` (16:2). The row order, taglines,
 * category tags, install strings, and the three authored expansions (/research,
 * /projector, /daily-brief) match the desktop frame exactly.
 */

export const SKILLS_REPO = "hurleywgly/skills"
export const SKILLS_GITHUB_URL = "https://github.com/hurleywgly/skills"
export const INSTALL_ALL = `npx skills add ${SKILLS_REPO} --all`
export const installFor = (slug: string) =>
  `npx skills add ${SKILLS_REPO} --skill ${slug}`

/** The six filter categories (a skill carries one or two). "all" is implicit. */
export const skillCategories = [
  "research faster",
  "think sharper",
  "ship faster",
  "communicate better",
  "keep projects alive",
  "stay informed",
] as const

export type SkillCategory = (typeof skillCategories)[number]

export type UseCase = { heading: string; body: string }

export type SkillDetail = {
  useCases: UseCase[]
  whyItMatters: string
  howItFits: string
  pairsWith: string[]
}

export type Skill = {
  /** slug without the leading slash, e.g. "research" */
  slug: string
  /** display name with leading slash, e.g. "/research" */
  name: string
  tagline: string
  categories: SkillCategory[]
  /** feature-image cover under public/art/skills; absent → captioned empty plate */
  cover?: string
  /** the authored narrative shown when expanded (only 3 skills have it) */
  detail?: SkillDetail
}

/** Covers that exist under public/art/skills (assets-manifest.json). */
const COVER: Record<string, string> = {
  research: "/art/skills/research.jpg",
  design: "/art/skills/design.jpg",
  think: "/art/skills/think.jpg",
  "pitch-me": "/art/skills/pitch-me.jpg",
  ink: "/art/skills/ink.jpg",
  primer: "/art/skills/primer.jpg",
  projector: "/art/skills/projector.jpg",
  mine: "/art/skills/mine.jpg",
  "auto-mine": "/art/skills/auto-mine.jpg",
  capsule: "/art/skills/capsule.jpg",
  channel: "/art/skills/channel.jpg",
  claude: "/art/skills/claude.jpg",
  "daily-brief": "/art/skills/daily-brief.jpg",
  codex: "/art/skills/codex.jpg",
  "pull-digg": "/art/skills/pull-digg.jpg",
  events: "/art/skills/events.jpg",
}

/** Feature-image caption shown when a plate has no cover art. */
export const FEATURE_CAPTION = "feature image · design-language artwork"

export const skills: Skill[] = [
  {
    slug: "research",
    name: "/research",
    tagline: "Send agents to dig up insights across the web.",
    categories: ["research faster", "think sharper"],
    cover: COVER["research"],
    detail: {
      useCases: [
        {
          heading: "Hunt down real user voice.",
          body: "Agents search through simulated personas, pulling verbatim quotes, pain points, and product insight from many angles.",
        },
        {
          heading: "Start a knowledge base.",
          body: "A self-grading, multi-persona loop gives you confidence you're learning from grounded sources — even on foreign topics.",
        },
      ],
      whyItMatters:
        "Most AI research sends a single agent to do a few searches and returns a composite, with no way to tell signal from noise. Research approaches a task from many directions at once and gives agents the tools to actually finish.",
      howItFits:
        "When I'm shaping a product launch, I research the things I don't understand between concept and launch — an easy way to add high-quality context to your agentic systems.",
      pairsWith: ["pitch-me", "capsule", "ink", "design"],
    },
  },
  {
    slug: "design",
    name: "/design",
    tagline: "Turn a one-line brief into polished Figma screens",
    categories: ["ship faster", "communicate better"],
    cover: COVER["design"],
  },
  {
    slug: "think",
    name: "/think",
    tagline: "Harden any idea before it becomes a plan",
    categories: ["think sharper", "ship faster"],
    cover: COVER["think"],
  },
  {
    slug: "pitch-me",
    name: "/pitch-me",
    tagline: "Get N wildly different ideas before you commit",
    categories: ["think sharper", "ship faster"],
    cover: COVER["pitch-me"],
  },
  {
    slug: "ink",
    name: "/ink",
    tagline: "Visualize just about anything in HTML",
    categories: ["communicate better", "research faster"],
    cover: COVER["ink"],
  },
  {
    slug: "primer",
    name: "/primer",
    tagline: "Turn any tech announcement into a simple breakdown",
    categories: ["research faster", "communicate better"],
    cover: COVER["primer"],
  },
  {
    slug: "projector",
    name: "/projector",
    tagline: "Package an expert agent harness in minutes.",
    categories: ["ship faster", "keep projects alive"],
    cover: COVER["projector"],
    detail: {
      useCases: [
        {
          heading: "Spin up a custom expert.",
          body: "Point it at a domain or codebase; it builds a layered prompt plus knowledge files for Claude, ChatGPT, NotebookLM, Gemini, or a subagent.",
        },
        {
          heading: "Interview your way to depth.",
          body: "Say “interview me” and it asks sharp questions to harvest your edge cases, tradeoffs, and scope before writing a single file.",
        },
      ],
      whyItMatters:
        "We all wish we had a pocket expert for our work or hobbies. Most people settle for a generic assistant. Projector turns any topic into a portable, reusable expert you can hand to any major AI platform.",
      howItFits:
        "When I start a new project, I find the experts in that field, learn what they know, then let projector assemble a package of files I can load into any AI tool I work in.",
      pairsWith: ["channel", "mine", "capsule", "research"],
    },
  },
  {
    slug: "mine",
    name: "/mine",
    tagline: "Have agents sift information and find gems for you",
    categories: ["research faster"],
    cover: COVER["mine"],
  },
  {
    slug: "auto-mine",
    name: "/auto-mine",
    tagline: "Mine your sources overnight, wake to the gems",
    categories: ["research faster", "keep projects alive"],
    cover: COVER["auto-mine"],
  },
  {
    slug: "capsule",
    name: "/capsule",
    tagline: "Portable, actionable knowledge transfer between agents",
    categories: ["keep projects alive"],
    cover: COVER["capsule"],
  },
  {
    slug: "channel",
    name: "/channel",
    tagline: "Load any package's persona and become it on demand",
    categories: ["keep projects alive", "ship faster"],
    cover: COVER["channel"],
  },
  {
    slug: "update-from-session",
    name: "/update-from-session",
    tagline: "Turn each working session into lasting memory",
    categories: ["keep projects alive", "think sharper"],
    // no cover → captioned empty plate
  },
  {
    slug: "claude",
    name: "/claude",
    tagline: "A Claude gut-check when another model is driving",
    categories: ["ship faster", "think sharper"],
    cover: COVER["claude"],
  },
  {
    slug: "daily-brief",
    name: "/daily-brief",
    tagline: "A chief-of-staff brief on what actually matters today.",
    categories: ["stay informed", "ship faster"],
    cover: COVER["daily-brief"],
    detail: {
      useCases: [
        {
          heading: "Get a first move, not a data dump.",
          body: "Your agent pulls calendar, inbox, messages, and KPIs into one tight brief that names the single most important action and the evidence behind it.",
        },
        {
          heading: "Wire it to your own sources.",
          body: "Point it at calendar, email, Slack, Stripe, analytics, even notes files — it shows only the signals that could change what you do today.",
        },
      ],
      whyItMatters:
        "A single, reliable, synthesized source of the daily updates you care about keeps you focused and gives peace of mind — meeting you where you want to be met.",
      howItFits:
        "I have a standing job that runs it first thing every morning, so I know what to do and what's changed before I open my laptop.",
      pairsWith: ["events", "pull-feed"],
    },
  },
  {
    slug: "codex",
    name: "/codex",
    tagline: "A Codex gut-check when Claude is driving",
    categories: ["ship faster", "think sharper"],
    cover: COVER["codex"],
  },
  {
    slug: "pull-digg",
    name: "/pull-digg",
    tagline: "Stay on top of the AI-news firehose",
    categories: ["stay informed", "research faster"],
    cover: COVER["pull-digg"],
  },
  {
    slug: "events",
    name: "/events",
    tagline: "Surface the local events worth your time",
    categories: ["stay informed", "research faster"],
    cover: COVER["events"],
  },
]

/** Slugs open by default on desktop — the three the frame shows expanded. */
export const defaultOpenSlugs = ["research", "projector", "daily-brief"]
