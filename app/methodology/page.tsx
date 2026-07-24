import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { threeZones, lenses, capsulePreviews } from "@/lib/data"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

const ZONE_COLORS: Record<string, string> = {
  emerald: "border-emerald-500/40 bg-emerald-500/5 text-emerald-400",
  amber: "border-primary/40 bg-primary/5 text-primary",
  sky: "border-sky-500/40 bg-sky-500/5 text-sky-400",
}

const LENS_COLORS: Record<string, string> = {
  violet: "border-violet-500/30 bg-violet-500/5",
  sky: "border-sky-500/30 bg-sky-500/5",
  rose: "border-rose-500/30 bg-rose-500/5",
  amber: "border-primary/30 bg-primary/5",
}

const LENS_DOT_COLORS: Record<string, string> = {
  violet: "bg-violet-400",
  sky: "bg-sky-400",
  rose: "bg-rose-400",
  amber: "bg-primary",
}

export default function MethodologyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container max-w-5xl mx-auto px-4 py-16">
        {/* Intro */}
        <h1 className="text-3xl font-semibold tracking-tight mb-3">How I Think</h1>
        <p className="text-muted-foreground max-w-lg mb-16 leading-relaxed">
          Frameworks, lenses, and protocols I use to design AI systems. These aren&rsquo;t theoretical &mdash; they run daily inside ryOS.
        </p>

        {/* ── Three Zones ──────────────────────────────────────────────── */}
        <section className="mb-20">
          <h2 className="text-sm font-medium tracking-wider uppercase text-muted-foreground mb-2">
            {threeZones.name}
          </h2>
          <p className="text-sm text-muted-foreground mb-6 max-w-lg">
            {threeZones.description}
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {threeZones.zones?.map((zone) => (
              <div
                key={zone.name}
                className={`rounded-lg border p-5 ${ZONE_COLORS[zone.color] ?? ""}`}
              >
                <h3 className="font-semibold text-sm mb-1">{zone.name}</h3>
                <p className="text-xs text-muted-foreground mb-3">{zone.description}</p>
                <ul className="space-y-1">
                  {zone.examples.map((ex) => (
                    <li key={ex} className="text-xs text-muted-foreground/70 font-mono">
                      {ex}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── Lenses ───────────────────────────────────────────────────── */}
        <section className="mb-20">
          <h2 className="text-sm font-medium tracking-wider uppercase text-muted-foreground mb-2">
            Four Lenses
          </h2>
          <p className="text-sm text-muted-foreground mb-6 max-w-lg">
            Shift perspective without losing builder orientation. Each lens reads the same situation through a different filter.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {lenses.map((lens) => (
              <div
                key={lens.name}
                className={`rounded-lg border p-5 ${LENS_COLORS[lens.color] ?? ""}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-2 h-2 rounded-full ${LENS_DOT_COLORS[lens.color] ?? "bg-muted-foreground"}`} />
                  <h3 className="font-semibold text-sm">{lens.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{lens.focus}</p>
                <p className="text-xs text-muted-foreground/60">
                  Activate when: {lens.activateWhen}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Capsules ─────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-sm font-medium tracking-wider uppercase text-muted-foreground mb-2">
            Capsules
          </h2>
          <p className="text-sm text-muted-foreground mb-6 max-w-lg">
            Portable knowledge artifacts for system-to-system transfer. Structured compression with tiered complexity and seven archetypes.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {capsulePreviews.map((capsule) => (
              <div
                key={capsule.name}
                className="rounded-lg border border-border/60 bg-card/50 p-5 glow-hover"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-sm">{capsule.name}</h3>
                  <span className="text-[10px] font-mono text-primary/70 uppercase">
                    {capsule.archetype}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                  {capsule.description}
                </p>
                {capsule.ctaUrl && (
                  <Link
                    href={capsule.ctaUrl}
                    className="text-xs text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
                  >
                    Get the full capsule
                    <ArrowUpRight className="h-3 w-3" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
