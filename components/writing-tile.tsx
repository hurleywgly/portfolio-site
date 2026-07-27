import { BLOG_URL } from "@/lib/site"
import { cn } from "@/lib/utils"

/**
 * A single hairline skeleton rule, absolutely positioned in the tile's
 * native 187.2×197.6 (desktop Figma) coordinate space.
 */
function Line({
  x,
  y,
  w,
  h = 2,
}: {
  x: number
  y: number
  w: number
  h?: number
}) {
  return (
    <span
      className="absolute rounded-full bg-on-card-muted"
      style={{ left: x, top: y, width: w, height: h }}
    />
  )
}

// Both standfirst columns share the same row-width pattern in Figma.
const ROW_WIDTHS = [72, 62.4, 72, 51.2]

/**
 * Writing → the blog, styled as a small newspaper front page: masthead +
 * rule, a left skeleton-text column beside a light image plate, three more
 * rules, then a SYSTEMS · BUILDING standfirst with two 4-line skeleton
 * columns underneath. Card-deep forest in light, slate in dark (identical to
 * `card` in dark — one slate family).
 *
 * Geometry is ported 1:1 from the Figma `writing_block` vector export (home
 * desktop light/dark `374:926` / `1010:166`, mobile `233:345` / `403:295` —
 * confirmed via the raw exported SVG paths that mobile is a uniform 1.25×
 * scale of desktop). This component always renders at its native
 * 187.2×197.6 desktop size; `home-mobile-mock.tsx` scales the whole tile
 * 1.25× as one unit via `AtScaled`, so every coordinate below is
 * desktop-space and both breakpoints stay pixel-exact to Figma for free.
 *
 * The image plate uses `on-card` (light) / `on-card-muted` (dark) — the
 * closest existing tokens to Figma's exact plate fills (`#DCE0CB` /
 * `#809BBB`) — so it reads as a genuinely light, contrasting object against
 * the card in both themes rather than the near-invisible muted-border box
 * this used to be. External link to the Substack.
 */
export function WritingTile({ className }: { className?: string }) {
  return (
    <a
      href={BLOG_URL}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "group relative block h-full w-full rounded-[10px] border border-card-border bg-card-deep",
        className,
      )}
    >
      {/* masthead */}
      <span
        className="absolute whitespace-nowrap font-display text-[22.4px] font-semibold leading-none tracking-[-0.24px] text-on-card"
        style={{ left: 12.8, top: 6.4 }}
      >
        Writing
      </span>
      <Line x={12.8} y={40.8} w={156.8} h={2.4} />

      {/* left skeleton column + the light image plate */}
      <Line x={12.8} y={51.2} w={72} />
      <Line x={12.8} y={60.8} w={72} />
      <Line x={12.8} y={70.4} w={28.8} />
      <span
        className="absolute rounded-[2px] bg-on-card dark:bg-on-card-muted"
        style={{ left: 102.4, top: 51.2, width: 64, height: 40 }}
      />

      {/* three more full-width rules */}
      <Line x={12.8} y={99.2} w={156.8} />
      <Line x={12.8} y={108.8} w={120} />
      <Line x={12.8} y={119.2} w={156.8} />

      {/* standfirst */}
      <span
        className="absolute whitespace-nowrap font-mono text-[11.2px] uppercase tracking-[0.4px] text-on-card"
        style={{ left: 12.8, top: 129.6 }}
      >
        Systems
      </span>
      <span
        className="absolute whitespace-nowrap font-mono text-[11.2px] uppercase tracking-[0.4px] text-on-card"
        style={{ left: 97.6, top: 130.4 }}
      >
        Building
      </span>

      {/* two 4-line skeleton columns under the standfirst */}
      {ROW_WIDTHS.map((w, i) => (
        <Line key={`l${i}`} x={12.8} y={149.6 + i * 8} w={w} />
      ))}
      {ROW_WIDTHS.map((w, i) => (
        <Line key={`r${i}`} x={98.4} y={149.6 + i * 8} w={w} />
      ))}
    </a>
  )
}
