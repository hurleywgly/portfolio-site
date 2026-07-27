import { CopyButton } from "@/components/copy-button"
import { cn } from "@/lib/utils"

/**
 * A command plate: the install command in mono that WRAPS (never clips) plus the
 * forest copy button. The plate surface/border and the padding slots are passed
 * in so this serves both the hero bar and the inset per-skill install boxes.
 */
export function InstallBar({
  command,
  className,
  codeClassName,
  buttonClassName,
  align = "stretch",
}: {
  command: string
  className?: string
  codeClassName?: string
  buttonClassName?: string
  align?: "stretch" | "center"
}) {
  return (
    <div
      className={cn(
        "flex gap-3 overflow-hidden",
        align === "stretch" ? "items-stretch" : "items-center",
        className,
      )}
    >
      <code
        className={cn(
          "min-w-0 flex-1 self-center whitespace-pre-wrap break-all font-mono text-ink",
          codeClassName,
        )}
      >
        {command}
      </code>
      <CopyButton text={command} className={buttonClassName} />
    </div>
  )
}
