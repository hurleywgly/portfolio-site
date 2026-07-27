import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { essays } from "@/lib/data"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

export default function WritingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container max-w-5xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-semibold tracking-tight mb-3">Writing</h1>
        <p className="text-muted-foreground max-w-lg mb-12 leading-relaxed">
          Essays on AI systems, personal engineering, and building at the edges. Published on{" "}
          <Link
            href="https://blog.ryanwigley.com"
            target="_blank"
            className="text-primary hover:text-primary/80 transition-colors"
          >
            blog.ryanwigley.com
          </Link>
          .
        </p>

        <div className="space-y-0 divide-y divide-border/40">
          {essays.map((essay) => (
            <Link
              key={essay.id + essay.date}
              href={essay.url}
              target="_blank"
              className="group flex items-start gap-4 py-5 transition-colors hover:bg-card/30 -mx-3 px-3 rounded-md"
            >
              <time className="text-xs font-mono text-muted-foreground/50 pt-0.5 shrink-0 w-16">
                {essay.date}
              </time>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="font-medium text-foreground group-hover:text-primary transition-colors text-[15px]">
                    {essay.title}
                  </h2>
                  <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground/30 group-hover:text-primary transition-colors shrink-0" />
                </div>
                <p className="text-sm text-muted-foreground/70 line-clamp-1">
                  {essay.preview}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
