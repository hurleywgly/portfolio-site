import Link from "next/link"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

/**
 * A narrow, tall work tile: forest-on-sage in light, one slate family in dark.
 * Diagram motif up top (traced from the Figma vectors, drawn with the on-card
 * palette + a single gold focal), UPPER-mono title spanning the full tile
 * width bottom-left, arrow pinned to the top-right corner of that same info
 * row (#68 — matches Figma's `578:4`, where the arrow is a separate node that
 * never shares flex space with the title). The four home motifs live below,
 * keyed by slug.
 */
export function ProjectTile({
  title,
  href,
  external,
  motif,
  className,
  dataAttr,
}: {
  title: ReactNode
  href: string
  external?: boolean
  motif: ReactNode
  className?: string
  /** PostHog event target, e.g. `home-tile-stumble`. */
  dataAttr?: string
}) {
  const body = (
    <>
      <div className="pointer-events-none flex-1 text-on-card-muted">
        {motif}
      </div>
      {/* Figma (module · project-cards, 578:4) gives the title the FULL tile
          width — the arrow is a separate element pinned to the top-right
          corner, at the same row as the title's first line, regardless of
          whether the title wraps to one or two lines. The old markup shared
          one flex row (`justify-between`) between title and arrow, leaving
          only ~100px for a 16px mono title that needs ~96–100px — enough to
          overflow "STUMBLE AI" to a second line and "RYOS"/"STARTER KIT" to
          three (#68). Giving the title the full box (no shared flex, no
          reserved padding) and floating the arrow on top of the trailing
          whitespace — exactly where Figma places it — fixes both without
          touching the two titles that were already correct. */}
      <div className="relative">
        <span className="block w-full font-mono text-[16px] uppercase leading-[1.04] tracking-[0.02em] text-on-card">
          {title}
        </span>
        <span
          className="absolute right-0 top-0 font-mono text-[13px] leading-none text-on-card-muted transition-transform group-hover:translate-x-0.5"
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
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        data-attr={dataAttr}
        className={classes}
      >
        {body}
      </a>
    )
  }
  return (
    // `scroll={false}`: the destination positions itself on the deep-linked
    // item (lib/deep-link.ts), and the router's own scroll-to-top lands after
    // ours and would undo it.
    <Link href={href} scroll={false} data-attr={dataAttr} className={classes}>
      {body}
    </Link>
  )
}

/* ----------------------------------------------------------------------- */
/* Motifs — real vector geometry exported from Figma's "module ·          */
/* project-cards" exhibits (578:4 light / 578:137 dark, file               */
/* sGFjHbsFwMriSNcfT7TQrc). Light and dark bake identical paths — only the  */
/* card + text tokens differ per theme — so one currentColor-driven SVG    */
/* per motif covers both: on-card-muted (default currentColor) for the      */
/* dimmer line work, on-card for the brighter strokes, accent for the gold  */
/* details. Each viewBox is the motif's true Figma bounding box (full tile  */
/* width, cropped tight to content height), so proportions match exactly — */
/* no forced uniform aspect ratio across the four.                         */
/* ----------------------------------------------------------------------- */

export function StumbleMotif() {
  // flat-S ridge (two parallel strokes) climbing to a gold waypoint
  return (
    <svg viewBox="0 30 140 34" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
      <g transform="translate(10.3846 39.8246)">
        <path
          d="M0.274532 13.6594C21.1399 2.92256 33.063 18.4313 53.9284 11.2734C77.7745 2.92256 89.6976 13.6594 115.928 0.536596"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </g>
      <g transform="translate(10.3846 44.5965)">
        <path
          d="M0.361596 17.3448C24.2077 4.22197 39.1116 20.9237 61.1693 12.5728C82.6308 4.22197 95.7462 14.9588 119.592 0.643023"
          fill="none"
          className="stroke-on-card"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </g>
      <circle cx="124.769" cy="39.7456" r="3.5" className="fill-accent" />
      <circle cx="34.7885" cy="46.3465" r="1.75" fill="currentColor" />
      <circle cx="71.75" cy="53.5044" r="1.75" fill="currentColor" />
    </svg>
  )
}

export function RainierMotif() {
  // twin-peak ridge, rain streaks, a small echo diamond + gold summit diamond
  return (
    <svg viewBox="0 8 140 70" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
      <g transform="translate(8 25.5088)">
        <path
          d="M0.54461 48.4693L43.4677 3.13597L54.1985 15.0658L67.3138 0.750009L124.545 48.4693"
          fill="none"
          className="stroke-on-card"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </g>
      <g transform="translate(44.9615 27.8947)">
        <path
          d="M0.600007 7.1614L6.56154 0.6L11.9269 6.56491L6.56154 10.1439L0.600007 7.1614Z"
          fill="none"
          className="stroke-on-card"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </g>
      {[
        [18.1346, 15.9649],
        [32.4423, 13.5789],
        [49.1346, 11.1930],
        [84.9038, 14.7719],
        [101.5962, 17.1579],
      ].map(([x, y]) => (
        <g key={x} transform={`translate(${x} ${y})`}>
          <path
            d="M4.72282 0.240377L0.549744 9.78424"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </g>
      ))}
      <g transform="translate(79.5385 13.5789)">
        <path d="M4 0L8 4L4 8L0 4L4 0Z" className="fill-accent" />
      </g>
    </svg>
  )
}

export function BookshelfMotif() {
  // book spines on a shelf (one gold), broadcast arcs to the side
  return (
    <svg viewBox="0 25 140 51" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
      <rect x="13.9615" y="36.2456" width="9.5385" height="35.7895" rx="1" fill="none" className="stroke-on-card" strokeWidth="1.2" />
      <rect x="25.8846" y="27.8947" width="8.3462" height="44.1404" rx="1" fill="none" className="stroke-on-card" strokeWidth="1.2" />
      <rect x="36.6154" y="41.0175" width="10.7308" height="31.0175" rx="1" className="fill-accent" />
      <rect x="49.7308" y="31.4737" width="8.3462" height="40.5614" rx="1" fill="none" className="stroke-on-card" strokeWidth="1.2" />
      <rect x="60.4615" y="37.4386" width="9.5385" height="34.5965" rx="1" fill="none" className="stroke-on-card" strokeWidth="1.2" />
      <rect x="72.3846" y="29.0877" width="8.9423" height="42.9474" rx="1" fill="none" className="stroke-on-card" strokeWidth="1.2" />
      <rect x="10.3846" y="72.0351" width="121.6154" height="1.5" className="fill-on-card" />
      <circle cx="108.173" cy="47.5965" r="3" className="fill-accent" />
      <g transform="translate(98.3173 41.0175)">
        <path d="M3.28269 0.424144C-0.294231 4.00309 -0.294231 9.968 3.28269 13.547" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      </g>
      <g transform="translate(115.3077 41.0175)">
        <path d="M0.424384 0.424144C4.00131 4.00309 4.00131 9.968 0.424384 13.547" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      </g>
      <g transform="translate(92.2067 36.2456)">
        <path d="M4.52404 0.334378C-0.841346 6.29929 -0.841346 17.0361 4.52404 23.001" fill="none" stroke="currentColor" strokeLinejoin="round" />
      </g>
      <g transform="translate(120.0769 36.2456)">
        <path d="M0.371741 0.334378C5.73713 6.29929 5.73713 17.0361 0.371741 23.001" fill="none" stroke="currentColor" strokeLinejoin="round" />
      </g>
    </svg>
  )
}

export function RyosMotif() {
  // chip with pins + gold core, a network edge, a compass, a folder
  return (
    <svg viewBox="0 18 140 68" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
      <rect x="29.4615" y="30.2807" width="26.2308" height="26.2456" rx="3" fill="none" className="stroke-on-card" strokeWidth="1.5" />
      <rect x="37.8077" y="38.6316" width="9.5385" height="9.5439" rx="1.5" className="fill-accent" />
      {/* chip pins: 3 vertical ticks top + bottom, 3 horizontal ticks left + right */}
      <rect x="33.0385" y="24.9123" width="1.5" height="4" className="fill-on-card" />
      <rect x="42.5769" y="24.9123" width="1.5" height="4" className="fill-on-card" />
      <rect x="52.1154" y="24.9123" width="1.5" height="4" className="fill-on-card" />
      <rect x="33.0385" y="57.7193" width="1.5" height="4" className="fill-on-card" />
      <rect x="42.5769" y="57.7193" width="1.5" height="4" className="fill-on-card" />
      <rect x="52.1154" y="57.7193" width="1.5" height="4" className="fill-on-card" />
      <rect x="24.0962" y="35.0526" width="4" height="1.5" className="fill-on-card" />
      <rect x="24.0962" y="44.5965" width="4" height="1.5" className="fill-on-card" />
      <rect x="24.0962" y="52.9474" width="4" height="1.5" className="fill-on-card" />
      <rect x="58.0769" y="35.0526" width="4" height="1.5" className="fill-on-card" />
      <rect x="58.0769" y="44.5965" width="4" height="1.5" className="fill-on-card" />
      <rect x="58.0769" y="52.9474" width="4" height="1.5" className="fill-on-card" />

      {/* network edge + compass */}
      <g transform="translate(56.8846 24.3158)">
        <path d="M0.258079 12.4715L25.2965 0.54166" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      </g>
      <circle cx="83.7308" cy="23.7368" r="2.4" fill="none" className="stroke-on-card" strokeWidth="1.2" />
      <g transform="translate(56.8846 50.5614)">
        <path d="M0.140099 0.583414L29.9478 7.74131" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      </g>
      <circle cx="88" cy="57.8333" r="1.9" fill="none" className="stroke-on-card" strokeWidth="1.2" />
      <g transform="translate(83.7115 23.7193)">
        <path d="M0.293364 0.404892L17.5818 12.9312" fill="none" stroke="currentColor" strokeLinejoin="round" />
      </g>
      <circle cx="102.058" cy="36.1095" r="2.25" fill="currentColor" />
      <circle cx="115.308" cy="62.4839" r="11.1731" fill="none" className="stroke-on-card" strokeWidth="1.5" />
      <g transform="translate(109.346 55.3333)">
        <path d="M13.62 0.554813L0.504661 12.4846" fill="none" className="stroke-accent" strokeWidth="1.5" strokeLinejoin="round" />
      </g>
      <circle cx="116.115" cy="63.2982" r="2" className="fill-accent" />

      {/* folder */}
      <g transform="translate(70 61.8947)">
        <path
          d="M0.75 21.6272V3.73246L3.13462 0.75H12.6731L15.6538 3.73246H28.1731V21.6272H0.75Z"
          fill="none"
          className="stroke-on-card"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </g>
      <g transform="translate(49.7308 56.5263)">
        <path d="M0.234047 0.441839L20.5033 11.1787" fill="none" stroke="currentColor" strokeLinejoin="round" />
      </g>
    </svg>
  )
}

export const homeMotifs = {
  stumble: <StumbleMotif />,
  rainier: <RainierMotif />,
  bookshelf: <BookshelfMotif />,
  ryos: <RyosMotif />,
} as const
