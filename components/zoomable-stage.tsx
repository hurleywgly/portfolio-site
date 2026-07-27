"use client"

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react"

const MIN_ZOOM = 1
const DEFAULT_MAX_ZOOM = 3
const TAP_MOVE = 10 // px of finger travel that disqualifies a tap
const TAP_TIME = 250 // ms a tap may last
const DOUBLE_TAP_GAP = 300 // ms between taps to count as a double-tap
const DOUBLE_TAP_DIST = 40 // px the two taps must land within

type Pt = { x: number; y: number }

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v))
const distance = (a: Pt, b: Pt) => Math.hypot(a.x - b.x, a.y - b.y)
const midpoint = (a: Pt, b: Pt): Pt => ({
  x: (a.x + b.x) / 2,
  y: (a.y + b.y) / 2,
})

/**
 * ScaledStage's fixed-artboard fit-scaling, plus a pointer-driven zoom layer.
 *
 * The artboard (`width`×`height`) is scaled uniformly to the container width —
 * identical to {@link ScaledStage}. On top of that fit scale sits a user
 * transform: two-finger pinch zooms toward the gesture focal point, one finger
 * pans while zoomed, double-tap toggles 1×↔2× at the tap point, and
 * ctrl/cmd+wheel zooms on desktop. Zoom clamps to 1×–`maxZoom`; pan clamps to
 * the stage box so no empty space ever shows and 1× snaps back to a perfect
 * fit. Nothing here is position:fixed, so a sibling fixed bar (MobileNavBar)
 * is untouched by the zoom.
 */
export function ZoomableStage({
  width,
  height,
  children,
  className,
  maxZoom = DEFAULT_MAX_ZOOM,
}: {
  width: number
  height: number
  children: ReactNode
  className?: string
  maxZoom?: number
}) {
  const outer = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0) // fit scale (matches ScaledStage)
  const [zoom, setZoom] = useState(1) // user zoom on top of the fit scale
  const [pan, setPan] = useState<Pt>({ x: 0, y: 0 })
  const [smooth, setSmooth] = useState(false) // animate discrete zoom changes

  // Live mirrors so gesture math reads current values without stale closures.
  const scaleRef = useRef(0)
  const zoomRef = useRef(1)
  const panRef = useRef<Pt>({ x: 0, y: 0 })
  scaleRef.current = scale
  zoomRef.current = zoom
  panRef.current = pan

  const pointers = useRef<Map<number, Pt>>(new Map())
  const gesture = useRef<
    | { mode: "pan"; startPointer: Pt; startPan: Pt }
    | {
        mode: "pinch"
        startDist: number
        startMid: Pt
        startZoom: number
        startPan: Pt
      }
    | null
  >(null)
  const tap = useRef<{ x: number; y: number; t: number; moved: boolean } | null>(
    null,
  )
  const pinchedSequence = useRef(false)
  const lastTap = useRef<{ x: number; y: number; t: number } | null>(null)

  const clampPan = useCallback(
    (p: Pt, z: number): Pt => {
      const W = width * scaleRef.current
      const H = height * scaleRef.current
      return {
        x: clamp(p.x, W * (1 - z), 0),
        y: clamp(p.y, H * (1 - z), 0),
      }
    },
    [width, height],
  )

  const setView = useCallback((z: number, p: Pt) => {
    zoomRef.current = z
    panRef.current = p
    setZoom(z)
    setPan(p)
  }, [])

  // Fit-scale measurement (same intent as ScaledStage) + keep pan valid on resize.
  useLayoutEffect(() => {
    const el = outer.current
    if (!el) return
    const update = () => {
      const s = el.clientWidth / width
      scaleRef.current = s
      setScale(s)
      const p = clampPan(panRef.current, zoomRef.current)
      panRef.current = p
      setPan(p)
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [width, clampPan])

  const localPoint = (e: { clientX: number; clientY: number }): Pt => {
    const r = outer.current!.getBoundingClientRect()
    return { x: e.clientX - r.left, y: e.clientY - r.top }
  }

  // Zoom to `nextZoom` while keeping the content under `focal` stationary.
  const zoomAt = useCallback(
    (focal: Pt, nextZoom: number, animate = false) => {
      const z = zoomRef.current
      const nz = clamp(nextZoom, MIN_ZOOM, maxZoom)
      const p = panRef.current
      // content point under the focal (base coords) is (focal - pan) / z;
      // solve for the pan that keeps it under the focal at the new zoom.
      const np = {
        x: focal.x - (nz / z) * (focal.x - p.x),
        y: focal.y - (nz / z) * (focal.y - p.y),
      }
      setSmooth(animate)
      setView(nz, clampPan(np, nz))
    },
    [clampPan, maxZoom, setView],
  )

  const capture = (e: ReactPointerEvent<HTMLDivElement>) => {
    try {
      outer.current?.setPointerCapture(e.pointerId)
    } catch {
      /* capture is best-effort */
    }
  }

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    const p = localPoint(e)
    pointers.current.set(e.pointerId, p)
    setSmooth(false)

    if (pointers.current.size === 2) {
      const [a, b] = Array.from(pointers.current.values())
      gesture.current = {
        mode: "pinch",
        startDist: distance(a, b) || 1,
        startMid: midpoint(a, b),
        startZoom: zoomRef.current,
        startPan: panRef.current,
      }
      pinchedSequence.current = true
      tap.current = null
    } else if (pointers.current.size === 1) {
      tap.current = { x: p.x, y: p.y, t: performance.now(), moved: false }
      gesture.current =
        zoomRef.current > 1
          ? { mode: "pan", startPointer: p, startPan: panRef.current }
          : null
    }
  }

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!pointers.current.has(e.pointerId)) return
    const p = localPoint(e)
    pointers.current.set(e.pointerId, p)

    const g = gesture.current

    if (g?.mode === "pinch" && pointers.current.size >= 2) {
      const [a, b] = Array.from(pointers.current.values())
      const d = distance(a, b) || 1
      const m = midpoint(a, b)
      const nz = clamp((g.startZoom * d) / g.startDist, MIN_ZOOM, maxZoom)
      // keep the content point that started under startMid under the live mid
      const base = {
        x: (g.startMid.x - g.startPan.x) / g.startZoom,
        y: (g.startMid.y - g.startPan.y) / g.startZoom,
      }
      capture(e)
      setSmooth(false)
      setView(nz, clampPan({ x: m.x - nz * base.x, y: m.y - nz * base.y }, nz))
      e.preventDefault()
      return
    }

    if (g?.mode === "pan" && zoomRef.current > 1) {
      const np = {
        x: g.startPan.x + (p.x - g.startPointer.x),
        y: g.startPan.y + (p.y - g.startPointer.y),
      }
      if (tap.current) tap.current.moved = true
      capture(e)
      setSmooth(false)
      setView(zoomRef.current, clampPan(np, zoomRef.current))
      e.preventDefault()
      return
    }

    if (
      tap.current &&
      (Math.abs(p.x - tap.current.x) > TAP_MOVE ||
        Math.abs(p.y - tap.current.y) > TAP_MOVE)
    ) {
      tap.current.moved = true
    }
  }

  const endPointer = (e: ReactPointerEvent<HTMLDivElement>) => {
    const had = pointers.current.delete(e.pointerId)
    try {
      outer.current?.releasePointerCapture(e.pointerId)
    } catch {
      /* release is best-effort */
    }

    // Clean single-finger tap (never after a pinch) → double-tap toggle.
    const tc = tap.current
    if (
      had &&
      tc &&
      !tc.moved &&
      !pinchedSequence.current &&
      performance.now() - tc.t < TAP_TIME
    ) {
      const now = performance.now()
      const lt = lastTap.current
      if (lt && now - lt.t < DOUBLE_TAP_GAP && distance(tc, lt) < DOUBLE_TAP_DIST) {
        const focal = { x: tc.x, y: tc.y }
        zoomAt(focal, zoomRef.current > 1.01 ? 1 : 2, true)
        lastTap.current = null
      } else {
        lastTap.current = { x: tc.x, y: tc.y, t: now }
      }
    }
    tap.current = null

    if (pointers.current.size === 1) {
      // One finger lifted after a pinch → carry on as a pan.
      const remaining = Array.from(pointers.current.values())[0]
      gesture.current =
        zoomRef.current > 1
          ? { mode: "pan", startPointer: remaining, startPan: panRef.current }
          : null
    } else if (pointers.current.size === 0) {
      gesture.current = null
      pinchedSequence.current = false
      if (zoomRef.current < 1.02) {
        setSmooth(true)
        setView(1, { x: 0, y: 0 })
      }
    }
  }

  // ctrl/cmd + wheel zoom — attached non-passive so preventDefault sticks.
  useEffect(() => {
    const el = outer.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      if (!(e.ctrlKey || e.metaKey)) return // plain wheel = normal page scroll
      e.preventDefault()
      const r = el.getBoundingClientRect()
      const focal = { x: e.clientX - r.left, y: e.clientY - r.top }
      const nz = clamp(
        zoomRef.current * Math.exp(-e.deltaY * 0.0016),
        MIN_ZOOM,
        maxZoom,
      )
      zoomAt(focal, nz, false)
    }
    el.addEventListener("wheel", onWheel, { passive: false })
    return () => el.removeEventListener("wheel", onWheel)
  }, [maxZoom, zoomAt])

  const zoomed = zoom > 1.001

  return (
    <div
      ref={outer}
      className={className}
      style={{
        aspectRatio: `${width} / ${height}`,
        position: "relative",
        overflow: "hidden",
        // At rest let the page scroll vertically but reserve two-finger
        // gestures for us (pinch-zoom is not in `pan-y`); while zoomed we own
        // every gesture so one finger pans instead of scrolling the page.
        touchAction: zoomed ? "none" : "pan-y",
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endPointer}
      onPointerCancel={endPointer}
    >
      <div
        style={{
          inset: 0,
          position: "absolute",
          width: width * scale,
          height: height * scale,
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: "top left",
          transition: smooth ? "transform 220ms ease-out" : "none",
          willChange: "transform",
        }}
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
    </div>
  )
}
