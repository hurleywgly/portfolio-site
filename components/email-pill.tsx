import { cn } from "@/lib/utils"

const EMAIL = "ryan.wigley522@gmail.com"

/**
 * The GET IN TOUCH email pill: a forest/slate full-pill `mailto:` link with the
 * address in mono. Fills its parent box; font-size is inherited so the one
 * component serves both the desktop pill and the scaled-up mobile artboard pill.
 */
export function EmailPill({ className }: { className?: string }) {
  return (
    <a
      href={`mailto:${EMAIL}`}
      className={cn(
        "flex h-full w-full items-center rounded-full bg-card px-[7%] font-mono text-[14px] tracking-[0.02em] text-on-card transition-colors hover:text-accent",
        className,
      )}
    >
      {EMAIL}
    </a>
  )
}
