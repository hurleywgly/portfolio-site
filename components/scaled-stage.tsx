"use client"

import {
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react"

/**
 * A fixed-coordinate artboard scaled uniformly to the container width.
 * Children are laid out in artboard pixels (e.g. the Figma mobile frame's
 * 1054-wide space); the whole stage scales as one object so proportions
 * match the mock exactly at any viewport width.
 */
export function ScaledStage({
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
  const outer = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0)

  useLayoutEffect(() => {
    const el = outer.current
    if (!el) return
    const update = () => setScale(el.clientWidth / width)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [width])

  return (
    <div
      ref={outer}
      className={className}
      style={{ height: scale ? height * scale : undefined }}
    >
      <div
        style={{
          width,
          height,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          visibility: scale ? "visible" : "hidden",
        }}
        className="relative"
      >
        {children}
      </div>
    </div>
  )
}
