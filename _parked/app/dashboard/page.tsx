"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { dashboardData, systemArchitecture } from "@/lib/data"
import { useState } from "react"
import {
  Activity,
  BarChart3,
  ChevronDown,
  ChevronRight,
  FileText,
  GitBranch,
  Layers,
  Radio,
  Zap,
} from "lucide-react"

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
}

const PHASE_COLORS: Record<string, string> = {
  research: "bg-violet-500/15 text-violet-400 border-violet-500/30",
  "pre-build": "bg-sky-500/15 text-sky-400 border-sky-500/30",
  building: "bg-primary/15 text-primary border-primary/30",
  shipped: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  live: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
}

const STRENGTH_COLORS: Record<string, string> = {
  strong: "bg-primary/20 text-primary",
  moderate: "bg-sky-500/15 text-sky-400",
  emerging: "bg-muted text-muted-foreground",
}

const STREAM_TYPE_COLORS: Record<string, string> = {
  research: "text-violet-400",
  build: "text-sky-400",
  content: "text-primary",
}

const STREAM_STATUS_COLORS: Record<string, string> = {
  active: "bg-primary/15 text-primary border-primary/30",
  completed: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  placeholder: "bg-muted text-muted-foreground border-border",
}

const LENS_DOT: Record<string, string> = {
  violet: "bg-violet-400",
  sky: "bg-sky-400",
  rose: "bg-rose-400",
  amber: "bg-amber-400",
}

const LENS_BORDER: Record<string, string> = {
  violet: "border-violet-500/20",
  sky: "border-sky-500/20",
  rose: "border-rose-500/20",
  amber: "border-primary/20",
}

const SKILL_CAT_COLORS: Record<string, string> = {
  session: "text-muted-foreground",
  tracking: "text-sky-400",
  daily: "text-emerald-400",
  council: "text-violet-400",
  creation: "text-primary",
  content: "text-rose-400",
  git: "text-muted-foreground",
  design: "text-amber-400",
}

// ─── Tabs ───────────────────────────────────────────────────────────────────

const TABS = [
  { id: "overview", label: "Overview", icon: Activity },
  { id: "streams", label: "Streams", icon: Radio },
  { id: "system", label: "Lenses & Skills", icon: Layers },
  { id: "decisions", label: "Decisions", icon: GitBranch },
  { id: "queue", label: "Queue", icon: FileText },
] as const

type TabId = (typeof TABS)[number]["id"]

// ─── Stream Card (expandable) ───────────────────────────────────────────────

function StreamCard({ stream }: { stream: (typeof systemArchitecture.streams)[0] }) {
  const [open, setOpen] = useState(false)
  const det = stream.details

  return (
    <div className="rounded-lg border border-border/50 bg-card/30 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 p-4 text-left hover:bg-card/50 transition-colors"
      >
        {open ? (
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground/50 shrink-0" />
        ) : (
          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50 shrink-0" />
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium">{stream.name}</span>
            <span className={`text-[9px] font-mono uppercase ${STREAM_TYPE_COLORS[stream.type] ?? ""}`}>
              {stream.type}
            </span>
            <span
              className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded-full border ${
                STREAM_STATUS_COLORS[stream.status] ?? ""
              }`}
            >
              {stream.status}
            </span>
          </div>
          <p className="text-xs text-muted-foreground/60 mt-0.5 truncate">{stream.summary}</p>
        </div>
        <span className="text-[10px] font-mono text-muted-foreground/30 shrink-0">{stream.project}</span>
      </button>

      {open && (
        <div className="px-4 pb-4 pt-0 ml-7 border-t border-border/30">
          <div className="pt-3 space-y-2">
            {det.cyclesCompleted !== undefined && (
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground/60">Cycles completed</span>
                <span className="font-mono text-foreground/80">{det.cyclesCompleted}</span>
              </div>
            )}
            {det.findingsKept !== undefined && (
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground/60">Findings kept</span>
                <span className="font-mono text-foreground/80">{det.findingsKept}</span>
              </div>
            )}
            {det.themes && det.themes.length > 0 && (
              <div className="pt-1">
                <span className="text-[10px] text-muted-foreground/50 block mb-1.5">Themes</span>
                <div className="flex flex-wrap gap-1.5">
                  {det.themes.map((t) => (
                    <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary/80">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {det.phase && (
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground/60">Phase</span>
                <span className="font-mono text-foreground/80">{det.phase}</span>
              </div>
            )}
            {det.tasksTotal !== undefined && (
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground/60">Tasks</span>
                  <span className="font-mono text-foreground/80">
                    {det.tasksDone ?? 0}/{det.tasksTotal}
                  </span>
                </div>
                <div className="h-1 rounded-full bg-muted/30 overflow-hidden">
                  <div
                    className="h-full bg-primary/60 rounded-full"
                    style={{ width: `${((det.tasksDone ?? 0) / det.tasksTotal) * 100}%` }}
                  />
                </div>
              </div>
            )}
            {det.draftsCount !== undefined && (
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground/60">Drafts in queue</span>
                <span className="font-mono text-foreground/80">{det.draftsCount}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Main Page ──────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<TabId>("overview")
  const d = dashboardData
  const sys = systemArchitecture
  const total = d.velocity.backlog + d.velocity.inProgress + d.velocity.done
  const donePercent = total > 0 ? (d.velocity.done / total) * 100 : 0
  const inProgressPercent = total > 0 ? (d.velocity.inProgress / total) * 100 : 0

  // Group skills by category
  const skillsByCategory = sys.skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = []
      acc[skill.category].push(skill)
      return acc
    },
    {} as Record<string, typeof sys.skills>
  )

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container max-w-5xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight mb-1">Mission Control</h1>
            <p className="text-muted-foreground text-sm">
              A live view inside{" "}
              <span className="font-mono text-xs text-primary/70">ryOS</span> &mdash; the operating system I built to run my work.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground/50">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono">
              {formatDate(d.heartbeat.lastUpdated)} &middot; {formatTime(d.heartbeat.lastUpdated)}
            </span>
          </div>
        </div>

        {/* Tab Bar */}
        <div className="flex gap-1 mb-8 overflow-x-auto pb-1 border-b border-border/40">
          {TABS.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-t-md transition-colors whitespace-nowrap ${
                  isActive
                    ? "text-primary border-b-2 border-primary -mb-px bg-primary/5"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* ─── OVERVIEW TAB ──────────────────────────────────────────── */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="rounded-lg border border-border/50 bg-card/30 p-4">
                <span className="text-2xl font-semibold tabular-nums">{d.heartbeat.agentCount}</span>
                <p className="text-[10px] text-muted-foreground/50 mt-0.5">Lens agents</p>
              </div>
              <div className="rounded-lg border border-border/50 bg-card/30 p-4">
                <span className="text-2xl font-semibold tabular-nums">{d.heartbeat.skillCount}</span>
                <p className="text-[10px] text-muted-foreground/50 mt-0.5">Registered skills</p>
              </div>
              <div className="rounded-lg border border-border/50 bg-card/30 p-4">
                <span className="text-2xl font-semibold tabular-nums">{d.heartbeat.streamsActive}</span>
                <p className="text-[10px] text-muted-foreground/50 mt-0.5">Active streams</p>
              </div>
              <div className="rounded-lg border border-border/50 bg-card/30 p-4">
                <span className="text-xs font-mono text-emerald-400/70">ONLINE</span>
                <p className="text-[10px] text-muted-foreground/50 mt-0.5">System status</p>
              </div>
            </div>

            {/* Projects + Research side by side */}
            <div className="grid gap-4 md:grid-cols-2">
              {/* Active Projects */}
              <div className="rounded-lg border border-border/60 bg-card/50 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="h-3.5 w-3.5 text-primary/70" />
                  <h2 className="text-xs font-medium tracking-wider uppercase text-muted-foreground">
                    Active Projects
                  </h2>
                </div>
                <div className="space-y-4">
                  {d.projects.map((proj) => (
                    <div key={proj.name}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-medium">{proj.name}</span>
                        <span
                          className={`text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-full border ${
                            PHASE_COLORS[proj.phase] ?? ""
                          }`}
                        >
                          {proj.phase}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground/60 mb-2">{proj.focus}</p>
                      <div className="h-1 rounded-full bg-muted/50 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary/60"
                          style={{ width: `${proj.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Research Pulse */}
              <div className="rounded-lg border border-border/60 bg-card/50 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Radio className="h-3.5 w-3.5 text-primary/70" />
                  <h2 className="text-xs font-medium tracking-wider uppercase text-muted-foreground">
                    Research Pulse
                  </h2>
                </div>
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-2xl font-semibold tabular-nums">{d.research.totalFindings}</span>
                  <span className="text-xs text-muted-foreground">
                    findings across {d.research.cyclesCompleted} cycles
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {d.research.themes.map((theme) => (
                    <span
                      key={theme.name}
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                        STRENGTH_COLORS[theme.strength] ?? ""
                      }`}
                    >
                      {theme.name}
                      <span className="ml-1 opacity-50">{theme.findingCount}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Velocity + Decisions */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-border/60 bg-card/50 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="h-3.5 w-3.5 text-primary/70" />
                  <h2 className="text-xs font-medium tracking-wider uppercase text-muted-foreground">
                    Build Velocity
                  </h2>
                </div>
                <div className="flex items-baseline gap-4 mb-4">
                  <div>
                    <span className="text-2xl font-semibold tabular-nums">{d.velocity.done}</span>
                    <span className="text-xs text-muted-foreground ml-1">done</span>
                  </div>
                  <div className="text-muted-foreground/50 text-xs">
                    {d.velocity.inProgress} active &middot; {d.velocity.backlog} backlog
                  </div>
                </div>
                <div className="h-2 rounded-full bg-muted/30 overflow-hidden flex">
                  <div className="h-full bg-emerald-500/70" style={{ width: `${donePercent}%` }} />
                  <div className="h-full bg-primary/50" style={{ width: `${inProgressPercent}%` }} />
                </div>
                <div className="flex gap-4 mt-2 text-[10px] text-muted-foreground/50">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-sm bg-emerald-500/70" /> Done
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-sm bg-primary/50" /> Active
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-sm bg-muted/30" /> Backlog
                  </span>
                </div>
              </div>

              <div className="rounded-lg border border-border/60 bg-card/50 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <GitBranch className="h-3.5 w-3.5 text-primary/70" />
                  <h2 className="text-xs font-medium tracking-wider uppercase text-muted-foreground">
                    Recent Decisions
                  </h2>
                </div>
                <div className="space-y-3">
                  {d.decisions.slice(0, 4).map((dec, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="text-[10px] font-mono text-muted-foreground/40 pt-0.5 shrink-0 w-14">
                        {dec.date.slice(5)}
                      </span>
                      <p className="text-xs text-muted-foreground leading-relaxed">{dec.decision}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── STREAMS TAB ───────────────────────────────────────────── */}
        {activeTab === "streams" && (
          <div>
            <p className="text-sm text-muted-foreground mb-6">
              Work loops — each stream is an autonomous research run, build cycle, or content pipeline. Click to expand.
            </p>
            <div className="space-y-2">
              {sys.streams.map((stream) => (
                <StreamCard key={stream.id} stream={stream} />
              ))}
            </div>
          </div>
        )}

        {/* ─── SYSTEM TAB (Lenses & Skills) ──────────────────────────── */}
        {activeTab === "system" && (
          <div className="space-y-12">
            {/* Lenses */}
            <section>
              <h2 className="text-sm font-medium tracking-wider uppercase text-muted-foreground mb-4">
                Lenses
              </h2>
              <p className="text-xs text-muted-foreground/60 mb-4 max-w-lg">
                Four perspectives that process every council deliberation. Each lens activates specific skills.
              </p>
              <div className="grid gap-3 md:grid-cols-2">
                {sys.lenses.map((lens) => (
                  <div
                    key={lens.name}
                    className={`rounded-lg border bg-card/30 p-4 ${LENS_BORDER[lens.color] ?? ""}`}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`w-2.5 h-2.5 rounded-full ${LENS_DOT[lens.color] ?? ""}`} />
                      <h3 className="font-semibold text-sm">{lens.name}</h3>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {lens.activeSkills.map((s) => (
                        <span
                          key={s}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-muted/40 text-muted-foreground/70"
                        >
                          /{s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Skills Registry */}
            <section>
              <h2 className="text-sm font-medium tracking-wider uppercase text-muted-foreground mb-4">
                Skill Registry
              </h2>
              <p className="text-xs text-muted-foreground/60 mb-4 max-w-lg">
                {sys.skills.length} registered skills across {Object.keys(skillsByCategory).length} categories. Each is a repeatable capability invoked by command.
              </p>
              <div className="space-y-6">
                {Object.entries(skillsByCategory).map(([category, skills]) => (
                  <div key={category}>
                    <h3
                      className={`text-[10px] font-mono tracking-wider uppercase mb-2 ${
                        SKILL_CAT_COLORS[category] ?? "text-muted-foreground"
                      }`}
                    >
                      {category}
                    </h3>
                    <div className="grid gap-1">
                      {skills.map((skill) => (
                        <div
                          key={skill.slug}
                          className="flex items-center gap-3 py-1.5 px-3 rounded hover:bg-card/30 transition-colors"
                        >
                          <span className="font-mono text-xs text-primary/70 w-32 shrink-0">
                            /{skill.slug}
                          </span>
                          <span className="text-xs text-muted-foreground">{skill.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Domains */}
            <section>
              <h2 className="text-sm font-medium tracking-wider uppercase text-muted-foreground mb-4">
                Domains
              </h2>
              <div className="grid gap-3 md:grid-cols-2">
                {sys.domains.map((domain) => (
                  <div key={domain.name} className="rounded-lg border border-border/50 bg-card/30 p-4">
                    <h3 className="font-semibold text-sm mb-1">{domain.name}</h3>
                    <p className="text-xs text-muted-foreground/60">{domain.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ─── DECISIONS TAB ─────────────────────────────────────────── */}
        {activeTab === "decisions" && (
          <div>
            <p className="text-sm text-muted-foreground mb-6">
              Decision log from the builder domain changelog. What was decided, when, and the reasoning.
            </p>
            <div className="relative">
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border/40" />
              <div className="space-y-4">
                {d.decisions.map((dec, i) => (
                  <div key={i} className="relative pl-7">
                    <div className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 border-border bg-background flex items-center justify-center">
                      <div className="w-[5px] h-[5px] rounded-full bg-primary/50" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-muted-foreground/40">{dec.date}</span>
                      <p className="text-sm text-muted-foreground leading-relaxed mt-0.5">{dec.decision}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─── QUEUE TAB ─────────────────────────────────────────────── */}
        {activeTab === "queue" && (
          <div className="space-y-8">
            {/* Content Queue */}
            <section>
              <h2 className="text-xs font-medium tracking-wider uppercase text-muted-foreground mb-4">
                Content Pipeline
              </h2>
              <div className="space-y-2">
                {d.content.map((draft, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 rounded-lg border border-border/40 bg-card/30 p-4"
                  >
                    <span
                      className={`text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded border shrink-0 ${
                        draft.platform === "x"
                          ? "border-foreground/20 text-foreground/60"
                          : "border-sky-500/30 text-sky-400"
                      }`}
                    >
                      {draft.platform}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground/80 truncate">{draft.title}</p>
                    </div>
                    <span
                      className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded border shrink-0 ${
                        draft.status === "reviewed"
                          ? "border-emerald-500/30 text-emerald-400"
                          : "border-border text-muted-foreground/50"
                      }`}
                    >
                      {draft.status}
                    </span>
                    <span className="text-sm font-mono text-primary/70 tabular-nums shrink-0 w-8 text-right">
                      {draft.score.toFixed(1)}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Build Queue */}
            <section>
              <h2 className="text-xs font-medium tracking-wider uppercase text-muted-foreground mb-4">
                Build Pipeline
              </h2>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border border-border/40 bg-card/30 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xs font-medium text-muted-foreground">Backlog</h3>
                    <span className="text-lg font-semibold tabular-nums">{d.velocity.backlog}</span>
                  </div>
                  <div className="h-1 rounded-full bg-muted/30" />
                </div>
                <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xs font-medium text-primary/70">In Progress</h3>
                    <span className="text-lg font-semibold tabular-nums">{d.velocity.inProgress}</span>
                  </div>
                  <div className="h-1 rounded-full bg-primary/30" />
                </div>
                <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xs font-medium text-emerald-400/70">Done</h3>
                    <span className="text-lg font-semibold tabular-nums">{d.velocity.done}</span>
                  </div>
                  <div className="h-1 rounded-full bg-emerald-500/30">
                    <div className="h-full rounded-full bg-emerald-500/70 w-full" />
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
