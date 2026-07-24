import type {
  ActiveProject,
  PastEntry,
  Framework,
  Lens,
  CapsulePreview,
  GearItem,
  Essay,
  DashboardData,
  SystemArchitecture,
  Project,
  WorkExperience,
  Tool,
} from "./types"

// ═══════════════════════════════════════════════════════════════════════════════
// ACTIVE PROJECTS
// ═══════════════════════════════════════════════════════════════════════════════

export const activeProjects: ActiveProject[] = [
  {
    slug: "ryos",
    title: "ryOS / Mission Control",
    transformIn: "scattered context",
    transformOut: "orchestrated daily priorities",
    description:
      "A personal operating system that routes calendar, tasks, and knowledge through four specialized AI lenses to surface daily priorities and ship work. Live dashboard at mc.ryanwigley.com.",
    status: "live",
    proofOfLife: "4 lens agents, 12 registered skills, daily production use",
    links: [{ label: "Dashboard", url: "https://mc.ryanwigley.com" }],
    tags: ["agent orchestration", "knowledge routing", "personal infrastructure"],
  },
  {
    slug: "waveform",
    title: "Waveform",
    transformIn: "raw podcast recordings",
    transformOut: "publish-ready episodes",
    description:
      "An audio editor for podcasters — the missing middle between Audacity and Descript. Browser-native, AI-enhanced.",
    status: "pre-build",
    proofOfLife: "204 research findings, tech stack locked, 4 spikes complete",
    links: [{ label: "wavefrm.io", url: "https://wavefrm.io" }],
    tags: ["audio processing", "browser-native", "creator tools"],
  },
  {
    slug: "capsules",
    title: "Capsules",
    transformIn: "agent context",
    transformOut: "portable knowledge packets",
    description:
      "A knowledge transfer protocol for AI systems. Structured compression with evaluation harness and seven archetypes.",
    status: "active",
    proofOfLife: "7 archetypes, compression eval framework, production use across ryOS",
    links: [
      {
        label: "Read the essay",
        url: "https://blog.ryanwigley.com/capsules-a-framework-for-portable-knowledge-transfer-between-ai-agent",
      },
    ],
    tags: ["knowledge transfer", "agent protocol", "compression"],
  },
  {
    slug: "productonics",
    title: "Productonics",
    transformIn: "manual business operations",
    transformOut: "AI-integrated systems",
    description:
      "AI systems consulting for SMBs. I build the operating systems that run your business — not tools you have to learn, but infrastructure that works.",
    status: "active",
    proofOfLife: "Methodology designed, research validated, first engagements forming",
    tags: ["business operating systems", "AI integration", "process engineering"],
  },
]

// ═══════════════════════════════════════════════════════════════════════════════
// PAST ENTRIES (career arc)
// ═══════════════════════════════════════════════════════════════════════════════

export const pastEntries: PastEntry[] = [
  {
    title: "BounceBug",
    org: "BounceBug",
    role: "Co-Founder",
    period: "2011–2012",
    transformIn: "music scene chaos",
    transformOut: "curated daily coverage",
    description:
      "Built a dance music media platform from zero to 2MM monthly uniques and $4.1K MRR. First system: content at scale.",
    metric: "2MM monthly uniques",
    logo: { light: "/companies/bouncebug-icon.svg", dark: "/companies/bouncebug-icon2.svg" },
  },
  {
    title: "Dubset / MixBANK",
    org: "Dubset Media",
    role: "Founding PM → Director of Product",
    period: "2012–2020",
    transformIn: "unlicensed DJ mixes",
    transformOut: "rights-cleared, royalty-ready audio",
    description:
      "Built the content processing infrastructure that identified, matched, and cleared rights for mixed audio at scale — audio fingerprinting, automated licensing, $2MM monthly royalties. The system that made Dubset valuable enough for a $50M acquisition by Pex.",
    metric: "$50M acquisition",
    logo: { light: "/companies/dubset-icon.svg", dark: "/companies/dubset-icon2.svg" },
  },
  {
    title: "Amazon",
    org: "Amazon",
    role: "Sr Technical Product Manager",
    period: "2021–2025",
    transformIn: "fragmented subscription APIs",
    transformOut: "unified partner platform",
    description:
      "Led the API v2 migration across 100+ partners — 82% error rate reduction. Designed mobile distribution systems serving millions of devices across Prime, Prime Video, Music, and Audible.",
    metric: "82% error reduction",
    logo: { light: "/companies/amazon-icon.svg", dark: "/companies/amazon-icon2.svg" },
  },
  {
    title: "Raya",
    org: "Raya",
    role: "Senior Product Manager",
    period: "2025–present",
    transformIn: "membership experience",
    transformOut: "AI-augmented community",
    description: "Currently leading membership experience and AI adoption.",
    logo: { light: "/companies/raya-icon.svg", dark: "/companies/raya-icon2.svg" },
  },
]

// ═══════════════════════════════════════════════════════════════════════════════
// METHODOLOGY
// ═══════════════════════════════════════════════════════════════════════════════

export const threeZones: Framework = {
  name: "The Three Zones",
  description:
    "Every business process falls into one of three zones. The methodology starts by mapping where everything lives today, then designing the system that moves work to the right zone.",
  zones: [
    {
      name: "Runs Itself",
      color: "emerald",
      description: "Fully automated. No human in the loop.",
      examples: ["Invoice generation", "Lead intake", "Status updates", "Data entry"],
    },
    {
      name: "AI-Assisted",
      color: "amber",
      description: "AI drafts, human decides.",
      examples: ["Proposal drafting", "Meeting prep", "Content creation", "Research"],
    },
    {
      name: "Stays Human",
      color: "sky",
      description: "Judgment, relationships, strategy. AI doesn't touch it.",
      examples: ["Client relationships", "Strategic decisions", "Creative judgment", "Leadership"],
    },
  ],
}

export const lenses: Lens[] = [
  {
    name: "Synthesizer",
    focus: "Patterns, decisions, strategic clarity",
    activateWhen: "Prioritization, connecting dots, 'why' questions",
    color: "violet",
  },
  {
    name: "Architect",
    focus: "Systems, relationships, tradeoffs",
    activateWhen: "Technical strategy, 'how does this hold together'",
    color: "sky",
  },
  {
    name: "Guardian",
    focus: "Edge cases, protection, downside",
    activateWhen: "Risk assessment, quality, 'what am I not seeing'",
    color: "rose",
  },
  {
    name: "Sculptor",
    focus: "Design, narrative, experience craft",
    activateWhen: "Communication, UX, making things resonate",
    color: "amber",
  },
]

export const capsulePreviews: CapsulePreview[] = [
  {
    name: "The Capsule Protocol",
    description:
      "A structured format for packaging knowledge, patterns, and skills into portable artifacts any AI system can consume. Seven archetypes from Perishable to Dormant.",
    archetype: "Trainer",
    ctaUrl: "#",
  },
  {
    name: "Productonics Capsule",
    description:
      "Complete go-to-market strategy, pricing architecture, and sales narrative for AI consulting. Research-validated across 4 cycles and 9 agents.",
    archetype: "Seed",
    ctaUrl: "#",
  },
]

// ═══════════════════════════════════════════════════════════════════════════════
// GEAR (topology, not shopping list)
// ═══════════════════════════════════════════════════════════════════════════════

export const gear: GearItem[] = [
  {
    name: "Claude Code",
    category: "code",
    whyILoveIt: "My primary engineering partner. Skills, hooks, agents — it runs ryOS.",
    connectsTo: ["Claude", "Cursor", "Notion"],
    icon: { light: "/tools/claudecode-icon.svg", dark: "/tools/claudecode-icon2.svg" },
  },
  {
    name: "Claude",
    category: "ai",
    whyILoveIt: "Deep thinking, long context, council deliberations. The brain behind the lenses.",
    connectsTo: ["Claude Code", "Notion"],
    icon: { light: "/tools/claude-icon.svg", dark: "/tools/claude-icon2.svg" },
  },
  {
    name: "ChatGPT",
    category: "ai",
    whyILoveIt: "Thought partner for brainstorming and information synthesis.",
    connectsTo: ["Notion"],
    icon: { light: "/tools/chatgpt-icon.svg", dark: "/tools/chatgpt-icon2.svg" },
  },
  {
    name: "Perplexity",
    category: "ai",
    whyILoveIt: "Research with citations. When I need sources, not opinions.",
    connectsTo: ["Notion", "Claude"],
    icon: { light: "/tools/perplexity-ai-icon.svg", dark: "/tools/perplexity-ai-icon2.svg" },
  },
  {
    name: "Cursor",
    category: "code",
    whyILoveIt: "AI-powered code editor. Composer mode for rapid prototyping.",
    connectsTo: ["Claude Code", "v0"],
    icon: { light: "/tools/code-tags.svg", dark: "/tools/code-tags2.svg" },
  },
  {
    name: "v0",
    category: "build",
    whyILoveIt: "Fastest path from design spec to deployed prototype.",
    connectsTo: ["Cursor", "Lovable"],
    icon: { light: "/tools/v0-icon.svg", dark: "/tools/v0-icon2.svg" },
  },
  {
    name: "Lovable",
    category: "build",
    whyILoveIt: "Full-stack prototypes from description. Ship MVPs in hours.",
    connectsTo: ["v0", "Replit"],
    icon: { light: "/tools/lovable-icon.svg", dark: "/tools/lovable-icon2.svg" },
  },
  {
    name: "Replit",
    category: "build",
    whyILoveIt: "Fast apps, agents, and tools with data integration.",
    connectsTo: ["Lovable", "Claude Code"],
    icon: { light: "/tools/replit-icon.svg", dark: "/tools/replit-icon2.svg" },
  },
  {
    name: "Notion",
    category: "organize",
    whyILoveIt: "Flexible database for family, projects, and ideas. The capture layer.",
    connectsTo: ["Claude", "ChatGPT", "Claude Code"],
    icon: { light: "/tools/notion-icon.svg", dark: "/tools/notion-icon2.svg" },
  },
]

// ═══════════════════════════════════════════════════════════════════════════════
// ESSAYS
// ═══════════════════════════════════════════════════════════════════════════════

export const essays: Essay[] = [
  {
    id: "8",
    date: "3/14/26",
    title: "Capsules Essay",
    preview:
      "PM editorial compression is the missing protocol for agent-to-agent knowledge transfer. I built capsules and an evaluation harness to prove it.",
    url: "https://blog.ryanwigley.com/capsules-a-framework-for-portable-knowledge-transfer-between-ai-agent",
  },
  {
    id: "6",
    date: "11/9/25",
    title: "Personal Engineering",
    preview:
      "It's ironic how we obsessed over the interface while the real breakthrough was happening in the background.",
    url: "https://blog.ryanwigley.com/personal-engineering",
  },
  {
    id: "1",
    date: "2/26/25",
    title: "Everyday AI Copilots",
    preview: "A walkthrough of how I use AI assistants to get more sh*t done.",
    url: "https://blog.ryanwigley.com/everyday-ai-copilots",
  },
  {
    id: "2",
    date: "1/26/25",
    title: "Thought Partner, Assistant, & Agent",
    preview: "A PM's practical guide to using AI: mental models, prompts, and tools.",
    url: "https://blog.ryanwigley.com/thought-partner-assistant-and-agent",
  },
  {
    id: "7",
    date: "12/12/24",
    title: "100 Days of AI",
    preview: "I've been finding myself thinking a lot about young Ryan lately.",
    url: "https://blog.ryanwigley.com/100-days-of-ai",
  },
  {
    id: "3",
    date: "12/5/24",
    title: "Free-range AI Agents",
    preview:
      "I can't stop thinking about AI agents. We're witnessing the dawn of truly autonomous digital beings.",
    url: "https://blog.ryanwigley.com/free-range-ai-agents",
  },
  {
    id: "4",
    date: "10/31/24",
    title: "The Growing AI Innovation Gap",
    preview: "This gap isn't just about access to tools, it's about the pace of innovation.",
    url: "https://blog.ryanwigley.com/the-growing-ai-innovation-gap",
  },
  {
    id: "5",
    date: "10/22/24",
    title: "How to Avoid Overthinking Your API",
    preview:
      "If you are in the business of software integrations, your API is your brand's digital handshake with the world.",
    url: "https://blog.ryanwigley.com/how-to-avoid-overthinking-your-api",
  },
]

// ═══════════════════════════════════════════════════════════════════════════════
// DASHBOARD (mock data — structured to match MC's JSON for easy swap)
// ═══════════════════════════════════════════════════════════════════════════════

export const dashboardData: DashboardData = {
  projects: [
    {
      name: "Waveform",
      phase: "pre-build",
      focus: "Scaffold React + Zustand + Canvas architecture",
      progress: 15,
    },
    {
      name: "ryOS",
      phase: "live",
      focus: "v3 knowledge architecture — mess hall compilation",
      progress: 72,
    },
    {
      name: "Productonics",
      phase: "research",
      focus: "First client acquisition — cold start playbook",
      progress: 35,
    },
  ],
  research: {
    activeDomains: ["Podcaster pain points", "AI consulting channels", "Audio quality enhancement"],
    totalFindings: 84,
    themes: [
      { name: "Filler removal", strength: "strong", findingCount: 14 },
      { name: "Web-native gap", strength: "strong", findingCount: 11 },
      { name: "Template-first editing", strength: "moderate", findingCount: 8 },
      { name: "Descript pricing pain", strength: "moderate", findingCount: 7 },
      { name: "Mobile recording quality", strength: "emerging", findingCount: 5 },
    ],
    cyclesCompleted: 4,
  },
  velocity: {
    backlog: 23,
    inProgress: 0,
    done: 4,
  },
  decisions: [
    { date: "2026-04-04", decision: "Brand bible finalized — cream canvas, coral action, teal content" },
    { date: "2026-04-04", decision: "Tech stack locked: React + TS + Vite + Zustand" },
    { date: "2026-04-03", decision: "Filler detection deferred to V1 (out of MVP)" },
    { date: "2026-04-03", decision: "Dark mode deferred — not MVP, not V1" },
    { date: "2026-03-28", decision: "Mission Control v1 shipped to mc.ryanwigley.com" },
  ],
  content: [
    { title: "Filler removal is the feature podcasters dream about", platform: "x", score: 8.3, status: "reviewed" },
    { title: "Descript's pricing is pushing creators to downgrade", platform: "x", score: 7.7, status: "draft" },
    { title: "The missing middle in podcast editing", platform: "linkedin", score: 8.0, status: "draft" },
    { title: "Why I built my own operating system", platform: "linkedin", score: 7.3, status: "draft" },
  ],
  heartbeat: {
    lastUpdated: "2026-04-04T09:15:00Z",
    agentCount: 4,
    skillCount: 12,
    streamsActive: 6,
  },
}

// ═══════════════════════════════════════════════════════════════════════════════
// SYSTEM ARCHITECTURE (interactive dashboard data)
// ═══════════════════════════════════════════════════════════════════════════════

export const systemArchitecture: SystemArchitecture = {
  lenses: [
    { name: "Synthesizer", color: "violet", activeSkills: ["council-think", "council-plan", "research", "mark"] },
    { name: "Architect", color: "sky", activeSkills: ["council-think", "council-plan", "build"] },
    { name: "Guardian", color: "rose", activeSkills: ["council-think", "council-plan", "capsule-eval"] },
    { name: "Sculptor", color: "amber", activeSkills: ["council-think", "council-plan", "x-post", "linkedin", "social", "pdfer"] },
  ],
  skills: [
    { name: "Session Start", slug: "session-start", category: "session", description: "Initialize session with context validation" },
    { name: "Bootstrap", slug: "bootstrap", category: "session", description: "Full state initialization from intake" },
    { name: "Sync", slug: "sync", category: "session", description: "Lightweight context refresh" },
    { name: "Log Work", slug: "log-work", category: "tracking", description: "Append entry to domain worklog" },
    { name: "Mark", slug: "mark", category: "tracking", description: "Mid-day checkpoint: synthesize, log, update" },
    { name: "Kanban", slug: "kanban", category: "tracking", description: "Manage domain task boards" },
    { name: "Today", slug: "today", category: "daily", description: "Comprehensive daily catch-up across all systems" },
    { name: "Push Today", slug: "push-today", category: "daily", description: "Briefing delivered to Discord and tablet" },
    { name: "Council Think", slug: "council-think", category: "council", description: "Four-lens parallel deliberation on any topic" },
    { name: "Council Plan", slug: "council-plan", category: "council", description: "Sequential planning with four-lens review" },
    { name: "Research", slug: "research", category: "creation", description: "Autonomous persona-driven web research" },
    { name: "Build", slug: "build", category: "creation", description: "Kanban-driven task execution with gate respect" },
    { name: "Projector", slug: "projector", category: "creation", description: "Claude Project package creation" },
    { name: "Capsule", slug: "capsule", category: "creation", description: "Agent-to-agent knowledge transfer" },
    { name: "X Post", slug: "x-post", category: "content", description: "X/Twitter posts with built-in critique" },
    { name: "LinkedIn", slug: "linkedin", category: "content", description: "LinkedIn posts with professional voice" },
    { name: "Social", slug: "social", category: "content", description: "Both X and LinkedIn from a single idea" },
    { name: "PDFer", slug: "pdfer", category: "content", description: "Beautiful print-ready HTML documents" },
    { name: "Commit", slug: "commit-changes", category: "git", description: "Context-aware git commit and push" },
    { name: "Midjourney", slug: "midjourney-prompt", category: "design", description: "Collaborative prompt crafting with style DNA" },
  ],
  domains: [
    { name: "Builder", description: "Experiments, content, products, consultancy, career, finances" },
    { name: "Family", description: "Logistics, planning, health, coordination, relationships" },
  ],
  streams: [
    {
      id: "waveform-pain-points",
      name: "Waveform Pain Points",
      type: "research",
      status: "completed",
      project: "Waveform",
      summary: "Podcaster switching triggers and friction mapping",
      details: { cyclesCompleted: 4, findingsKept: 84, themes: ["Filler removal", "Web-native gap", "Template editing", "Descript pricing", "Mobile quality"] },
    },
    {
      id: "capsules-for-sale",
      name: "Capsules for Sale",
      type: "research",
      status: "active",
      project: "ryOS",
      summary: "Viability of selling capsules as knowledge products",
      details: { cyclesCompleted: 1, findingsKept: 12 },
    },
    {
      id: "productonics-channels",
      name: "AI Consulting Channels",
      type: "research",
      status: "active",
      project: "Productonics",
      summary: "Where SMB buyers actually discover AI consultants",
      details: { cyclesCompleted: 2, findingsKept: 31 },
    },
    {
      id: "waveform-build",
      name: "Waveform Product Build",
      type: "build",
      status: "active",
      project: "Waveform",
      summary: "MVP scaffold through first 50 users",
      details: { phase: "pre-build", tasksDone: 4, tasksTotal: 27 },
    },
    {
      id: "social-content-mill",
      name: "Social Content Mill",
      type: "content",
      status: "active",
      project: "Builder",
      summary: "Generate and score social drafts from research insights",
      details: { draftsCount: 5 },
    },
    {
      id: "audio-quality",
      name: "Audio Quality Enhancement",
      type: "research",
      status: "completed",
      project: "Waveform",
      summary: "Beyond noise removal — making phone recordings sound studio-quality",
      details: { cyclesCompleted: 2, findingsKept: 18 },
    },
  ],
}

// ═══════════════════════════════════════════════════════════════════════════════
// LEGACY (old projects — kept for redirect handling)
// ═══════════════════════════════════════════════════════════════════════════════

export const projects: Project[] = [
  // Kept minimal — old detail pages still reference these during transition
  {
    id: "marketplace",
    title: "Music Marketplace",
    description: "Rights management technology for DJ mixes and remixes.",
    coverImage: "/mixbank-demo-ss.png",
    prototypeUrl: "https://super-frangollo-031a70.netlify.app/",
    problemStatement: "",
    myRole: "",
  },
]

export const workExperience: WorkExperience[] = [
  {
    company: "Raya",
    role: "Principal PM",
    period: "2025 - today",
    logo: { light: "/companies/raya-icon.svg", dark: "/companies/raya-icon2.svg" },
  },
  {
    company: "Amazon",
    role: "Sr Technical PM",
    period: "2021 - 2025",
    logo: { light: "/companies/amazon-icon.svg", dark: "/companies/amazon-icon2.svg" },
  },
  {
    company: "Dubset Media",
    role: "Founding PM",
    period: "2012 - 2020",
    logo: { light: "/companies/dubset-icon.svg", dark: "/companies/dubset-icon2.svg" },
  },
  {
    company: "Bouncebug",
    role: "Co-Founder",
    period: "2011 - 2012",
    logo: { light: "/companies/bouncebug-icon.svg", dark: "/companies/bouncebug-icon2.svg" },
  },
]

export const tools: Tool[] = [
  {
    name: "Notion",
    description: "Flexible database for my family, projects, and new ideas.",
    icon: { light: "/tools/notion-icon.svg", dark: "/tools/notion-icon2.svg" },
  },
]
