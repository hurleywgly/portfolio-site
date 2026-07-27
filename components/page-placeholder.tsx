import { Footer } from "@/components/footer"

interface PagePlaceholderProps {
  slug: "projects" | "tools" | "about" | "methodology"
  title: string
  description: string
}

export function PagePlaceholder({
  slug,
  title,
  description,
}: PagePlaceholderProps) {
  return (
    <div className="flex min-h-[calc(100dvh-5rem)] flex-col md:min-h-[calc(100dvh-6rem)]">
      <main className="exhibit-shell flex flex-1 items-center py-24 md:py-32">
        <section className="w-full max-w-4xl">
          <p className="mb-5 font-mono text-xs lowercase tracking-[0.22em] text-accent">
            // {slug}
          </p>
          <h1 className="max-w-4xl font-display text-5xl font-black leading-[0.98] tracking-[-0.035em] text-ink sm:text-6xl md:text-8xl">
            {title}
          </h1>
          <p className="mt-8 max-w-2xl font-body text-lg leading-8 text-muted">
            {description}
          </p>

          <div
            className="relative mt-16 h-24 max-w-xl border-l border-t border-rule"
            aria-hidden="true"
          >
            <span className="absolute -left-1 -top-1 h-2 w-2 bg-diagram" />
            <span className="absolute -bottom-1 left-[61%] h-2 w-2 border border-diagram bg-page" />
            <span className="absolute bottom-0 left-0 h-px w-[61%] bg-rule" />
          </div>
        </section>
      </main>
      <Footer locationOnly={slug === "about"} />
    </div>
  )
}
