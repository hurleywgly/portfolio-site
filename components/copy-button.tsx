"use client"

import { useCallback, useRef, useState } from "react"
import { cn } from "@/lib/utils"

/**
 * The forest "copy" button that copies an install command to the clipboard and
 * briefly flips its label to "copied". Styling is passed in so it can serve the
 * hero install bar and the per-skill install boxes alike.
 */
export function CopyButton({
  text,
  className,
  label = "copy",
}: {
  text: string
  className?: string
  label?: string
}) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      // clipboard may be unavailable (insecure context) — fail quietly
    }
    setCopied(true)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), 1400)
  }, [text])

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={`Copy: ${text}`}
      className={cn(
        "shrink-0 bg-card font-mono lowercase tracking-[0.03em] text-on-card transition-colors hover:bg-card-deep",
        className,
      )}
    >
      {copied ? "copied" : label}
    </button>
  )
}
