import { cn } from "@/lib/utils"

/**
 * RW monogram — stacked Fraunces Black "R" over "W". Token-driven ink color,
 * so it flips forest-on-sage → cream-on-midnight with the theme. Sized by
 * the parent via `style`/`className` height; letters scale to fill.
 */
export function RwLogo({
  className,
  title = "Ryan Wigley — home",
}: {
  className?: string
  title?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex flex-col items-center justify-center font-display font-black leading-[0.66] tracking-[-0.04em] text-ink",
        className,
      )}
      aria-hidden="true"
      title={title}
    >
      <span className="block text-[0.62em]">R</span>
      <span className="-mt-[0.06em] block text-[1em]">W</span>
    </span>
  )
}
