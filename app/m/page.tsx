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
import { Lattice, type LatticeMark } from "@/components/lattice"
import { MethodologyCard } from "@/components/methodology-card"
import { MobileNavBar } from "@/components/mobile-nav-bar"
import { ProjectTile, homeMotifs } from "@/components/project-tile"
import { RwLogo } from "@/components/rw-logo"
import { ZoomableStage } from "@/components/zoomable-stage"
import { ShelfDiorama } from "@/components/shelf-diorama"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { WaveformBanner } from "@/components/waveform-banner"
import { WritingTile } from "@/components/writing-tile"
import { homeChips, homeLatticeMobile, homeTiles } from "@/lib/home-data"

export const metadata: Metadata = {
  title: "Home · mobile mock scale",
  robots: { index: false },
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

/** Absolute artboard-coordinate box. */
function At({
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

/**
 * Renders a component at its natural (desktop) design size, uniformly scaled
 * into an artboard-sized box — so fixed-px internals land at mock proportions.
 */
function AtScaled({
  x,
  y,
  natW,
  natH,
  k,
  z,
  children,
}: {
  x: number
  y: number
  natW: number
  natH: number
  k: number
  z?: number
  children: ReactNode
}) {
  return (
    <div
      className="absolute"
      style={{ left: x, top: y, width: natW * k, height: natH * k, zIndex: z }}
    >
      <div
        style={{
          width: natW,
          height: natH,
          transform: `scale(${k})`,
          transformOrigin: "top left",
        }}
      >
        {children}
      </div>
    </div>
  )
}

/* The real grid-lattice layer from the Figma mobile frame, extracted 1:1. */
const marks: LatticeMark[] = homeLatticeMobile

/**
 * /m — the Figma mobile frame (1054×2360) rendered at mock scale: the whole
 * artboard scales as one object to the viewport width, so every tile, card
 * and label keeps the exact proportion Ryan mocked. Compare against / on a
 * phone; the winner becomes the mobile experience.
 */
export default function HomeMobileMock() {
  return (
    <main className="-mt-[76px] md:-mt-[81px]">
      <ZoomableStage width={1054} height={2360}>
        <Lattice marks={marks} />

        {/* chrome */}
        <At x={104} y={95} w={150} h={150} z={20}>
          <Link
            href="/"
            aria-label="Ryan Wigley — home"
            className="flex h-full w-full items-center justify-center"
          >
            <RwLogo className="text-[94px]" />
          </Link>
        </At>
        <AtScaled x={642} y={113} natW={144} natH={44} k={2.52} z={20}>
          <ThemeSwitcher />
        </AtScaled>

        {/* hero */}
        <At x={77} y={308} w={715} z={10}>
          <h1 className="font-display text-[48px] font-black leading-[1.14] tracking-[-0.015em] text-ink">
            Ryan is building apps &amp; AI systems
          </h1>
        </At>
        <At x={77} y={438} w={585} z={10}>
          <p className="font-body text-[30px] leading-[1.4] text-muted">
            The website is my canvas and kiosk, I hope you like it.
          </p>
        </At>

        {/* flagship banner (natural 292×112 → 400-wide artboard box) */}
        <AtScaled x={74} y={560} natW={292} natH={122} k={1.37} z={10}>
          <WaveformBanner />
        </AtScaled>

        {/* shelf — its own art per theme */}
        <At x={496} y={560} w={556} h={273} z={10}>
          <ShelfDiorama />
        </At>

        {/* work grid: tiles natural 140×128 → 190×172 artboard */}
        {homeTiles.map((tile, i) => (
          <AtScaled
            key={tile.slug}
            x={74 + (i % 2) * 206}
            y={740 + Math.floor(i / 2) * 184}
            natW={140}
            natH={128}
            k={1.35}
            z={10}
          >
            <ProjectTile
              title={tileTitle(tile.title)}
              href={tile.href}
              motif={homeMotifs[tile.slug]}
            />
          </AtScaled>
        ))}

        {/* methodology book */}
        <AtScaled x={620} y={994} natW={205} natH={299} k={1.24} z={10}>
          <MethodologyCard />
        </AtScaled>

        {/* tools kicker */}
        <At x={74} y={1145} z={10}>
          <h2 className="font-display text-[36px] font-black leading-none tracking-[-0.02em] text-ink">
            Tools
          </h2>
        </At>
        <At x={76} y={1196} z={10}>
          <p className="font-mono text-[19px] uppercase tracking-[0.14em] text-accent">
            The Arsenal
          </p>
        </At>

        {/* arsenal — single column, chip natural ~223×73 → 338 artboard */}
        <AtScaled x={74} y={1240} natW={223} natH={310} k={1.51} z={10}>
          <ArsenalChips
            chips={chips}
            className="grid-cols-1 gap-y-[6.5px]"
          />
        </AtScaled>
        <At x={74} y={1734} z={10}>
          <Link
            href="/tools"
            className="font-mono text-[21px] lowercase text-card dark:text-accent"
          >
            browse all my skills&nbsp;&nbsp;→
          </Link>
        </At>

        {/* writing */}
        <AtScaled x={534} y={1504} natW={187} natH={198} k={1.25} z={10}>
          <WritingTile />
        </AtScaled>

        {/* crew — per-theme art */}
        <At x={657} y={1788} w={304} h={255} z={10}>
          <CrewPolaroid />
        </At>
      </ZoomableStage>

      <div className="h-24" />
      <MobileNavBar />
    </main>
  )
}
