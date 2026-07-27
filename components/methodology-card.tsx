import Link from "next/link"
import { cn } from "@/lib/utils"

/**
 * Real geometry exported from Figma's "methodology · network" module
 * (374:137 desktop light / 1003:103 desktop dark, file
 * sGFjHbsFwMriSNcfT7TQrc): a 74-edge constellation mesh (two opacity/weight
 * tiers), 6 ringed "major" nodes, 8 medium + 15 minor solid nodes, a big
 * dashed halo ring, and a dim-gold core ring + dot. Light and dark bake
 * identical geometry — only the card + text tokens differ — so on-card-muted
 * (the SVG's default currentColor) covers the muted strokes and on-card the
 * brighter ones; the core's #94854A doesn't map to any theme token (it's the
 * same hex in both Figma frames) so it's hardcoded to match exactly.
 */

const MESH_EDGES: { d: string; bold?: boolean }[] = [
  { d: "M179.832 158.453L157.416 230.509" },
  { d: "M179.832 158.453L168.003 81.4915" },
  { d: "M179.831 158.453L142.843 184.829", bold: true },
  { d: "M179.832 158.453L145.523 114.111", bold: true },
  { d: "M179.832 158.453L170.486 251.47" },
  { d: "M157.416 230.509L109.253 270.201" },
  { d: "M157.416 230.509L142.843 184.829", bold: true },
  { d: "M157.416 230.509L100.496 226.05", bold: true },
  { d: "M157.416 230.509L170.486 251.47", bold: true },
  { d: "M157.416 230.509L90.1055 280.776" },
  { d: "M109.253 270.201L53.8361 262.364", bold: true },
  { d: "M109.253 270.2L142.843 184.829" },
  { d: "M109.253 270.201L100.496 226.05", bold: true },
  { d: "M109.253 270.201L50.2419 206.809" },
  { d: "M109.253 270.201L170.486 251.47" },
  { d: "M109.253 270.201L90.1055 280.776", bold: true },
  { d: "M53.8361 262.364L12.2079 209.931" },
  { d: "M53.8361 262.364L100.496 226.05" },
  { d: "M53.8361 262.364L50.2419 206.809", bold: true },
  { d: "M53.8361 262.364L11.0317 255.293", bold: true },
  { d: "M53.8361 262.364L90.1055 280.776", bold: true },
  { d: "M12.208 209.931L0.379544 132.969" },
  { d: "M12.2079 209.931L100.496 226.049" },
  { d: "M12.2079 209.931L50.2418 206.809", bold: true },
  { d: "M12.2079 209.931L30.0486 141.506" },
  { d: "M12.208 209.931L11.0317 255.292", bold: true },
  { d: "M0.379544 132.969L22.7947 60.9131" },
  { d: "M0.379544 132.969L50.2418 206.809" },
  { d: "M0.379544 132.969L30.0486 141.506", bold: true },
  { d: "M0.379544 132.969L55.0778 79.4528" },
  { d: "M22.7947 60.913L70.9579 21.2217" },
  { d: "M22.7947 60.9131L30.0486 141.506" },
  { d: "M22.7947 60.9131L55.0778 79.4527", bold: true },
  { d: "M22.7947 60.9131L106.443 67.2204" },
  { d: "M22.7947 60.913L13.6457 6.82316", bold: true },
  { d: "M22.7947 60.9131L90.1056 0.452262" },
  { d: "M70.9579 21.2217L126.375 29.058", bold: true },
  { d: "M70.9579 21.2217L55.0778 79.4527" },
  { d: "M70.9579 21.2217L106.443 67.2203" },
  { d: "M70.9579 21.2216L13.6457 6.82316" },
  { d: "M70.9579 21.2217L166.565 10.6458" },
  { d: "M70.9579 21.2217L90.1056 0.452262", bold: true },
  { d: "M126.375 29.058L168.003 81.4914" },
  { d: "M126.375 29.058L55.0778 79.4527" },
  { d: "M126.375 29.058L106.443 67.2203", bold: true },
  { d: "M126.375 29.058L145.523 114.111" },
  { d: "M126.375 29.058L166.565 10.6458", bold: true },
  { d: "M126.375 29.0581L90.1055 0.452262", bold: true },
  { d: "M168.003 81.4915L106.443 67.2204" },
  { d: "M168.003 81.4915L145.523 114.111", bold: true },
  { d: "M168.003 81.4914L166.565 10.6458" },
  { d: "M142.843 184.829L100.496 226.049" },
  { d: "M142.843 184.829L50.2419 206.809" },
  { d: "M142.843 184.829L145.523 114.111" },
  { d: "M142.843 184.829L170.486 251.47" },
  { d: "M100.496 226.05L50.2419 206.809", bold: true },
  { d: "M100.496 226.05L11.0317 255.293" },
  { d: "M100.496 226.05L170.486 251.47" },
  { d: "M100.496 226.05L90.1055 280.777", bold: true },
  { d: "M50.2418 206.809L30.0486 141.506" },
  { d: "M50.2419 206.809L11.0317 255.293" },
  { d: "M50.2419 206.809L90.1056 280.777" },
  { d: "M30.0486 141.506L55.0777 79.4528" },
  { d: "M55.0778 79.4527L106.443 67.2204", bold: true },
  { d: "M55.0778 79.4528L145.523 114.111" },
  { d: "M55.0778 79.4526L13.6457 6.82316" },
  { d: "M55.0778 79.4527L90.1055 0.452262" },
  { d: "M106.443 67.2204L145.523 114.111" },
  { d: "M106.443 67.2203L166.565 10.6458" },
  { d: "M106.443 67.2204L90.1055 0.452262" },
  { d: "M13.6457 6.82326L90.1056 0.452262" },
  { d: "M166.565 10.6459L90.1055 0.452262" },
  { d: "M11.0317 255.293L90.1056 280.777" },
  { d: "M170.486 251.47L90.1055 280.777" },
]

/** Ringed "major" nodes — hollow circle, on-card-muted. */
const MAJOR_RINGS: [number, number][] = [
  [192.326, 177.114],
  [24.703, 228.591],
  [138.87, 47.718],
  [62.736, 225.469],
  [158.018, 132.772],
  [182.981, 270.13],
]
const MAJOR_R = 3.227

/** Medium solid nodes — on-card (bright). */
const MEDIUM_DOTS: [number, number][] = [
  [192.327, 177.114],
  [66.331, 281.025],
  [35.29, 79.574],
  [180.498, 100.153],
  [62.737, 225.47],
  [118.938, 85.882],
  [179.059, 29.308],
  [102.6, 19.114],
]
const MEDIUM_R = 1.936

/** Minor solid nodes — on-card (bright), smaller. */
const MINOR_DOTS: [number, number][] = [
  [169.911, 249.17],
  [121.748, 288.861],
  [24.702, 228.591],
  [12.874, 151.63],
  [83.452, 39.882],
  [138.869, 47.719],
  [155.338, 203.49],
  [112.991, 244.71],
  [42.543, 160.167],
  [67.572, 98.113],
  [158.017, 132.771],
  [26.14, 25.484],
  [23.526, 273.953],
  [182.981, 270.13],
  [102.6, 299.437],
]
const MINOR_R = 1.29

/** Core — concentric ring + dot, both the same one-off dim-gold. */
const CORE = { x: 102.6, y: 164.372 }
const CORE_RING_R = 5.808
const CORE_DOT_R = 1.936
const CORE_GOLD = "#94854A"

/**
 * The methodology "tarot" card: a constellation network with a dim-gold
 * core, a Fraunces title, and a HOW I THINK mono footer. Forest in light,
 * slate in dark — the card family, restyled by tokens only.
 */
export function MethodologyCard({
  href = "/methodology",
  className,
}: {
  href?: string
  className?: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[12px] border border-card-border bg-card p-4",
        className,
      )}
    >
      <svg
        viewBox="0 0 205.2 298.8"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full text-on-card-muted"
        aria-hidden="true"
      >
        {/* big dashed halo ring around the core */}
        <circle
          cx={CORE.x}
          cy={CORE.y}
          r="33.555"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.152"
          strokeDasharray="1.92 4.8"
          opacity="0.7"
        />

        {/* constellation mesh */}
        <g transform="translate(12.874 19.113)" className="text-on-card">
          {MESH_EDGES.map((e, i) => (
            <path
              key={i}
              d={e.d}
              stroke="currentColor"
              opacity={e.bold ? 0.7 : 0.4}
              strokeWidth={e.bold ? 1.152 : 0.768}
            />
          ))}
        </g>

        {/* ringed major nodes */}
        {MAJOR_RINGS.map(([cx, cy], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={MAJOR_R}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.248"
          />
        ))}

        {/* solid medium + minor nodes */}
        <g className="text-on-card">
          {MEDIUM_DOTS.map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r={MEDIUM_R} fill="currentColor" />
          ))}
          {MINOR_DOTS.map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r={MINOR_R} fill="currentColor" />
          ))}
        </g>

        {/* dim-gold core */}
        <circle
          cx={CORE.x}
          cy={CORE.y}
          r={CORE_RING_R}
          fill="none"
          stroke={CORE_GOLD}
          strokeWidth="1.536"
        />
        <circle cx={CORE.x} cy={CORE.y} r={CORE_DOT_R} fill={CORE_GOLD} />
      </svg>

      <span className="relative z-10 font-display text-[24px] font-semibold leading-none tracking-[-0.01em] text-on-card">
        Methodology
      </span>

      <span className="relative z-10 font-mono text-[13px] uppercase tracking-[0.16em] text-on-card-muted">
        How I Think
      </span>
    </Link>
  )
}
