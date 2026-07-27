"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { loadGsap } from "@/lib/gsap"

type AssemblyTransitionProps = {
  children: ReactNode
  /** Selector for elements to stagger in. Defaults to `[data-assembly]`. */
  selector?: string
  /** Skip animation entirely (honors prefers-reduced-motion). */
  skip?: boolean
}

/**
 * Orchestrates the glass-panel assembly: children fly in from offset positions,
 * snap into their layout slots with a staggered timeline.
 *
 * Respects prefers-reduced-motion automatically — reduced-motion users see
 * panels in their final state with no animation.
 *
 * GSAP is dynamic-imported so it doesn't block first paint.
 */
export function AssemblyTransition({
  children,
  selector = "[data-assembly]",
  skip = false,
}: AssemblyTransitionProps) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (skip) return
    if (typeof window === "undefined") return

    // Respect reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const root = rootRef.current
    if (!root) return

    let killed = false
    let tl: any = null

    const run = async () => {
      const gsap = await loadGsap()
      if (killed || !root) return

      const targets = Array.from(
        root.querySelectorAll<HTMLElement>(selector),
      )
      if (targets.length === 0) return

      // Pre-set: will-change only while animating
      targets.forEach((el) => {
        el.style.willChange = "transform, opacity"
      })

      tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          targets.forEach((el) => {
            el.style.willChange = "auto"
          })
        },
      })

      gsap.set(targets, {
        opacity: 0,
        y: 40,
        scale: 0.94,
        force3D: true,
      })

      tl.to(targets, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        stagger: {
          each: 0.08,
          from: "random",
        },
      })
    }

    // Defer past the first paint so LCP isn't blocked
    const idle =
      (window as any).requestIdleCallback ||
      ((cb: () => void) => setTimeout(cb, 50))
    const handle = idle(run)

    return () => {
      killed = true
      if (tl) tl.kill()
      const cancel =
        (window as any).cancelIdleCallback ||
        ((h: number) => clearTimeout(h))
      cancel(handle)
    }
  }, [selector, skip])

  return (
    <div ref={rootRef} className="contents">
      {children}
    </div>
  )
}
