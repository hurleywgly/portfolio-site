import Link from "next/link"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

/**
 * A narrow, tall work tile: forest-on-sage in light, one slate family in dark.
 * Diagram motif up top (traced from the Figma vectors, drawn with the on-card
 * palette + a single gold focal), UPPER-mono title bottom-left, arrow bottom-
 * right. The four home motifs live below, keyed by slug.
 */
export function ProjectTile({
  title,
  href,
  external,
  motif,
  className,
}: {
  title: ReactNode
  href: string
  external?: boolean
  motif: ReactNode
  className?: string
}) {
  const body = (
    <>
      <div className="pointer-events-none flex-1 text-on-card-muted">
        {motif}
      </div>
      <div className="flex items-end justify-between gap-1">
        <span className="font-mono text-[16px] uppercase leading-[1.04] tracking-[0.02em] text-on-card">
          {title}
        </span>
        <span
          className="font-mono text-[13px] leading-none text-on-card-muted transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        >
          →
        </span>
      </div>
    </>
  )

  const classes = cn(
    "group flex h-full w-full flex-col justify-between rounded-[6px] border border-card-border bg-card p-3 transition-colors hover:border-on-card-muted",
    className,
  )

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={classes}>
        {body}
      </a>
    )
  }
  return (
    <Link href={href} className={classes}>
      {body}
    </Link>
  )
}

/* ----------------------------------------------------------------------- */
/* Motifs — viewBox-scaled so they fill whatever tile size they're given.  */
/* currentColor = on-card-muted (set by the tile); gold parts use the      */
/* accent token explicitly.                                                */
/* ----------------------------------------------------------------------- */

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
}

export function StumbleMotif() {
  // flat-S ridge climbing to a gold target
  return (
    <svg viewBox="0 0 120 66" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
      <path d="M6 52C26 50 30 30 52 33C76 36 86 22 108 16" {...stroke} />
      <circle cx="30" cy="46" r="2.4" fill="currentColor" />
      <circle cx="64" cy="33" r="2.4" fill="currentColor" />
      <circle cx="108" cy="16" r="6" className="fill-accent" />
      <circle cx="108" cy="16" r="10" {...stroke} strokeWidth="1.4" className="text-accent opacity-70" />
    </svg>
  )
}

export function RainierMotif() {
  // twin-peak ridge, rain streaks, gold summit diamond
  return (
    <svg viewBox="0 0 120 66" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
      <g {...stroke} strokeWidth="1.6">
        <line x1="26" y1="6" x2="22" y2="16" />
        <line x1="42" y1="4" x2="38" y2="14" />
        <line x1="94" y1="8" x2="90" y2="18" />
        <line x1="108" y1="10" x2="104" y2="20" />
      </g>
      <path d="M6 60L40 28L56 44L74 22L114 60" {...stroke} />
      <rect x="66.5" y="6.5" width="11" height="11" rx="1" transform="rotate(45 72 12)" className="fill-accent" />
    </svg>
  )
}

export function BookshelfMotif() {
  // book spines on a shelf, one gold, broadcast arcs to the side
  return (
    <svg viewBox="0 0 120 66" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
      <g {...stroke} strokeWidth="1.6">
        <rect x="8" y="26" width="9" height="30" rx="1" />
        <rect x="20" y="18" width="8" height="38" rx="1" />
        <rect x="43" y="22" width="8" height="34" rx="1" />
        <rect x="54" y="16" width="8" height="40" rx="1" />
        <rect x="65" y="24" width="8" height="32" rx="1" />
      </g>
      <rect x="31" y="20" width="9" height="36" rx="1" className="fill-accent" />
      <line x1="6" y1="58" x2="80" y2="58" {...stroke} />
      <circle cx="98" cy="42" r="3" fill="currentColor" />
      <path d="M104 33a13 13 0 0 1 0 18M110 27a21 21 0 0 1 0 30" {...stroke} strokeWidth="1.6" />
    </svg>
  )
}

export function RyosMotif() {
  // chip with pins + gold core, a network edge, a compass
  return (
    <svg viewBox="0 0 120 66" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
      <g {...stroke} strokeWidth="1.4">
        <line x1="24" y1="14" x2="24" y2="9" />
        <line x1="34" y1="14" x2="34" y2="9" />
        <line x1="44" y1="14" x2="44" y2="9" />
        <line x1="24" y1="46" x2="24" y2="51" />
        <line x1="34" y1="46" x2="34" y2="51" />
        <line x1="44" y1="46" x2="44" y2="51" />
        <line x1="14" y1="24" x2="9" y2="24" />
        <line x1="14" y1="34" x2="9" y2="34" />
        <line x1="54" y1="24" x2="59" y2="24" />
        <line x1="54" y1="34" x2="59" y2="34" />
      </g>
      <rect x="14" y="14" width="40" height="38" rx="3" {...stroke} strokeWidth="1.6" />
      <rect x="27" y="27" width="14" height="12" rx="1.5" className="fill-accent" />
      <path d="M60 40L84 30" {...stroke} strokeWidth="1.4" />
      <circle cx="96" cy="34" r="12" {...stroke} strokeWidth="1.6" />
      <path d="M96 34L101 26L94 31Z" className="fill-accent" stroke="none" />
      <circle cx="96" cy="34" r="1.6" fill="currentColor" />
    </svg>
  )
}

export const homeMotifs = {
  stumble: <StumbleMotif />,
  rainier: <RainierMotif />,
  bookshelf: <BookshelfMotif />,
  ryos: <RyosMotif />,
} as const
