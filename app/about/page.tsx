import type { Metadata } from "next"
import Image from "next/image"
import type { CSSProperties, ReactNode } from "react"
import { CrewPolaroid } from "@/components/crew-polaroid"
import { EmailPill } from "@/components/email-pill"
import { ExhibitStage } from "@/components/exhibit-stage"
import { Lattice } from "@/components/lattice"
import { ScaledStage } from "@/components/scaled-stage"
import { SocialPillBar } from "@/components/social-pill-bar"
import {
  aboutBio,
  aboutConsulting,
  aboutLatticeDesktop,
  aboutLatticeMobile,
} from "@/lib/about-data"

export const metadata: Metadata = {
  title: "About",
  description:
    "Ryan Wigley — a product person with fifteen years building things people rely on, now building apps and AI systems from Seattle.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About · Ryan Wigley",
    description:
      "Ryan Wigley — a product person with fifteen years building things people rely on, now building apps and AI systems from Seattle.",
    url: "/about",
  },
}

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": "https://ryanwigley.com/about#profilepage",
  mainEntity: { "@id": "https://ryanwigley.com/#person" },
}

const HEADSHOT = "/art/people/ryan-headshot.jpg"
const HEADSHOT_ALT = "Ryan Wigley, outdoors, smiling."

/**
 * Frame crops. The Figma frames carry their own chrome (rw-logo, nav, theme
 * switcher on desktop; logo + theme row on mobile); the real page gets that
 * from the shared glass Header, so each stage starts below the frame's chrome
 * band. Desktop crops 124 (chrome ends at y=88, the lattice starts at y=120);
 * mobile crops 250 and ends where the frame's own `mobile_buttons` bar starts
 * (y=2068) — the real bar is the shared fixed MobileNavBar.
 */
const DESK_TOP = 124
const MOB_TOP = 250

/** Absolute artboard-coordinate box (shared by the desktop stage and mobile stage). */
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

function ConsultingLine({ className }: { className?: string }) {
  return (
    <p className={`font-body text-muted ${className ?? ""}`}>
      For consulting →{" "}
      <a
        href={aboutConsulting.href}
        target="_blank"
        rel="noreferrer"
        className="underline-offset-4 transition-colors hover:text-accent hover:underline"
      >
        {aboutConsulting.label}
      </a>
    </p>
  )
}

/**
 * The headshot plate. The desktop frame crops a 200×200 window over the photo
 * drawn at 264×264, offset (−32,−39) — a tighter, slightly-low crop than a
 * plain cover fit; `zoom` reproduces it. The mobile frame shows the whole
 * square, so it stays a straight cover fit.
 */
function Headshot({ zoom = false }: { zoom?: boolean }) {
  if (!zoom) {
    return (
      <Image
        src={HEADSHOT}
        alt={HEADSHOT_ALT}
        width={800}
        height={800}
        className="h-full w-full select-none object-cover"
      />
    )
  }
  return (
    <div className="relative h-full w-full overflow-hidden bg-surface">
      <Image
        src={HEADSHOT}
        alt={HEADSHOT_ALT}
        width={800}
        height={800}
        className="absolute select-none"
        style={{ width: 264, height: 264, left: -32, top: -39, maxWidth: "none" }}
      />
    </div>
  )
}

export default function AboutPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      {/* ============================= DESKTOP ============================= */}
      {/* `page · about · desktop · light|dark` (1440×940), cropped 124px so the
          exhibit sits flush beneath the shared glass header. Chrome (logo ·
          nav · theme switcher) is served by that header. */}
      <div className="hidden md:block">
        <ExhibitStage width={1440} height={940 - DESK_TOP}>
          <Lattice marks={aboutLatticeDesktop} />

          {/* kicker + headline */}
          <At x={80} y={168 - DESK_TOP} z={10}>
            <p className="font-mono text-[13px] lowercase tracking-[0.046em] text-accent">
              // about
            </p>
          </At>
          <At x={80} y={205 - DESK_TOP} w={560} z={10}>
            <h1 className="font-display text-[40px] font-black leading-[1.05] tracking-[-1px] text-ink">
              Hey, I&apos;m Ryan.
            </h1>
          </At>

          {/* bio */}
          <At x={80} y={290 - DESK_TOP} w={560} z={10}>
            <p className="whitespace-pre-line font-body text-[18px] leading-[28px] text-muted">
              {aboutBio.join("\n\n")}
            </p>
          </At>

          {/* social bar */}
          <At x={80} y={600 - DESK_TOP} w={430} h={66} z={10}>
            <SocialPillBar />
          </At>

          {/* get in touch */}
          <At x={80} y={760 - DESK_TOP} z={10}>
            <p className="font-mono text-[11px] uppercase tracking-[0.055em] text-accent">
              GET IN TOUCH&nbsp;&nbsp;→
            </p>
          </At>
          <At x={80} y={782 - DESK_TOP} w={360} h={48} z={10}>
            <EmailPill />
          </At>
          <At x={464} y={794 - DESK_TOP} z={10}>
            <ConsultingLine className="text-[14px]" />
          </At>

          {/* headshot + crew (right column) */}
          <At x={1010} y={200 - DESK_TOP} w={200} h={200} z={10}>
            <Headshot zoom />
          </At>
          <At x={933} y={600 - DESK_TOP} w={182} h={153} z={10}>
            <CrewPolaroid />
          </At>

          {/* footer — about swaps the socials row for its location line, since
              the socials live in the pill bar above. Grid coordinate tag
              retired site-wide, see PLAN.md #59; matches the About desktop
              Figma frame (71:2), which carries only the BASED line here. */}
          <At x={80} y={902 - DESK_TOP} z={10}>
            <p className="font-mono text-[11px] uppercase tracking-[0.09em] text-muted">
              BASED · SEATTLE, WA
            </p>
          </At>
        </ExhibitStage>
      </div>

      {/* ============================== MOBILE ============================= */}
      {/* `page · about · mobile · light|dark` (1054×2300) at mock scale. Chrome
          (logo/theme row + bottom bar) is served by the global Header +
          MobileNavBar; this stage carries the exhibit content only. */}
      <div className="md:hidden">
        <ScaledStage width={1054} height={2000 - MOB_TOP}>
          <Lattice marks={aboutLatticeMobile} />

          {/* kicker + headline (canon mobile display: Fraunces Black 48) */}
          <At x={80} y={310 - MOB_TOP} z={10}>
            <p className="font-mono text-[26px] lowercase tracking-[2px] text-accent">
              // about
            </p>
          </At>
          <At x={80} y={356 - MOB_TOP} w={894} z={10}>
            <h1 className="font-display text-[48px] font-black leading-[1.22] text-ink">
              Hey, I&apos;m Ryan.
            </h1>
          </At>

          {/* bio (mobile renders in ink, matching the frames) — bumped from
              Figma's 31/46 for readability (#45), headshot shrunk and
              everything below tightened up to keep the page fitting above
              the mobile nav fold (#52). */}
          <At x={80} y={510 - MOB_TOP} w={894} z={10}>
            <p className="whitespace-pre-line font-body text-[35px] leading-[52px] text-ink">
              {aboutBio.join("\n\n")}
            </p>
          </At>

          {/* headshot (left) + crew polaroid (right) — headshot shrunk
              360×360 (was 440×440) so the row still clears the taller bio */}
          <At x={80} y={1180 - MOB_TOP} w={360} h={360} z={10}>
            <Headshot />
          </At>
          <At x={700} y={1245 - MOB_TOP} w={275} h={231} z={10}>
            <CrewPolaroid />
          </At>

          {/* social bar */}
          <At x={80} y={1610 - MOB_TOP} w={894} h={94} z={10}>
            <SocialPillBar className="rounded-[8px] text-[32px]" />
          </At>

          {/* get in touch */}
          <At x={80} y={1784 - MOB_TOP} z={10}>
            <p className="font-mono text-[24px] uppercase tracking-[6px] text-accent">
              GET IN TOUCH&nbsp;&nbsp;→
            </p>
          </At>
          <At x={80} y={1832 - MOB_TOP} w={496} h={78} z={10}>
            <EmailPill className="text-[28px]" />
          </At>
          <At x={80} y={1936 - MOB_TOP} z={10}>
            <ConsultingLine className="text-[28px]" />
          </At>
        </ScaledStage>

        {/* clearance for the fixed MobileNavBar */}
        <div className="h-24" />
      </div>
    </main>
  )
}
