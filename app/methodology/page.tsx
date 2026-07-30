import type { Metadata } from "next"
import { OG_IMAGE } from "@/lib/site"
import Link from "next/link"
import type { CSSProperties, ReactNode } from "react"
import { ExhibitStage } from "@/components/exhibit-stage"
import { Lattice, type LatticeMark } from "@/components/lattice"
import { ArcTimeline } from "@/components/methodology-arc-timeline"
import { GlanceCard } from "@/components/methodology-glance-card"
import { ScaledStage } from "@/components/scaled-stage"
import {
  glanceCards,
  methodologyArcSummary,
  methodologyDiagram,
  methodologyIntro,
  methodologyLocalCopies,
  mobileArc,
  mobileGlance,
} from "@/lib/methodology-data"

export const metadata: Metadata = {
  title: "Methodology",
  description:
    "Models change, but the system holds. Inside Ryan Wigley's personal operating system for AI — home, work, and family run as one system.",
  alternates: { canonical: "/methodology" },
  openGraph: {
    title: "Methodology · Ryan Wigley",
    description:
      "Models change, but the system holds. Inside Ryan Wigley's personal operating system for AI — home, work, and family run as one system.",
    url: "/methodology",
    images: OG_IMAGE,
  },
}

/**
 * Frame crops. The Figma frames carry their own chrome (rw-logo, nav, theme
 * switcher on desktop; logo + theme row on mobile); the real page gets that
 * from the shared glass Header, so each stage starts below the frame's chrome
 * band. Desktop crops 88 (chrome ends at y=88, the top-right lattice bracket
 * starts at y=120 and must survive); mobile crops 250, matching /about.
 * Desktop content box sits at 160..1280 (not the frame's 80..1360) so the
 * margins match the exhibit-shell pages, same as /about — Ryan 2026-07-29;
 * ArcTimeline is scaled to the 1120 box, glance cards 400→360.
 */
const DESK_TOP = 88
const MOB_TOP = 250

/** Desktop diagram lattice, shifted out of the cropped chrome band. */
const desktopLattice: LatticeMark[] = methodologyDiagram.map(
  (m) => ({ ...m, y: m.y - DESK_TOP }) as LatticeMark,
)

/** Absolute artboard-coordinate box (shared by both stages). */
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

/** "see how it runs →" — the one link out of the methodology exhibit, into the
 *  skill playbook. Forest in light, gold in dark (the one-link-per-cluster
 *  accent dose). */
function SeeHowItRuns({ className }: { className?: string }) {
  return (
    <Link
      href="/tools"
      className={`font-body font-medium text-card transition-colors hover:text-accent dark:text-accent ${className ?? ""}`}
    >
      see how it runs →
    </Link>
  )
}

/** Footer socials, left of the grid tag. Mirrors the projects-page footer. */
function FooterSocials() {
  return (
    <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
      <a href="https://x.com/rywigs" className="hover:text-accent">
        X
      </a>
      <span aria-hidden="true">·</span>
      <a href="https://github.com/hurleywgly" className="hover:text-accent">
        GITHUB
      </a>
      <span aria-hidden="true">·</span>
      <a
        href="https://www.linkedin.com/in/rywigs/"
        className="hover:text-accent"
      >
        LINKEDIN
      </a>
      <span aria-hidden="true">·</span>
      <a href="mailto:ryan.wigley522@gmail.com" className="hover:text-accent">
        EMAIL
      </a>
    </p>
  )
}

export default function MethodologyPage() {
  return (
    <main>
      {/* ============================= DESKTOP ============================= */}
      {/* `page · methodology · desktop · light|dark` (1440×1500), cropped 88px
          so the exhibit sits flush beneath the shared glass header. */}
      <div className="hidden md:block">
        <ExhibitStage width={1440} height={1412}>
          <Lattice marks={desktopLattice} />

          {/* kicker + headline */}
          <At x={160} y={92} z={10}>
            <p className="font-mono text-[16px] lowercase tracking-[0.03em] text-accent">
              // methodology
            </p>
          </At>
          <At x={158} y={122} w={700} z={10}>
            <h1 className="font-display text-[40px] font-black leading-[1.2] text-ink">
              Models change,
              <br />
              but the system holds.
            </h1>
          </At>

          {/* intro */}
          <At x={160} y={264} w={780} z={10}>
            <p className="font-body text-[14px] leading-[29px] text-ink">
              {methodologyIntro}
            </p>
          </At>

          {/* ————— THE ARC ————— */}
          <At x={160} y={378} z={10}>
            <p className="font-mono text-[13px] tracking-[0.077em] text-muted">
              THE ARC · home → work → family · one system →
            </p>
          </At>
          <At x={160} y={402} w={1120} h={140} z={10}>
            <ArcTimeline />
          </At>
          <At x={160} y={592} w={720} z={10}>
            <p className="font-body text-[14px] leading-[18px] text-muted">
              {methodologyArcSummary}
            </p>
          </At>

          {/* ————— AT A GLANCE ————— */}
          <At x={160} y={712} z={10}>
            <p className="font-mono text-[14px] uppercase tracking-[0.071em] text-muted">
              AT A GLANCE
            </p>
          </At>
          {glanceCards.map((card, i) => (
            <At
              key={card.label}
              x={160 + i * 380}
              y={752}
              w={360}
              h={240}
              z={10}
            >
              <GlanceCard {...card} />
            </At>
          ))}

          {/* closing line + the one link out */}
          <At x={160} y={1072} w={520} z={10}>
            <p className="font-body text-[15px] leading-[20px] text-ink">
              {methodologyLocalCopies}
            </p>
          </At>
          <At x={160} y={1122} z={10}>
            <SeeHowItRuns className="text-[13px]" />
          </At>

          {/* footer — grid coordinate tag retired site-wide, see PLAN.md #59 */}
          <span
            className="absolute left-[160px] top-[1332px] h-px w-[1120px] bg-rule"
            aria-hidden="true"
          />
          <div className="absolute left-[160px] right-[160px] top-[1355px] z-10 flex items-center justify-between">
            <FooterSocials />
          </div>
        </ExhibitStage>
      </div>

      {/* ============================== MOBILE ============================= */}
      {/* `page · methodology · mobile · light|dark` (1054×1600) at mock scale,
          cropped 250px under the header and ending where the frame's own
          `mobile_buttons` bar starts (y=1368) — the real bar is the shared
          fixed MobileNavBar. */}
      <div className="md:hidden">
        <ScaledStage width={1054} height={1118}>
          {/* kicker + headline */}
          <At x={80} y={90} z={10}>
            <p className="font-mono text-[28px] lowercase text-accent">
              // methodology
            </p>
          </At>
          <At x={80} y={146} w={940} z={10}>
            <h1 className="font-display text-[48px] font-black leading-[1.22] text-ink">
              Models change, but the system holds.
            </h1>
          </At>

          {/* intro */}
          <At x={80} y={448} w={894} z={10}>
            <p className="font-body text-[26px] leading-[34px] text-ink">
              {methodologyIntro}
            </p>
          </At>

          {/* THE ARC — compact mono rows; ONE SYSTEM goes gold */}
          {mobileArc.map((row, i) => (
            <At key={row.text} x={80} y={602 + i * 44} w={894} z={10}>
              <p
                className={`font-mono text-[22px] ${row.gold ? "text-accent" : "text-muted"}`}
              >
                {row.text}
              </p>
            </At>
          ))}

          {/* AT A GLANCE — statement lines */}
          {mobileGlance.map((line, i) => (
            <At key={line} x={80} y={778 + i * 44} w={894} z={10}>
              <p className="font-body text-[20px] font-medium leading-[26px] text-ink">
                {line}
              </p>
            </At>
          ))}

          {/* closing line + the one link out */}
          <At x={80} y={910} w={894} z={10}>
            <p className="font-body text-[24px] leading-[31px] text-ink">
              {methodologyLocalCopies}
            </p>
          </At>
          <At x={80} y={959} z={10}>
            <SeeHowItRuns className="text-[26px] text-accent dark:text-accent" />
          </At>
        </ScaledStage>

        {/* clearance for the fixed MobileNavBar */}
        <div className="h-24" />
      </div>
    </main>
  )
}
