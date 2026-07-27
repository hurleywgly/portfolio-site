import { cn } from "@/lib/utils"

/**
 * Footer coordinate tag: gold dot + "GRID NN · 47°N · PAGE" in tracked mono.
 * Home is footer-less by design — this is for the other pages' footers.
 * GRID numbers are set-dressing lore, not data.
 */
export function GridFooterTag({
  grid,
  page,
  className,
}: {
  grid: string
  page: string
  className?: string
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-2 font-mono text-[13px] uppercase tracking-[0.14em] text-muted",
        className,
      )}
    >
      <span
        className="h-[7px] w-[7px] rounded-full bg-accent"
        aria-hidden="true"
      />
      GRID {grid} · 47°N · {page}
    </p>
  )
}
