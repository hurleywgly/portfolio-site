"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowRight, Compass, Wrench, Archive, Activity, Cpu } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SystemCard } from "@/components/system-card"
import { GlassPanel } from "@/components/glass-panel"
import { HeroStart } from "@/components/hero-start"
import { AssemblyTransition } from "@/components/assembly-transition"
import { activeProjects } from "@/lib/data"

export default function Home() {
  const [entered, setEntered] = useState(false)
  const orientationRef = useRef<HTMLDivElement>(null)

  const handleEnter = () => {
    setEntered(true)
    // Scroll the orientation panel into view after a tick so the DOM exists
    requestAnimationFrame(() => {
      orientationRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    })
  }

  // If user scrolls down manually past the hero, also mark as entered
  useEffect(() => {
    const onScroll = () => {
      if (!entered && window.scrollY > window.innerHeight * 0.3) {
        setEntered(true)
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [entered])

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header is rendered but mostly transparent over the hero */}
      <Header />

      <main className="flex-1">
        {/* ── 1. Hero Start ────────────────────────────────────────────── */}
        <HeroStart onEnter={handleEnter} />

        {/* ── 2. Assembly — glass panels stagger in ───────────────────── */}
        <AssemblyTransition skip={!entered}>
          {/* Orientation */}
          <section
            ref={orientationRef}
            className="container max-w-5xl mx-auto px-4 pt-20 pb-12"
          >
            <div className="mb-10 text-center">
              <p className="font-mono text-xs tracking-[0.3em] uppercase text-amber-400/70 mb-3">
                // orientation
              </p>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight max-w-2xl mx-auto">
                You&rsquo;re here because something in the signal got your attention.
              </h2>
            </div>

            <GlassPanel data-assembly className="p-8 sm:p-10 max-w-3xl mx-auto">
              <div className="space-y-5 text-slate-200/90 leading-relaxed">
                <p>
                  This site is a working exhibit. The blueprint behind every panel
                  is the thing I actually do — take complex inputs, route them through
                  structured processes, produce reliable outputs. Sometimes those outputs
                  are code, sometimes companies, lately mostly AI systems.
                </p>
                <p>
                  My goal is for you to leave here feeling <em>smarter</em> and
                  <em> quicker</em>. Steal the tools. Read the essays. Watch the systems
                  I&rsquo;m building in real time on the dashboard. If any of it sparks
                  something, find me.
                </p>
                <div className="pt-2 flex flex-wrap gap-3 text-xs font-mono tracking-wider uppercase">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/5 px-3 py-1 text-amber-300/90">
                    <Compass className="h-3 w-3" /> guided journey
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-400/20 bg-slate-400/5 px-3 py-1 text-slate-300/80">
                    escape to <Link href="/writing" className="underline underline-offset-2 hover:text-amber-300">blog</Link> · <Link href="/dashboard" className="underline underline-offset-2 hover:text-amber-300">dashboard</Link>
                  </span>
                </div>
              </div>
            </GlassPanel>
          </section>

          {/* Panel 1: Free Tools */}
          <section className="container max-w-5xl mx-auto px-4 py-12">
            <PanelHeader icon={Wrench} eyebrow="panel 01" title="Free tools to use" />
            <GlassPanel data-assembly className="p-8">
              <div className="grid gap-4 sm:grid-cols-3">
                <ToolCard name="Capsule" desc="Agent-to-agent knowledge transfer packets" href="https://github.com/hurleywgly/capsule" />
                <ToolCard name="Projector" desc="Generate Claude Project packages from intent" href="/methodology" />
                <ToolCard name="Ink" desc="Print-ready design system for briefs & reports" href="/methodology" />
              </div>
              <p className="mt-6 text-xs font-mono text-slate-400/70">
                Built in my operating system. Open-sourced as I go.
              </p>
            </GlassPanel>
          </section>

          {/* Panel 2: Past Work (career arc) */}
          <section className="container max-w-5xl mx-auto px-4 py-12">
            <PanelHeader icon={Archive} eyebrow="panel 02" title="Where I&rsquo;ve been" />
            <GlassPanel data-assembly className="p-8">
              <ol className="space-y-5">
                <CareerEntry year="2012–2014" title="BounceBug" note="WordPress blog → 2M monthly uniques. Content, SEO, data." />
                <CareerEntry year="2014–2017" title="Dubset" note="Content distribution + royalty payments. $50M acquisition by Pex." />
                <CareerEntry year="2017–2023" title="Amazon" note="Global API platform. Millions of devices, billions in revenue." />
                <CareerEntry year="2023–now" title="Raya" note="Senior PM. Understanding the true value of community." />
              </ol>
              <div className="mt-6 pt-6 border-t border-amber-500/10">
                <Link href="/work" className="inline-flex items-center gap-1.5 text-xs font-mono tracking-wider uppercase text-amber-300 hover:text-amber-200">
                  Full work history <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </GlassPanel>
          </section>

          {/* Panel 3: Current Work */}
          <section className="container max-w-5xl mx-auto px-4 py-12">
            <PanelHeader icon={Activity} eyebrow="panel 03" title="What I&rsquo;m building now" />
            <div className="grid gap-4 md:grid-cols-2">
              {activeProjects.map((project) => (
                <GlassPanel key={project.slug} data-assembly className="p-1">
                  <SystemCard project={project} />
                </GlassPanel>
              ))}
            </div>
          </section>

          {/* Panel 4: About + Gear */}
          <section className="container max-w-5xl mx-auto px-4 py-12">
            <PanelHeader icon={Cpu} eyebrow="panel 04" title="Who I am + how I work" />
            <GlassPanel data-assembly className="p-8">
              <p className="text-slate-200/90 leading-relaxed mb-6">
                I live in Seattle. I build in public. I believe the next decade belongs to
                people who treat AI as a system-design problem, not a prompt-engineering one.
                My gear, my dailies, and my philosophy on how to work with LLMs —
              </p>
              <Link href="/about" className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/5 px-5 py-2 font-mono text-xs tracking-wider uppercase text-amber-200 hover:bg-amber-400/10 transition-colors">
                Read the full about <ArrowRight className="h-3 w-3" />
              </Link>
            </GlassPanel>
          </section>

          {/* Exit / Congrats */}
          <section className="container max-w-3xl mx-auto px-4 py-20 text-center">
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-amber-400/70 mb-4">
              // you made it
            </p>
            <h3 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-6">
              Now build something.
            </h3>
            <div className="flex flex-wrap gap-3 justify-center font-mono text-xs tracking-wider uppercase">
              <a href="mailto:ryan@ryanwigley.com" className="rounded-full border border-amber-400/50 bg-amber-400/10 px-5 py-2.5 text-amber-100 hover:bg-amber-400/20 transition-colors">Contact</a>
              <Link href="/writing" className="rounded-full border border-slate-400/30 bg-slate-400/5 px-5 py-2.5 text-slate-200 hover:bg-slate-400/10 transition-colors">Subscribe</Link>
              <a href="https://x.com/hurleywgly" className="rounded-full border border-slate-400/30 bg-slate-400/5 px-5 py-2.5 text-slate-200 hover:bg-slate-400/10 transition-colors">Follow</a>
            </div>
          </section>
        </AssemblyTransition>
      </main>

      <Footer />
    </div>
  )
}

/* ── helpers (local to home) ───────────────────────────────────────── */

function PanelHeader({
  icon: Icon,
  eyebrow,
  title,
}: {
  icon: any
  eyebrow: string
  title: string
}) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-amber-400/40 bg-amber-400/10 text-amber-300">
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-amber-400/70">
          // {eyebrow}
        </p>
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight" dangerouslySetInnerHTML={{ __html: title }} />
      </div>
    </div>
  )
}

function ToolCard({ name, desc, href }: { name: string; desc: string; href: string }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="block rounded-lg border border-amber-500/15 bg-slate-900/40 p-4 transition-all hover:border-amber-400/40 hover:bg-slate-900/60"
      style={{ transition: "all 250ms var(--transitions-snappy)" }}
    >
      <div className="font-semibold text-amber-100 mb-1">{name}</div>
      <div className="text-xs text-slate-300/80 leading-relaxed">{desc}</div>
    </a>
  )
}

function CareerEntry({ year, title, note }: { year: string; title: string; note: string }) {
  return (
    <li className="flex gap-4 items-baseline">
      <span className="font-mono text-xs tracking-wider text-amber-400/80 w-24 shrink-0">{year}</span>
      <div>
        <div className="font-semibold text-slate-100">{title}</div>
        <div className="text-sm text-slate-300/70">{note}</div>
      </div>
    </li>
  )
}
