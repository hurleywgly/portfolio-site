"use client"

import { forwardRef, type HTMLAttributes, type MouseEvent } from "react"
import { cn } from "@/lib/utils"

type GlassPanelProps = HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "subtle"
  as?: "div" | "section" | "article"
}

/**
 * Glass panel primitive.
 *
 * - Uses `.glass-panel` class from globals.css (backdrop-filter, contain: paint, ::before radial gradient).
 * - Writes --mouse-x / --mouse-y CSS vars on hover → radial gradient follows the cursor.
 *   Zero React re-renders; the reconciler is bypassed entirely.
 */
export const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(
  function GlassPanel(
    { className, variant = "default", as: Tag = "div", children, ...rest },
    ref,
  ) {
    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
      const el = e.currentTarget
      const rect = el.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      el.style.setProperty("--mouse-x", `${x}%`)
      el.style.setProperty("--mouse-y", `${y}%`)
    }

    const base = variant === "subtle" ? "glass-panel-subtle" : "glass-panel"

    return (
      <Tag
        ref={ref as any}
        className={cn(base, className)}
        onMouseMove={handleMouseMove}
        {...rest}
      >
        {children}
      </Tag>
    )
  },
)
