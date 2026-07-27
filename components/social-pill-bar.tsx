import { aboutSocials } from "@/lib/about-data"
import { cn } from "@/lib/utils"

/**
 * About-page social bar (DESIGN component `social-pill-bar`): a forest (light)
 * / slate (dark) rounded bar carrying X · LinkedIn · GitHub as mono labels,
 * inset from both ends. Labels only — three of the four about frames draw it
 * that way (only `desktop · dark` still carries the older icon set).
 *
 * Fills its parent box and inherits font-size, so the same component reads
 * correctly at desktop size (430×66, 14px) and scaled up inside the mobile
 * artboard (894×94, 32px).
 */
export function SocialPillBar({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-between rounded-[4px] bg-card px-[7.5%] font-mono text-[14px] tracking-[0.04em] text-on-card dark:border dark:border-card-border",
        className,
      )}
    >
      {aboutSocials.map(({ label, href }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          className="transition-colors hover:text-accent"
        >
          {label}
        </a>
      ))}
    </div>
  )
}
