interface FooterProps {
  locationOnly?: boolean
}

export function Footer({ locationOnly = false }: FooterProps) {
  return (
    <footer className="mb-24 border-t border-rule md:mb-0">
      <div className="exhibit-shell flex flex-col gap-5 py-8 font-mono text-[11px] uppercase tracking-[0.14em] text-muted sm:flex-row sm:items-center sm:justify-between">
        {locationOnly ? (
          <p>BASED · SEATTLE, WA</p>
        ) : (
          <p className="flex flex-wrap gap-x-2 gap-y-1">
            <a href="https://x.com/rywigs">X</a>
            <span aria-hidden="true">·</span>
            <a href="https://github.com/hurleywgly">GITHUB</a>
            <span aria-hidden="true">·</span>
            <a href="https://www.linkedin.com/in/rywigs/">LINKEDIN</a>
            <span aria-hidden="true">·</span>
            <a href="mailto:ryan.wigley522@gmail.com">EMAIL</a>
          </p>
        )}
      </div>
    </footer>
  )
}
