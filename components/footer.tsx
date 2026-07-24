import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border/50 mt-auto">
      <div className="container max-w-5xl mx-auto px-4 py-6 flex flex-wrap items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground/60">
          Designed &amp; engineered by Ryan Wigley
        </p>
        <div className="flex flex-wrap gap-5 text-xs">
          <Link
            href="https://blog.ryanwigley.com"
            target="_blank"
            className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            blog <ArrowUpRight className="h-3 w-3" />
          </Link>
          <Link
            href="mailto:ryan.wigley522@gmail.com"
            className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            email <ArrowUpRight className="h-3 w-3" />
          </Link>
          <Link
            href="https://github.com/hurleywgly/portfolio_site"
            target="_blank"
            className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            source <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </footer>
  )
}
