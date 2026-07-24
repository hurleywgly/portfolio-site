import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SystemCard } from "@/components/system-card"
import { activeProjects, pastEntries } from "@/lib/data"

export default function WorkPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container max-w-5xl mx-auto px-4 py-16">
        {/* ── Active Work ──────────────────────────────────────────────── */}
        <section className="mb-20">
          <h1 className="text-sm font-medium tracking-wider uppercase text-muted-foreground mb-6">
            What I&rsquo;m Building
          </h1>
          <div className="grid gap-4 md:grid-cols-2">
            {activeProjects.map((project) => (
              <SystemCard key={project.slug} project={project} />
            ))}
          </div>
        </section>

        {/* ── Career Arc ───────────────────────────────────────────────── */}
        <section>
          <h2 className="text-sm font-medium tracking-wider uppercase text-muted-foreground mb-8">
            Where I Come From
          </h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border/60" />

            <div className="space-y-10">
              {pastEntries.map((entry) => (
                <div key={entry.title} className="relative pl-8">
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 border-border bg-background flex items-center justify-center">
                    <div className="w-[5px] h-[5px] rounded-full bg-muted-foreground/40" />
                  </div>

                  {/* Content */}
                  <div>
                    <div className="flex items-baseline gap-3 flex-wrap mb-1">
                      <h3 className="font-semibold text-foreground">{entry.title}</h3>
                      <span className="text-xs text-muted-foreground/60">
                        {entry.role} &middot; {entry.period}
                      </span>
                    </div>

                    {/* Transformation signature */}
                    <div className="font-mono text-xs text-muted-foreground mb-2 flex items-center flex-wrap">
                      <span className="text-foreground/70">{entry.transformIn}</span>
                      <span className="transform-arrow text-[10px]">{"-->"}</span>
                      <span className="text-primary">{entry.transformOut}</span>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
                      {entry.description}
                    </p>

                    {entry.metric && (
                      <span className="inline-block mt-2 text-[11px] font-mono text-primary/80">
                        {entry.metric}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
