import Link from "next/link"
import { cn } from "@/lib/utils"

/** Symmetric, midline-mirrored bar heights — one is rendered gold. */
const BARS = [12, 20, 30, 18, 34, 24, 40, 24, 34, 18, 30, 20, 12]
const GOLD_BAR = 6

/**
 * The flagship strip: a deep card carrying the podcast-editor pitch and the
 * breaker-curl → soundwave glyph. Width is meant to equal exactly two project
 * tiles plus their gutter; the parent sizes the box, this fills it.
 */
export function WaveformBanner({
  href = "/projects",
  className,
}: {
  href?: string
  className?: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex h-full w-full items-center overflow-hidden rounded-[9px] bg-card-deep px-4 py-3.5",
        className,
      )}
    >
      <div className="relative z-10 flex flex-col">
        <span className="font-mono text-[13px] uppercase tracking-[0.06em] text-accent">
          Podcast Editor
        </span>
        <span className="mt-1 font-display text-[21px] font-black leading-none tracking-[-0.01em] text-on-card">
          Waveform
        </span>
        <span className="mt-2.5 font-mono text-[13px] tracking-[0.01em] text-on-card-muted">
          raw audio&nbsp;&nbsp;→&nbsp;&nbsp;finished episodes
        </span>
      </div>
      <div className="pointer-events-none absolute right-3 top-1/2 h-[46px] w-[168px] -translate-y-1/2 text-on-card-muted">
        <WaveformGlyph />
      </div>
    </Link>
  )
}

function WaveformGlyph() {
  const midline = 28
  return (
    <svg
      viewBox="0 0 170 56"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      {/* breaker curl + gold crest */}
      <path
        d="M4 34C8 18 26 10 38 20C48 28 42 42 33 37C27 34 30 26 36 29"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="40" cy="15" r="3.4" className="fill-accent" />
      {/* 13 midline-mirrored bars, one gold */}
      {BARS.map((h, i) => {
        const x = 66 + i * 8
        const gold = i === GOLD_BAR
        return (
          <rect
            key={i}
            x={x}
            y={midline - h / 2}
            width="3"
            height={h}
            rx="1.5"
            className={gold ? "fill-accent" : "fill-current"}
          />
        )
      })}
    </svg>
  )
}
