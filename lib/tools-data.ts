/**
 * Data for the /tools "Skill Playbook" page, transcribed from the Figma frames
 * `page · playbook · desktop|mobile · light|dark` (16:2). The row order, taglines,
 * category tags, install strings, and the three authored expansions (/research,
 * /projector, /daily-brief) match the desktop frame exactly.
 */

import type { LatticeMark } from "@/components/lattice"

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

/** Hero copy, transcribed from `page · playbook · desktop · light` (971:12–971:19). */
export const playbookHero = {
  kicker: "// the tools · ryan’s agent skills · hand-built",
  title: "Skills to make your own.",
  intro:
    "The skills I use every day to research, design, think, and ship. Drop them into Claude Code, Codex, Cursor, or your AI agent of choice. Take whatever seems useful and make it better.",
  installHint: "or grab any single one below",
  expandHint: "// click any skill to expand",
} as const

/**
 * The desktop frame's `blueprint-grid` layer (971:3), extracted 1:1 and expressed
 * in a 400-wide box anchored to the RIGHT edge of the 1280 content column
 * (local x = frameX − 960, local y = frameY − 120).
 *
 * One canon correction: the frame draws its two junction markers as hollow
 * CIRCLES; DESIGN.md's lattice grammar forbids hollow circles, so they ship as
 * hollow squares of the same size, centred on the same rule junctions.
 *
 * The mobile frames (1006:99 / 1006:100) carry NO lattice layer — the skill list
 * runs edge to edge — so there is no mobile counterpart here.
 */
export const toolsLatticeDesktop: LatticeMark[] = [
  { type: "rule", x: 60, y: 20, w: 1.2, h: 260 },
  { type: "rule", x: 220, y: 50, w: 1.2, h: 370 },
  { type: "rule", x: 370, y: 10, w: 1.2, h: 350 },
  { type: "rule", x: 20, y: 90, w: 380, h: 1.2 },
  { type: "rule", x: 40, y: 320, w: 340, h: 1.2 },
  { type: "square", x: 212, y: 82, size: 16 },
  { type: "square", x: 52, y: 192, size: 14 },
  { type: "dot", x: 366.5, y: 316.5 },
]

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
    detail: {
      useCases: [
        {
          heading: "Product idea to screens.",
          body: "Describe what you want — a landing page, a multi-step flow — and the agent builds it in Figma, section by section.",
        },
        {
          heading: "A designer that critiques its own work.",
          body: "It screenshots each section, scores it on hierarchy, spacing, color, and type, then fixes what's weak and re-checks.",
        },
      ],
      whyItMatters:
        "Most AI design output is a one-shot guess you clean up by hand. This runs the loop a real designer would: design it, step back, make changes, repeat — incredibly powerful with a thorough style guide.",
      howItFits:
        "I take a nice HTML or React prototype and use design to build a Figma replica, then iterate as hands-on or hands-off as the project needs.",
      pairsWith: ["build", "ink", "research"],
    },
  },
  {
    slug: "think",
    name: "/think",
    tagline: "Harden any idea before it becomes a plan",
    categories: ["think sharper", "ship faster"],
    cover: COVER["think"],
    detail: {
      useCases: [
        {
          heading: "Pressure-test before you commit.",
          body: "Throw a half-formed idea, plan, or message at it and get a fast multi-angle read — like sharing it with peers, except you walk away with a tighter iteration instead of notes.",
        },
        {
          heading: "Poke holes one question at a time.",
          body: "Let agents interrogate you and challenge your best ideas, forcing you to think outside the box before you deploy another line of code.",
        },
      ],
      whyItMatters:
        "Most people underrate LLMs as thought partners. Think gives you a quick, multi-angle gut-check.",
      howItFits:
        "I reach for think the moment I have a rough idea, before it's a plan. I paste it in, take the hardened read, answer its sharpest questions, then hand the sharpened version straight into planning or build.",
      pairsWith: ["pitch-me", "build", "ink"],
    },
  },
  {
    slug: "pitch-me",
    name: "/pitch-me",
    tagline: "Get N wildly different ideas before you commit",
    categories: ["think sharper", "ship faster"],
    cover: COVER["pitch-me"],
    detail: {
      useCases: [
        {
          heading: "Browse a menu of strategic directions.",
          body: "Say “pitch me 9 strategies for X” and get nine genuinely distinct concepts laid in front of you — each with research backing, an outside perspective, a quick visual, and a score.",
        },
        {
          heading: "See a concept framed a dozen ways.",
          body: "Take a bold idea and visualize it quickly to get a feel for it. Scan it like a catalog and pick which concepts to dive into.",
        },
      ],
      whyItMatters:
        "Handed a list, we grab the first idea that feels right and run. Pitch Me is the counter — it keeps the human in the loop while agents diverge across visual concepts and expand your thinking.",
      howItFits:
        "When I have low conviction on an idea or how something should look, pitch-me speeds up the creative process and surfaces approaches I wouldn't have considered.",
      pairsWith: ["research", "think", "ink"],
    },
  },
  {
    slug: "ink",
    name: "/ink",
    tagline: "Visualize just about anything in HTML",
    categories: ["communicate better", "research faster"],
    cover: COVER["ink"],
    detail: {
      useCases: [
        {
          heading: "Visualize anything.",
          body: "Agents end every task with a wall of text. Digest research briefs, plans, workflow summaries, strategy memos — just about anything — as designed HTML instead.",
        },
        {
          heading: "Doc zero to hero.",
          body: "Take any doc, dataset, or pitch and transform all of it, or just the highlights, into a design sharp as a coffee-table book.",
        },
      ],
      whyItMatters:
        "Visuals make ideas easy to share, and HTML is malleable and portable. It's also no shame to admit how easily we all burn out reading markdown docs — HTML is a great alternative.",
      howItFits:
        "I use ink to share ideas with others, or to have agents share theirs with me in visually rich HTML.",
      pairsWith: ["host-me", "pitch-me"],
    },
  },
  {
    slug: "primer",
    name: "/primer",
    tagline: "Turn any tech announcement into a simple breakdown",
    categories: ["research faster", "communicate better"],
    cover: COVER["primer"],
    detail: {
      useCases: [
        {
          heading: "Decode a viral tech trend.",
          body: "Drop in an announcement, thread, or bit of terminology and get back a cited breakdown of what it actually is, how it works, and why it matters to you.",
        },
        {
          heading: "Ship a shareable explainer.",
          body: "It builds a designed, interactive single-page site explaining the concept in plain terms — deploy it to a live URL and share with anyone.",
        },
      ],
      whyItMatters:
        "Big announcements drop faster than you can use them. When a new concept trends for a couple of days, it's hard to tell if it's valuable or just noise. Primer does the legwork so you stay informed without getting overwhelmed by new terminology.",
      howItFits:
        "When something lands on my feed that I know matters but don't fully get, I point primer at a few relevant links and let it explain it to me on my time.",
      pairsWith: ["research", "ink", "channel"],
    },
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
    detail: {
      useCases: [
        {
          heading: "Pan through messy or old notes.",
          body: "Drop in years of scattered notes, exports, or abandoned folders and have agents surface the handful of ideas still worth acting on.",
        },
        {
          heading: "Learn from any dataset.",
          body: "Find the nuggets you care about amid a sea of noise — great for analogous systems or abandoned codebases when you have a specific problem to solve.",
        },
      ],
      whyItMatters:
        "We hang onto notes, reports, and old code longer than we should. Mine turns what you've kept but never distilled into insights you can use to drive strategy or win an argument.",
      howItFits:
        "I point mine at anything I've been hoarding — old notes, a dead repo, a folder of exports — and let agents dig while I do something else. The gems come back as a capsule I can actually use.",
      pairsWith: ["pitch-me", "projector", "research"],
    },
  },
  {
    slug: "auto-mine",
    name: "/auto-mine",
    tagline: "Mine your sources overnight, wake to the gems",
    categories: ["research faster", "keep projects alive"],
    cover: COVER["auto-mine"],
    detail: {
      useCases: [
        {
          heading: "Mine while you sleep.",
          body: "Point it at a messy source before bed; it works the whole mining loop unattended until it runs out of new gems or hits its limit. By morning there's a tidy digest of the best finds waiting.",
        },
        {
          heading: "Read-only and honest.",
          body: "It never touches your sources and never decides anything for you. You wake to ranked keepers, a keep-vs-toss ratio, and parked cards that wait for your call.",
        },
      ],
      whyItMatters:
        "The best research dies because nobody has a free evening to grind through it. Auto-mine runs the digging unattended, then deliberately stops and hands judgment back — authorized, read-only, parked for review by design.",
      howItFits:
        "I queue up a selection of Apple Notes at the end of the day, approve the run, and let it grind overnight. In the morning I skim the ranked keepers and decide what's worth pulling into my projects.",
      pairsWith: ["mine", "capsule", "ink"],
    },
  },
  {
    slug: "capsule",
    name: "/capsule",
    tagline: "Portable, actionable knowledge transfer between agents",
    categories: ["keep projects alive"],
    cover: COVER["capsule"],
    detail: {
      useCases: [
        {
          heading: "Bottle knowledge, hand it off.",
          body: "Package ideas in a portable framework that compresses context when it's created and expands on arrival. Loading a capsule in a new session transfers the knowledge with ~90% effectiveness.",
        },
        {
          heading: "Start fresh with any context.",
          body: "Extract just the relevant context from one conversation into another — a baton pass that delivers exactly what's needed to keep pulling that thread.",
        },
      ],
      whyItMatters:
        "Skills share repeatable workflows between agents, but the missing piece is the context that hones them to max effectiveness. Capsules package context and skills, directing agents to load just what's needed to do the thing you want.",
      howItFits:
        "I'll fall in love with a plan, then use capsules to distill the key details I need to start separate sessions for design, PRD writing, user research — whatever I need.",
      pairsWith: ["projector", "build", "channel"],
    },
  },
  {
    slug: "channel",
    name: "/channel",
    tagline: "Load any package's persona and become it on demand",
    categories: ["keep projects alive", "ship faster"],
    cover: COVER["channel"],
    detail: {
      useCases: [
        {
          heading: "Become any package instantly.",
          body: "Name a package and the agent loads its prompt, context, and knowledge files, then stays in that character for the rest of the chat — your essay copilot, interview coach, or operational sidekick.",
        },
        {
          heading: "Resume a project mid-stride.",
          body: "Pull the live state and instructions of a project package into a new conversation. The agent reads the dashboard and instruction files so you skip the re-briefing.",
        },
      ],
      whyItMatters:
        "You build rich worlds of context — personas, reference docs, company context — but every new session starts cold. Channel keeps a session focused on one package, figures out what's useful, and loads that context in.",
      howItFits:
        "When I've got a package built for a project, I channel it into whatever session I'm in and the agent shows up already knowing the persona and the state of the project.",
      pairsWith: ["projector", "capsule", "build"],
    },
  },
  {
    slug: "update-from-session",
    name: "/update-from-session",
    tagline: "Turn each working session into lasting memory",
    categories: ["keep projects alive", "think sharper"],
    // no cover → captioned empty plate
    detail: {
      useCases: [
        {
          heading: "Capture workflow patterns to memory.",
          body: "At the end of a session, pull out what actually changed how you'd work next time — patterns, decisions, surprises — and write them to durable memory files.",
        },
      ],
      whyItMatters:
        "Every session can teach you and your agent something, but most of it vanishes the moment the chat ends. This checks the key details and decisions, and writes down only the stuff that compounds.",
      howItFits:
        "When I wrap a real working session, I run it to review what we solved, then let it write the keepers into memory and log the why behind decisions. The memory files are referenced every session.",
      pairsWith: [],
    },
  },
  {
    slug: "claude",
    name: "/claude",
    tagline: "A Claude gut-check when another model is driving",
    categories: ["ship faster", "think sharper"],
    cover: COVER["claude"],
    detail: {
      useCases: [
        {
          heading: "Let a second model try to break it.",
          body: "Consult Claude for a second opinion, play devil's advocate, or have it tackle a portion of the workflow and relay that back into the model calling the skill.",
        },
      ],
      whyItMatters:
        "When another model is driving your session, it's too easy to trust its own read of its own work. A model from a different lineage catches what the first one rationalized past.",
      howItFits:
        "When a different model is running the session, I fire off the Claude skill to consult or piece together part of the plan. It almost always brings a different perspective.",
      pairsWith: ["codex", "design", "research", "think"],
    },
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
    detail: {
      useCases: [
        {
          heading: "Let a second model try to break it.",
          body: "Consult Codex for a second opinion, play devil's advocate, or have it tackle a portion of the workflow and relay that back into the model calling the skill.",
        },
      ],
      whyItMatters:
        "Your current session is also your biggest cheerleader. Bringing in an independent model breaks the echo chamber and gives you a genuinely adversarial perspective.",
      howItFits:
        "Right before I push a UI Claude built, I have Codex review the diff and tell me what's at risk. When it flags enough, we fix it before shipping.",
      pairsWith: ["claude", "design", "research", "think"],
    },
  },
  {
    slug: "pull-digg",
    name: "/pull-digg",
    tagline: "Stay on top of the AI-news firehose",
    categories: ["stay informed", "research faster"],
    cover: COVER["pull-digg"],
    detail: {
      useCases: [
        {
          heading: "Straight-to-the-point AI news.",
          body: "Get a tight briefing of the most influential stories in AI, ranked by social and credibility signals.",
        },
        {
          heading: "Find repos and accounts worth your time.",
          body: "Have your agent check Digg and surface the GitHub projects and credible accounts quietly starring and posting them.",
        },
      ],
      whyItMatters:
        "Staying current on AI is a part-time job, and most feeds reward whatever's loudest. This scouts a curated AI-news graph, scores candidates against a real bar, and returns only the handful that survive.",
      howItFits:
        "I fire this when I want a fast read on what's moving in AI without opening fifteen tabs — the briefing in the morning, then dig into a story's sources when something looks real.",
      pairsWith: ["daily-brief", "research", "ink"],
    },
  },
  {
    slug: "events",
    name: "/events",
    tagline: "Surface the local events worth your time",
    categories: ["stay informed", "research faster"],
    cover: COVER["events"],
    detail: {
      useCases: [
        {
          heading: "Get a timely shortlist.",
          body: "Agents scan the web for upcoming events and hand back 2–5 actually worth attending, in time for you to go.",
        },
      ],
      whyItMatters:
        "Local event discovery is a chore nobody keeps up with — listings are scattered and boards are noisy. Events turns that into a quick shortlist you actually read.",
      howItFits:
        "Every Monday this runs to keep me aware of cool tech events nearby I might have missed — works great when I'm traveling, too.",
      pairsWith: ["pull-feed", "daily-brief"],
    },
  },
]

/** Slugs open by default on desktop — the three the frame shows expanded. */
export const defaultOpenSlugs = ["research", "projector", "daily-brief"]
