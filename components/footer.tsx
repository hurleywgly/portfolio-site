interface FooterProps {
  grid: string
  locationOnly?: boolean
}

export function Footer({ grid, locationOnly = false }: FooterProps) {
  return (
    <footer className="mb-24 border-t border-rule md:mb-0">
      <div className="exhibit-shell flex flex-col gap-5 py-8 font-mono text-[11px] uppercase tracking-[0.14em] text-muted sm:flex-row sm:items-center sm:justify-between">
        {locationOnly ? (
          <p>BASED · SEATTLE, WA</p>
        ) : (
          <p className="flex flex-wrap gap-x-2 gap-y-1">
            <a href="https://x.com/hurleywgly">X</a>
            <span aria-hidden="true">·</span>
            <a href="https://github.com/hurleywgly">GITHUB</a>
            <span aria-hidden="true">·</span>
            <a href="https://www.linkedin.com/in/ryanwigley/">LINKEDIN</a>
            <span aria-hidden="true">·</span>
            <a href="mailto:ryan.wigley522@gmail.com">EMAIL</a>
          </p>
        )}
        <p className="hidden items-center gap-2 sm:flex">
          <span
            className="h-[7px] w-[7px] rounded-full bg-accent"
            aria-hidden="true"
          />
          GRID {grid} · 47°N · PAGE
        </p>
      </div>
    </footer>
  )
}
