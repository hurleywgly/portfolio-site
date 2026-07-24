import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <main className="exhibit-shell flex min-h-[calc(100dvh-5rem)] items-center py-24 md:min-h-[calc(100dvh-6rem)] md:py-32">
      <section className="w-full max-w-5xl">
        <p className="mb-5 font-mono text-xs lowercase tracking-[0.22em] text-accent">
          // home
        </p>
        <h1 className="max-w-5xl font-display text-6xl font-black leading-[0.92] tracking-[-0.045em] text-ink sm:text-7xl md:text-9xl">
          Always tinkering.
        </h1>
        <p className="mt-8 max-w-2xl font-body text-lg leading-8 text-muted">
          A working exhibit of live systems, prototypes, and the methods that
          hold them together.
        </p>
        <Link
          href="/methodology"
          className="mt-10 inline-flex items-center gap-2 font-mono text-xs lowercase tracking-[0.12em] text-accent underline decoration-accent underline-offset-8"
        >
          see the methodology
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>

        <div
          className="relative mt-20 h-28 max-w-2xl border-b border-r border-rule"
          aria-hidden="true"
        >
          <span className="absolute -bottom-1 -right-1 h-2 w-2 bg-diagram" />
          <span className="absolute -left-1 bottom-[37%] h-2 w-2 border border-diagram bg-page" />
          <span className="absolute bottom-[37%] left-0 h-px w-[43%] bg-rule" />
        </div>
      </section>
    </main>
  )
}
