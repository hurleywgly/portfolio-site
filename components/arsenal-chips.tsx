import Link from "next/link"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export type ArsenalChip = {
  name: string
  desc: string
  href: string
  glyph: ReactNode
  isNew?: boolean
}

/**
 * The arsenal: surface-plate skill chips, each an icon square + name + one-line
 * pitch + arrow. The highlighted chip (/capsule) keeps a gold hairline border
 * and a NEW badge — the one sanctioned gold accent in the cluster.
 */
export function ArsenalChips({
  chips,
  className,
}: {
  chips: ArsenalChip[]
  className?: string
}) {
  return (
    <div className={cn("grid", className)}>
      {chips.map((chip) => (
        <Link
          key={chip.name}
          href={chip.href}
          // The destination parks the requested skill at the top of the page
          // itself (lib/deep-link.ts); the router's own scroll-to-top would
          // otherwise land after ours and undo it.
          scroll={false}
          data-attr={`home-arsenal-${chip.name.replace(/^\//, "")}`}
          className={cn(
            "group relative flex h-full items-center gap-3 rounded-[8px] border bg-surface px-3 py-2.5 transition-colors",
            chip.isNew
              ? "border-accent"
              : "border-rule hover:border-diagram",
          )}
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[7px] border border-rule bg-page text-muted">
            {chip.glyph}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate font-body text-[17px] font-medium leading-tight text-ink">
              {chip.name}
            </span>
            <span className="block truncate font-body text-[12px] leading-tight text-muted">
              {chip.desc}
            </span>
          </span>
          <span
            className="font-mono text-[17px] leading-none text-accent transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          >
            →
          </span>
          {chip.isNew ? (
            <span className="absolute right-3 top-1.5 font-mono text-[9px] uppercase tracking-[0.08em] text-accent">
              New
            </span>
          ) : null}
        </Link>
      ))}
    </div>
  )
}

/* ---- chip glyphs: 24px line icons, muted stroke + a single gold node ---- */

const g = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
}

export function CapsuleGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" aria-hidden="true">
      <rect x="3.5" y="8.5" width="17" height="7" rx="3.5" className="fill-card" stroke="none" />
      <rect x="3.5" y="8.5" width="8.5" height="7" rx="3.5" className="fill-page" stroke="none" />
      <rect x="3.5" y="8.5" width="17" height="7" rx="3.5" {...g} className="text-card" />
      <circle cx="16" cy="12" r="1.4" className="fill-accent" stroke="none" />
    </svg>
  )
}

export function PitchGlyph() {
  // divergent fan
  return (
    <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" aria-hidden="true">
      <path d="M5 19L18 6M5 19L19 13M5 19L13 5" {...g} />
      <circle cx="5" cy="19" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="18" cy="6" r="1.6" className="fill-accent" stroke="none" />
    </svg>
  )
}

export function BriefGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" aria-hidden="true">
      <rect x="6" y="4" width="12" height="16" rx="1.6" {...g} />
      <path d="M9 9h6M9 12h6M9 15h3.5" {...g} />
      <circle cx="17" cy="6.5" r="1.6" className="fill-accent" stroke="none" />
    </svg>
  )
}

export function ResearchGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" aria-hidden="true">
      <circle cx="11" cy="11" r="6" {...g} />
      <path d="M15.5 15.5L20 20" {...g} />
      <circle cx="11" cy="11" r="2" className="fill-accent" stroke="none" />
    </svg>
  )
}
