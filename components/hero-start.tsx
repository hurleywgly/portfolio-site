"use client"

import { useState, useEffect } from "react"
import { ArrowRight } from "lucide-react"

type HeroStartProps = {
  onEnter: () => void
}

/**
 * Game-intro start screen.
 * Minimal. Single CTA. The blueprint backdrop does the heavy lifting behind it.
 * Headline unfurls via clip-path. Hint text fades in slightly after.
 */
export function HeroStart({ onEnter }: HeroStartProps) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 300)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="relative min-h-[100svh] flex flex-col items-start justify-center overflow-hidden px-6 text-left sm:px-12 lg:px-20">
      <div className="absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(7,10,15,0.96)_0%,rgba(7,10,15,0.78)_34%,rgba(7,10,15,0.18)_68%,rgba(7,10,15,0.72)_100%)]" />
      {/* Corner ornaments — blueprint feel */}
      <div className="absolute top-8 left-8 z-10 flex items-center gap-2 font-mono text-xs text-amber-500/50">
        <span className="blueprint-pulse inline-block h-1.5 w-1.5 rounded-full bg-amber-400" />
        <span className="tracking-widest uppercase">system online</span>
      </div>
      <div className="absolute top-8 right-8 z-10 font-mono text-xs text-amber-500/40 tracking-widest uppercase">
        rw / v2026
      </div>
      <div className="absolute bottom-8 left-8 z-10 font-mono text-xs text-amber-500/40 tracking-widest uppercase">
        ryanwigley.com
      </div>
      <div className="absolute bottom-8 right-8 z-10 font-mono text-xs text-amber-500/50 flex items-center gap-2">
        <span className="tracking-widest uppercase">ai systems engineer</span>
        <span className="blueprint-pulse inline-block h-1.5 w-1.5 rounded-full bg-amber-400" />
      </div>

      {/* Headline */}
      <div className="relative z-10 max-w-2xl space-y-6">
        <p
          className="font-mono text-xs tracking-[0.3em] uppercase text-amber-400/70"
          style={{
            opacity: ready ? 1 : 0,
            transition: "opacity 600ms var(--transitions-slow)",
          }}
        >
          Ryan Wigley — Designer of systems
        </p>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-[0.95]">
          <span
            className="inline-block clip-unfurl text-foreground"
            style={{ animationDelay: "150ms" }}
          >
            I build systems
          </span>
          <br />
          <span
            className="inline-block clip-unfurl bg-gradient-to-r from-amber-200 via-amber-400 to-amber-300 bg-clip-text text-transparent"
            style={{ animationDelay: "500ms" }}
          >
            to understand them.
          </span>
        </h1>

        <p
          className="max-w-xl text-base leading-relaxed text-slate-300/80 sm:text-lg"
          style={{
            opacity: ready ? 1 : 0,
            transform: ready ? "translateY(0)" : "translateY(8px)",
            transition:
              "opacity 700ms var(--transitions-slow) 1100ms, transform 700ms var(--transitions-slow) 1100ms",
          }}
        >
          Twelve years turning complex inputs into reliable outputs.
          Now I engineer AI systems that run businesses — starting with my own.
        </p>

        {/* CTA */}
        <div
          style={{
            opacity: ready ? 1 : 0,
            transform: ready ? "translateY(0)" : "translateY(12px)",
            transition:
              "opacity 700ms var(--transitions-slow) 1400ms, transform 700ms var(--transitions-slow) 1400ms",
          }}
        >
          <button
            onClick={onEnter}
            className="group relative inline-flex items-center gap-3 rounded-full border border-amber-400/40 bg-amber-400/10 px-8 py-3.5 font-mono text-sm tracking-[0.2em] uppercase text-amber-100 backdrop-blur-sm transition-all hover:border-amber-300/80 hover:bg-amber-400/20 hover:shadow-[0_0_40px_-8px_rgba(251,191,36,0.5)] focus:outline-none focus:ring-2 focus:ring-amber-400/60"
            style={{ transitionTimingFunction: "var(--transitions-snappy)" }}
          >
            <span className="blueprint-pulse inline-block h-2 w-2 rounded-full bg-amber-300" />
            <span>Enter</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
          <p className="mt-4 font-mono text-[10px] tracking-widest uppercase text-slate-500">
            or scroll to explore
          </p>
        </div>
      </div>
    </section>
  )
}
