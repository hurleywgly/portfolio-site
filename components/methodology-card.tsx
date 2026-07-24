import Link from "next/link"
import { cn } from "@/lib/utils"

// A hand-placed constellation: nodes + edges, a gold core inside a dashed ring.
const NODES: [number, number][] = [
  [28, 40], [70, 24], [120, 44], [162, 32],
  [44, 82], [96, 66], [140, 88],
  [24, 128], [66, 118], [112, 138], [156, 126],
  [40, 176], [86, 188], [130, 174], [168, 182],
]
const EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [0, 4], [1, 5], [2, 6],
  [4, 5], [5, 6], [4, 7], [5, 8], [6, 10], [3, 6],
  [7, 8], [8, 9], [9, 10], [8, 11], [9, 12], [10, 13],
  [11, 12], [12, 13], [13, 14], [5, 9], [8, 12],
]
const CORE: [number, number] = [96, 104]

/**
 * The methodology "tarot" card: a network constellation with a gold core,
 * a Fraunces title, and a HOW I THINK mono footer. Forest in light, slate in
 * dark — the card family, restyled by tokens only.
 */
export function MethodologyCard({
  href = "/methodology",
  className,
}: {
  href?: string
  className?: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex h-full w-full flex-col overflow-hidden rounded-[12px] border border-card-border bg-card p-4",
        className,
      )}
    >
      <span className="relative z-10 font-display text-[24px] font-semibold leading-none tracking-[-0.01em] text-on-card">
        Methodology
      </span>

      <svg
        viewBox="0 0 190 210"
        className="pointer-events-none my-2 w-full flex-1 text-on-card-muted"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <g stroke="currentColor" strokeWidth="0.8" className="opacity-55">
          {EDGES.map(([a, b], i) => (
            <line
              key={i}
              x1={NODES[a][0]}
              y1={NODES[a][1]}
              x2={NODES[b][0]}
              y2={NODES[b][1]}
            />
          ))}
          <line x1={NODES[5][0]} y1={NODES[5][1]} x2={CORE[0]} y2={CORE[1]} />
          <line x1={NODES[9][0]} y1={NODES[9][1]} x2={CORE[0]} y2={CORE[1]} />
        </g>
        {NODES.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="1.8" fill="currentColor" />
        ))}
        <circle
          cx={CORE[0]}
          cy={CORE[1]}
          r="22"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeDasharray="3 4"
          className="opacity-60"
        />
        <circle cx={CORE[0]} cy={CORE[1]} r="3" className="fill-accent" />
      </svg>

      <span className="relative z-10 font-mono text-[13px] uppercase tracking-[0.16em] text-on-card-muted">
        How I Think
      </span>
    </Link>
  )
}
