// ─── Active Project (What I'm Building) ─────────────────────────────────────

export interface ActiveProject {
  slug: string
  title: string
  transformIn: string
  transformOut: string
  description: string
  status: "active" | "live" | "pre-build" | "concept"
  proofOfLife?: string
  links?: { label: string; url: string }[]
  tags?: string[]
}

// ─── Past Entry (Where I Come From) ──────────────────────────────────────────

export interface PastEntry {
  title: string
  org: string
  role: string
  period: string
  transformIn: string
  transformOut: string
  description: string
  metric?: string
  logo?: { light: string; dark: string }
}

// ─── Methodology ─────────────────────────────────────────────────────────────

export interface Framework {
  name: string
  description: string
  zones?: { name: string; color: string; description: string; examples: string[] }[]
}

export interface Lens {
  name: string
  focus: string
  activateWhen: string
  color: string
}

export interface CapsulePreview {
  name: string
  description: string
  archetype: string
  ctaUrl?: string
}

// ─── Gear ────────────────────────────────────────────────────────────────────

export interface GearItem {
  name: string
  category: "ai" | "code" | "build" | "organize"
  whyILoveIt: string
  connectsTo: string[]
  icon?: { light: string; dark: string }
}

// ─── Essays ──────────────────────────────────────────────────────────────────

export interface Essay {
  id: string
  date: string
  title: string
  preview: string
  url: string
}

// ─── Dashboard ───────────────────────────────────────────────────────────────

export interface DashboardProject {
  name: string
  phase: "research" | "pre-build" | "building" | "shipped" | "live"
  focus: string
  progress: number // 0-100
}

export interface ResearchTheme {
  name: string
  strength: "strong" | "moderate" | "emerging"
  findingCount: number
}

export interface DashboardDecision {
  date: string
  decision: string
}

export interface ContentDraft {
  title: string
  platform: "x" | "linkedin"
  score: number
  status: "draft" | "reviewed" | "published"
}

export interface DashboardData {
  projects: DashboardProject[]
  research: {
    activeDomains: string[]
    totalFindings: number
    themes: ResearchTheme[]
    cyclesCompleted: number
  }
  velocity: {
    backlog: number
    inProgress: number
    done: number
  }
  decisions: DashboardDecision[]
  content: ContentDraft[]
  heartbeat: {
    lastUpdated: string
    agentCount: number
    skillCount: number
    streamsActive: number
  }
}

// ─── System Architecture (for interactive dashboard) ─────────────────────────

export interface SystemStream {
  id: string
  name: string
  type: "research" | "build" | "content"
  status: "active" | "completed" | "placeholder"
  project: string
  summary: string
  details: {
    cyclesCompleted?: number
    findingsKept?: number
    themes?: string[]
    phase?: string
    tasksDone?: number
    tasksTotal?: number
    draftsCount?: number
  }
}

export interface SystemSkill {
  name: string
  slug: string
  category: string
  description: string
}

export interface SystemArchitecture {
  lenses: { name: string; color: string; activeSkills: string[] }[]
  skills: SystemSkill[]
  domains: { name: string; description: string }[]
  streams: SystemStream[]
}

// ─── Legacy (keep for old project detail pages until removed) ────────────────

export interface Project {
  id: string
  title: string
  description: string
  coverImage: string
  prototypeUrl: string
  problemStatement: string
  myRole: string
  processOverview?: string
  technicalInnovation?: string
  strategicExecution?: string
  stakeholderManagement?: string
  impactAndLegacy?: string
  keyLearnings?: string
  technologyHighlights?: string
  impact?: string
  customerAndStakeholderFeedback?: string
  lessonsLearned?: string
  implementationAndImpact?: string
  lookingForward?: string
}

export interface WorkExperience {
  company: string
  role: string
  period: string
  logo: { light: string; dark: string }
}

export interface Tool {
  name: string
  description: string
  icon: { light: string; dark: string }
}
