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
import { RwLogo } from "@/components/rw-logo"
import { ShelfDiorama } from "@/components/shelf-diorama"
import { SiteNav } from "@/components/site-nav"
import { ThemeSwitcher } from "@/components/theme-switcher"
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

export default function Home() {
  return (
    <main className="-mt-[76px] md:-mt-[81px]">
      {/* ============================= DESKTOP ============================= */}
      <div className="hidden md:block">
        <ExhibitStage width={1440} height={1024}>
          {/* lattice sits behind everything */}
          <Lattice marks={homeLatticeDesktop} />

          {/* chrome */}
          <Box x={73} y={42} w={48} h={48} z={20}>
            <Link
              href="/"
              aria-label="Ryan Wigley — home"
              className="flex h-full w-full items-center justify-center"
            >
              <RwLogo className="text-[30px]" />
            </Link>
          </Box>
          <Box x={697} y={49} z={20}>
            <SiteNav />
          </Box>
          <Box x={1253} y={44} z={20}>
            <ThemeSwitcher />
          </Box>

          {/* hero */}
          <Box x={80} y={138} w={440} z={10}>
            <h1 className="font-display text-[40px] font-black leading-[1.06] tracking-[-0.015em] text-ink">
              Ryan is building apps &amp; AI systems
            </h1>
          </Box>
          <Box x={80} y={248} w={447} z={10}>
            <p className="font-body text-[17px] leading-[1.5] text-muted">
              The website is my canvas and kiosk, I hope you like it.
            </p>
          </Box>

          {/* personality diorama — links to /about (the shelf and the crew are
              the two "who is this person" objects on the front door) */}
          <Box x={629} y={148} w={350} h={171} z={10}>
            <Link href="/about" aria-label="About Ryan" className="block h-full w-full">
              <ShelfDiorama />
            </Link>
          </Box>

          {/* flagship + work grid */}
          <Box x={141} y={319} w={292} h={112} z={10}>
            <WaveformBanner />
          </Box>
          {homeTiles.map((tile, i) => (
            <Box
              key={tile.slug}
              x={141 + (i % 2) * 152}
              y={491 + Math.floor(i / 2) * 140}
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
          <Box x={590} y={369} w={205} h={299} z={10}>
            <MethodologyCard />
          </Box>
          <Box x={1170} y={229} w={187} h={198} z={10}>
            <WritingTile />
          </Box>

          {/* arsenal */}
          <Box x={610} y={696} z={10}>
            <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-accent">
              Tools · The Arsenal
            </p>
          </Box>
          <Box x={610} y={724} w={453} h={152} z={10}>
            <ArsenalChips
              chips={chips}
              className="h-full grid-flow-col grid-rows-2 gap-x-[7px] gap-y-[6.6px]"
            />
          </Box>
          <Box x={610} y={888} z={10}>
            <Link
              href="/tools"
              className="font-mono text-[13px] lowercase text-card transition-colors hover:text-accent dark:text-accent"
            >
              browse all my skills&nbsp;&nbsp;→
            </Link>
          </Box>

          {/* crew — also links to /about */}
          <Box x={1175} y={579} w={181} h={152} z={10}>
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
