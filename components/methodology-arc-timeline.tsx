import type { CSSProperties, ReactNode } from "react"

/**
 * THE ARC timeline (methodology desktop) — the four-beat story of the system:
 * 01 HOME → 02 WORK → 03 FAMILY → 04 ONE SYSTEM. A gold origin dot, a hollow
 * in-progress node, a terminal gold dot, and the KNOWS chip anchoring the right
 * end. Laid out 1:1 from the Figma frame in a 1280-wide local coordinate space
 * (frame x 80–1360, y 490–630), so it scales as one with the exhibit stage.
 */

function At({
  x,
  y,
  w,
  z,
  className,
  style,
  children,
}: {
  x: number
  y: number
  w?: number
  z?: number
  className?: string
  style?: CSSProperties
  children: ReactNode
}) {
  return (
    <div
      className={`absolute ${className ?? ""}`}
      style={{ left: x, top: y, width: w, zIndex: z, ...style }}
    >
      {children}
    </div>
  )
}

const stepLabel =
  "font-mono text-[12px] uppercase tracking-[0.08em] text-muted whitespace-nowrap"
const caption =
  "font-mono text-[11px] tracking-[0.02em] text-muted whitespace-nowrap"
const title =
  "font-display font-semibold leading-none tracking-[-0.01em] text-ink whitespace-nowrap"

export function ArcTimeline() {
  return (
    <div className="relative h-[140px] w-[1280px]">
      {/* axis */}
      <span className="absolute left-0 top-[70px] h-[2px] w-[1280px] bg-diagram dark:bg-rule" />

      {/* nodes on the axis */}
      <span className="absolute left-[30px] top-[61px] h-[18px] w-[18px] rounded-full bg-accent" />
      <span className="absolute left-[264px] top-[63px] h-[14px] w-[14px] rounded-full border-[1.5px] border-muted" />
      <span className="absolute left-[1268px] top-[64px] h-[12px] w-[12px] rounded-full bg-accent" />

      {/* step labels (above axis) */}
      <At x={4} y={6}>
        <span className={stepLabel}>01 · HOME</span>
      </At>
      <At x={250} y={6}>
        <span className={stepLabel}>02 · WORK</span>
      </At>
      <At x={640} y={6}>
        <span className={stepLabel}>03 · FAMILY</span>
      </At>
      <At x={1130} y={6}>
        <span className={stepLabel}>04 · ONE SYSTEM</span>
      </At>

      {/* the connective aside — runs into the chip's left edge (frame x 940) */}
      <At x={860} y={34}>
        <span className={caption}>each lands as an upgrade, not a repair</span>
      </At>

      {/* KNOWS chip — the rare quality anchoring the right end */}
      <div className="absolute left-[1130px] top-[38px] h-[64px] w-[120px] rounded-[4px] border border-card-border bg-card">
        <span className="absolute left-[14px] top-[16px] font-mono text-[12px] uppercase tracking-[0.08em] text-on-card">
          KNOWS
        </span>
        <span className="absolute left-[14px] top-[38px] font-mono text-[10px] tracking-[0.02em] text-on-card-muted">
          it knows me
        </span>
      </div>

      {/* titles + captions (below axis) */}
      <At x={4} y={98}>
        <span className={`${title} text-[18px]`}>a system that helped at home</span>
      </At>
      <At x={4} y={126}>
        <span className={caption}>to work better with my computer</span>
      </At>

      <At x={272} y={98}>
        <span className={`${title} text-[16px]`}>a work multiplier</span>
      </At>
      <At x={272} y={126}>
        <span className={`${caption} text-[10px]`}>the same system, bigger problems</span>
      </At>

      <At x={644} y={98}>
        <span className={`${title} text-[18px]`}>life admin for my family</span>
      </At>
      <At x={644} y={126}>
        <span className={caption}>compounding onto the same system</span>
      </At>

      <At x={1130} y={122}>
        <span className={caption}>→ part of my every day</span>
      </At>
    </div>
  )
}
