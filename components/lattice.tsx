import { cn } from "@/lib/utils"

/**
 * The architectural lattice grammar: thin rules, L-brackets, hollow squares,
 * filled junction dots — placed unevenly in open space. Never circles-as-
 * ornament, never even grids. Coordinates are absolute within the positioned
 * parent (the exhibit canvas). Light: rules use `rule`, nodes use `diagram`.
 * Dark: everything shifts to `lattice-mid` — visible but calm.
 */
export type LatticeMark =
  | { type: "rule"; x: number; y: number; w: number; h: number; faint?: boolean }
  | {
      type: "bracket"
      x: number
      y: number
      w: number
      h: number
      corner?: "tl" | "tr" | "bl" | "br"
      faint?: boolean
    }
  | { type: "square"; x: number; y: number; size: number; faint?: boolean }
  | {
      type: "dot"
      x: number
      y: number
      /** Junction-dot diameter; 7 on desktop frames, 9 on the mobile artboards. */
      size?: number
      gold?: boolean
      faint?: boolean
    }

const cornerBorders: Record<string, string> = {
  tl: "border-l border-t",
  tr: "border-r border-t",
  bl: "border-l border-b",
  br: "border-r border-b",
}

export function Lattice({
  marks,
  className,
}: {
  marks: LatticeMark[]
  className?: string
}) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0", className)}
      aria-hidden="true"
    >
      {marks.map((m, i) => {
        if (m.type === "rule") {
          return (
            <span
              key={i}
              className={cn(
                "absolute bg-rule dark:bg-lattice-mid",
                m.faint && "opacity-60",
              )}
              style={{
                left: m.x,
                top: m.y,
                width: Math.max(m.w, 1),
                height: Math.max(m.h, 1),
              }}
            />
          )
        }
        if (m.type === "bracket") {
          return (
            <span
              key={i}
              className={cn(
                "absolute border-rule dark:border-lattice-mid",
                cornerBorders[m.corner ?? "tl"],
                m.faint && "opacity-60",
              )}
              style={{ left: m.x, top: m.y, width: m.w, height: m.h }}
            />
          )
        }
        if (m.type === "square") {
          return (
            <span
              key={i}
              className={cn(
                "absolute border-[1.5px] border-diagram dark:border-lattice-mid",
                m.faint && "opacity-60",
              )}
              style={{ left: m.x, top: m.y, width: m.size, height: m.size }}
            />
          )
        }
        return (
          <span
            key={i}
            className={cn(
              "absolute rounded-full",
              m.gold ? "bg-accent" : "bg-diagram dark:bg-lattice-mid",
              m.faint && "opacity-60",
            )}
            style={{
              left: m.x,
              top: m.y,
              width: m.size ?? 7,
              height: m.size ?? 7,
            }}
          />
        )
      })}
    </div>
  )
}
