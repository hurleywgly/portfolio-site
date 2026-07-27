import type { Metadata } from "next"
import Link from "next/link"
import type { CSSProperties, ReactNode } from "react"
import {
  ArsenalChips,
  BriefGlyph,
  CapsuleGlyph,
  PitchGlyph,
  ResearchGlyph,
} from "@/components/arsenal-chips"
import { CrewPolaroid } from "@/components/crew-polaroid"
import { ExhibitStage } from "@/components/exhibit-stage"
import { HomeMobileMock } from "@/components/home-mobile-mock"
import { Lattice } from "@/components/lattice"
import { MethodologyCard } from "@/components/methodology-card"
import { ProjectTile, homeMotifs } from "@/components/project-tile"
import { ShelfDiorama } from "@/components/shelf-diorama"
import { WaveformBanner } from "@/components/waveform-banner"
import { WritingTile } from "@/components/writing-tile"
import { homeChips, homeLatticeDesktop, homeTiles } from "@/lib/home-data"

export const metadata: Metadata = {
  alternates: { canonical: "/" },
}

const glyphs: Record<string, ReactNode> = {
  capsule: <CapsuleGlyph />,
  pitch: <PitchGlyph />,
  brief: <BriefGlyph />,
  research: <ResearchGlyph />,
}

const chips = homeChips.map((c) => ({ ...c, glyph: glyphs[c.glyph] }))

function tileTitle(title: string | [string, string]) {
  return Array.isArray(title) ? (
    <>
      {title[0]}
      <br />
      {title[1]}
    </>
  ) : (
    title
  )
}

/** Absolute box inside the desktop exhibit canvas, positioned by frame coords. */
function Box({
  x,
  y,
  w,
  h,
  z,
  children,
  className,
}: {
  x: number
  y: number
  w?: number
  h?: number
  z?: number
  children: ReactNode
  className?: string
}) {
  const style: CSSProperties = { left: x, top: y, width: w, height: h, zIndex: z }
  return (
    <div className={`absolute ${className ?? ""}`} style={style}>
      {children}
    </div>
  )
}

/** The Figma home desktop frame (344:2 light / 1003:2 dark) bakes its own
 *  logo/nav/theme-switcher into the top of the artboard, like every page's
 *  frame does. The real page gets that chrome from the shared glass Header
 *  instead (#61 — home's old in-artboard nav scaled with the exhibit stage,
 *  so it measured a different size/position than every other route's nav and
 *  made navigation visibly "jump"). So, same crop-the-chrome-band technique
 *  as /about's DESK_TOP: the stage starts 90px into the original 1024-tall
 *  frame — Figma's chrome band (logo/nav/theme-switcher) occupied roughly
 *  y:[42,90] — and every child coordinate below is the original Figma value
 *  minus that same 90px, preserving Figma's authored spacing between chrome
 *  and content (e.g. hero was y=138, i.e. 48px below the chrome; it's still
 *  48px below the new crop line today).
 */
const DESK_TOP = 90

export default function Home() {
  return (
    <main className="-mt-[76px] md:mt-0">
      {/* ============================= DESKTOP ============================= */}
      <div className="hidden md:block">
        <ExhibitStage width={1440} height={1024 - DESK_TOP}>
          {/* lattice sits behind everything */}
          <Lattice
            marks={homeLatticeDesktop.map((m) => ({ ...m, y: m.y - DESK_TOP }))}
          />

          {/* hero */}
          <Box x={80} y={138 - DESK_TOP} w={440} z={10}>
            <h1 className="font-display text-[40px] font-black leading-[1.06] tracking-[-0.015em] text-ink">
              Ryan is building apps &amp; AI systems
            </h1>
          </Box>
          <Box x={80} y={248 - DESK_TOP} w={447} z={10}>
            <p className="font-body text-[17px] leading-[1.5] text-muted">
              The website is my canvas and kiosk, I hope you like it.
            </p>
          </Box>

          {/* personality diorama — links to /about (the shelf and the crew are
              the two "who is this person" objects on the front door) */}
          <Box x={629} y={148 - DESK_TOP} w={350} h={171} z={10}>
            <Link href="/about" aria-label="About Ryan" className="block h-full w-full">
              <ShelfDiorama />
            </Link>
          </Box>

          {/* flagship + work grid */}
          <Box x={141} y={319 - DESK_TOP} w={292} h={112} z={10}>
            <WaveformBanner />
          </Box>
          {homeTiles.map((tile, i) => (
            <Box
              key={tile.slug}
              x={141 + (i % 2) * 152}
              y={491 - DESK_TOP + Math.floor(i / 2) * 140}
              w={140}
              h={128}
              z={10}
            >
              <ProjectTile
                title={tileTitle(tile.title)}
                href={tile.href}
                motif={homeMotifs[tile.slug]}
              />
            </Box>
          ))}

          {/* methodology + writing */}
          <Box x={590} y={369 - DESK_TOP} w={205} h={299} z={10}>
            <MethodologyCard />
          </Box>
          <Box x={1170} y={229 - DESK_TOP} w={187} h={198} z={10}>
            <WritingTile />
          </Box>

          {/* arsenal */}
          <Box x={610} y={696 - DESK_TOP} z={10}>
            <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-accent">
              Tools · The Arsenal
            </p>
          </Box>
          <Box x={610} y={724 - DESK_TOP} w={453} h={152} z={10}>
            <ArsenalChips
              chips={chips}
              className="h-full grid-flow-col grid-rows-2 gap-x-[7px] gap-y-[6.6px]"
            />
          </Box>
          <Box x={610} y={888 - DESK_TOP} z={10}>
            <Link
              href="/tools"
              className="font-mono text-[13px] lowercase text-card transition-colors hover:text-accent dark:text-accent"
            >
              browse all my skills&nbsp;&nbsp;→
            </Link>
          </Box>

          {/* crew — also links to /about */}
          <Box x={1175} y={579 - DESK_TOP} w={181} h={152} z={10}>
            <Link href="/about" aria-label="About Ryan" className="block h-full w-full">
              <CrewPolaroid />
            </Link>
          </Box>
        </ExhibitStage>
      </div>

      {/* ============================== MOBILE ============================= */}
      {/* Same mock-scale render as /m (not a reflow) — see components/home-mobile-mock.tsx */}
      <div className="md:hidden">
        <HomeMobileMock />
      </div>
    </main>
  )
}
