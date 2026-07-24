import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { gear, pastEntries } from "@/lib/data"
import type { GearItem } from "@/lib/types"

const CATEGORY_LABELS: Record<string, string> = {
  ai: "AI",
  code: "Code",
  build: "Build",
  organize: "Organize",
}

const CATEGORY_COLORS: Record<string, string> = {
  ai: "text-violet-400 border-violet-500/30",
  code: "text-primary border-primary/30",
  build: "text-emerald-400 border-emerald-500/30",
  organize: "text-sky-400 border-sky-500/30",
}

function GearNode({ item }: { item: GearItem }) {
  return (
    <div className="rounded-lg border border-border/50 bg-card/40 p-4 glow-hover">
      <div className="flex items-center gap-2 mb-2">
        <h3 className="font-semibold text-sm">{item.name}</h3>
        <span
          className={`text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded border ${
            CATEGORY_COLORS[item.category] ?? ""
          }`}
        >
          {CATEGORY_LABELS[item.category]}
        </span>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed mb-2">
        {item.whyILoveIt}
      </p>
      <div className="flex flex-wrap gap-1">
        {item.connectsTo.map((conn) => (
          <span
            key={conn}
            className="text-[10px] font-mono text-muted-foreground/40 px-1.5 py-0.5 rounded bg-muted/30"
          >
            &rarr; {conn}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function AboutPage() {
  // Group gear by category
  const categories = ["ai", "code", "build", "organize"] as const
  const grouped = categories.reduce(
    (acc, cat) => {
      acc[cat] = gear.filter((g) => g.category === cat)
      return acc
    },
    {} as Record<string, GearItem[]>
  )

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container max-w-5xl mx-auto px-4 py-16">
        {/* ── Who am I ─────────────────────────────────────────────────── */}
        <section className="mb-20">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-semibold tracking-tight mb-6">About</h1>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I build systems to understand them. From shipping products at Amazon-scale to prototyping agentic systems in my home office, I&rsquo;m drawn to the edges where strategy meets execution.
              </p>
              <p>
                My career is a convergence story, not a pivot. Video game level design taught me to build worlds people navigate. Music tech taught me to process complex media at scale. Amazon taught me global infrastructure. Now I engineer AI systems that run businesses &mdash; the same discipline applied to a new substrate.
              </p>
              <p>
                Currently leading the membership experience team at Raya. Seattle-based, always tinkering.
              </p>
            </div>
          </div>
        </section>

        {/* ── Timeline ─────────────────────────────────────────────────── */}
        <section className="mb-20">
          <h2 className="text-sm font-medium tracking-wider uppercase text-muted-foreground mb-8">
            Timeline
          </h2>
          <div className="relative">
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border/60" />
            <div className="space-y-8">
              {[...pastEntries].reverse().map((entry) => (
                <div key={entry.title} className="relative pl-8">
                  <div className="absolute left-0 top-1 w-[15px] h-[15px] rounded-full border-2 border-border bg-background flex items-center justify-center">
                    <div className="w-[5px] h-[5px] rounded-full bg-muted-foreground/40" />
                  </div>
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="text-xs font-mono text-muted-foreground/50">{entry.period}</span>
                    <h3 className="font-semibold text-sm">{entry.org}</h3>
                    <span className="text-xs text-muted-foreground/60">{entry.role}</span>
                  </div>
                  {entry.metric && (
                    <span className="text-[11px] font-mono text-primary/70 mt-0.5 inline-block">
                      {entry.metric}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Gear Topology ────────────────────────────────────────────── */}
        <section>
          <h2 className="text-sm font-medium tracking-wider uppercase text-muted-foreground mb-2">
            Gear
          </h2>
          <p className="text-sm text-muted-foreground mb-8 max-w-lg">
            Not a shopping list &mdash; a wiring diagram. How my tools connect and what flows between them.
          </p>

          <div className="space-y-8">
            {categories.map((cat) => (
              <div key={cat}>
                <h3 className="text-xs font-mono tracking-wider uppercase text-muted-foreground/50 mb-3">
                  {CATEGORY_LABELS[cat]}
                </h3>
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                  {grouped[cat].map((item) => (
                    <GearNode key={item.name} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
