"use client"

import { useLayoutEffect, useRef, useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"

/**
 * A fixed-size exhibit canvas that scales down proportionally to fit its
 * container. The design is a pinboard, so children are absolutely positioned
 * at their frame coordinates inside a `width × height` stage; below that width
 * the whole stage shrinks as one, staying centered and top-aligned.
 */
export function ExhibitStage({
  width,
  height,
  children,
  className,
}: {
  width: number
  height: number
  children: ReactNode
  className?: string
}) {
  const outerRef = useRef<HTMLDivElement>(null)
  const [{ scale, left }, set] = useState({ scale: 1, left: 0 })

  useLayoutEffect(() => {
    const el = outerRef.current
    if (!el) return
    const update = () => {
      const w = el.clientWidth
      const s = Math.min(1, w / width)
      set({ scale: s, left: Math.max(0, (w - width * s) / 2) })
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [width])

  return (
    <div
      ref={outerRef}
      className={cn("relative w-full overflow-hidden", className)}
      style={{ height: height * scale }}
    >
      <div
        className="absolute top-0"
        style={{
          width,
          height,
          left,
          transformOrigin: "top left",
          transform: `scale(${scale})`,
        }}
      >
        {children}
      </div>
    </div>
  )
}
