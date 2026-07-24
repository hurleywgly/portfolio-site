import { cn } from "@/lib/utils"

/**
 * An AT A GLANCE card (methodology desktop). The card family — forest in light,
 * slate in dark — restyled by tokens only. Body sits at a fixed offset so every
 * card's statement aligns whether or not it carries the mini process timeline.
 * Fills its parent Box (400×240 in the exhibit stage).
 */
export function GlanceCard({
  body,
  label,
  caption,
  timeline = false,
}: {
  body: string
  label: string
  caption: string
  timeline?: boolean
}) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[4px] border border-card-border bg-card">
      {timeline ? <MiniTimeline /> : null}

      <p className="absolute left-6 right-6 top-[76px] font-body text-[15px] leading-[1.4] text-on-card">
        {body}
      </p>

      <p className="absolute left-6 top-[182px] font-mono text-[13px] uppercase tracking-[0.06em] text-on-card">
        {label}
      </p>
      <p className="absolute left-6 right-6 top-[204px] font-mono text-[11px] tracking-[0.02em] text-on-card-muted">
        {caption}
      </p>
    </div>
  )
}

/** Three-node process ganttlet: a gold origin dot, then two muted nodes joined
 * by a hairline — the "then, then" motion of the loop. Traced from the frame. */
function MiniTimeline() {
  return (
    <div className="absolute left-6 top-8 h-[10px] w-[190px]" aria-hidden="true">
      <span className="absolute left-[11px] top-1/2 h-px w-[167px] -translate-y-1/2 bg-on-card-muted/50" />
      <Node x={6} size={10} gold />
      <Node x={106} size={8} />
      <Node x={174} size={8} />
    </div>
  )
}

function Node({ x, size, gold }: { x: number; size: number; gold?: boolean }) {
  return (
    <span
      className={cn(
        "absolute top-1/2 -translate-y-1/2 rounded-full",
        gold ? "bg-accent" : "bg-on-card-muted",
      )}
      style={{ left: x, width: size, height: size }}
    />
  )
}
