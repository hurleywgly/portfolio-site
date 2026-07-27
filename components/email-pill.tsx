import { aboutEmail } from "@/lib/about-data"
import { cn } from "@/lib/utils"

/**
 * The GET IN TOUCH pill: a forest (light) / slate (dark) `mailto:` plate with
 * the address in mono, r4 as drawn in the frames. Fills its parent box and
 * inherits font-size, so the one component serves both the desktop pill
 * (360×48, 14px) and the scaled-up mobile artboard pill (496×78, 28px).
 */
export function EmailPill({ className }: { className?: string }) {
  return (
    <a
      href={`mailto:${aboutEmail}`}
      className={cn(
        "flex h-full w-full items-center rounded-[4px] bg-card px-[7.5%] font-mono text-[14px] tracking-[0.02em] text-on-card transition-colors hover:text-accent dark:border dark:border-card-border",
        className,
      )}
    >
      {aboutEmail}
    </a>
  )
}
