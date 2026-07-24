import type { Metadata } from "next"
import Image from "next/image"
import type { CSSProperties, ReactNode } from "react"
import { CrewPolaroid } from "@/components/crew-polaroid"
import { EmailPill } from "@/components/email-pill"
import { ExhibitStage } from "@/components/exhibit-stage"
import { GridFooterTag } from "@/components/grid-footer-tag"
import { Lattice } from "@/components/lattice"
import { ScaledStage } from "@/components/scaled-stage"
import { SocialPillBar } from "@/components/social-pill-bar"
import { aboutBio, aboutLatticeDesktop, aboutLatticeMobile } from "@/lib/about-data"

export const metadata: Metadata = {
  title: "About · Ryan Wigley",
  description:
    "A product person with fifteen years of building things people rely on — now building apps and AI systems.",
}

const HEADSHOT = "/art/people/ryan-headshot.jpg"
const HEADSHOT_ALT = "Ryan Wigley, outdoors, smiling."

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
        href="https://productonics.com"
        target="_blank"
        rel="noreferrer"
        className="underline-offset-4 transition-colors hover:text-accent hover:underline"
      >
        productonics.com
      </a>
    </p>
  )
}

export default function AboutPage() {
  return (
    <main>
      {/* ============================= DESKTOP ============================= */}
      {/* Chrome (logo · nav · theme) is served by the global sticky Header;
          this stage carries the exhibit content, cropped 124px so it sits
          flush beneath the header. */}
      <div className="hidden md:block">
        <ExhibitStage width={1440} height={816}>
          <Lattice marks={aboutLatticeDesktop} />

          {/* kicker + headline */}
          <At x={80} y={44} z={10}>
            <p className="font-mono text-[13px] lowercase tracking-[0.05em] text-accent">
              // about
            </p>
          </At>
          <At x={80} y={72} w={560} z={10}>
            <h1 className="font-display text-[58px] font-black leading-[1.05] tracking-[-1px] text-ink">
              Hey, I&apos;m Ryan.
            </h1>
          </At>

          {/* bio */}
          <At x={80} y={166} w={560} z={10}>
            <p className="whitespace-pre-line font-body text-[18px] leading-[28px] text-muted">
              {aboutBio.join("\n\n")}
            </p>
          </At>

          {/* social bar */}
          <At x={80} y={476} w={430} h={66} z={10}>
            <SocialPillBar />
          </At>

          {/* get in touch */}
          <At x={80} y={636} z={10}>
            <p className="font-mono text-[11px] uppercase tracking-[0.06em] text-accent">
              GET IN TOUCH&nbsp;&nbsp;→
            </p>
          </At>
          <At x={80} y={658} w={360} h={48} z={10}>
            <EmailPill />
          </At>
          <At x={464} y={672} z={10}>
            <ConsultingLine className="text-[14px]" />
          </At>

          {/* headshot + crew (right column) */}
          <At x={1010} y={76} w={200} h={200} z={10}>
            <Image
              src={HEADSHOT}
              alt={HEADSHOT_ALT}
              width={400}
              height={400}
              className="h-full w-full select-none object-cover"
            />
          </At>
          <At x={933} y={476} w={182} h={153} z={10}>
            <CrewPolaroid />
          </At>

          {/* footer */}
          <At x={80} y={780} z={10}>
            <p className="font-mono text-[11px] uppercase tracking-[0.09em] text-muted">
              BASED · SEATTLE, WA
            </p>
          </At>
          <At x={1144} y={780} z={10}>
            <GridFooterTag grid="01" page="ABOUT" />
          </At>
        </ExhibitStage>
      </div>

      {/* ============================== MOBILE ============================= */}
      {/* Chrome (logo/theme row + bottom nav bar) is served by the global
          Header + MobileNavBar; this stage renders the exhibit content of the
          `page · about · mobile` frame, cropped 250px beneath the header. */}
      <div className="md:hidden">
        <ScaledStage width={1054} height={1820}>
          <Lattice marks={aboutLatticeMobile} />

          {/* kicker + headline */}
          <At x={80} y={60} z={10}>
            <p className="font-mono text-[26px] lowercase tracking-[0.04em] text-accent">
              // about
            </p>
          </At>
          <At x={80} y={106} w={900} z={10}>
            <h1 className="font-display text-[96px] font-black leading-[1.02] tracking-[-1px] text-ink">
              Hey, I&apos;m Ryan.
            </h1>
          </At>

          {/* bio (mobile renders in ink, matching the frame) */}
          <At x={80} y={260} w={894} z={10}>
            <p className="whitespace-pre-line font-body text-[31px] leading-[46px] text-ink">
              {aboutBio.join("\n\n")}
            </p>
          </At>

          {/* headshot (left) + crew polaroid (right) */}
          <At x={80} y={826} w={440} h={440} z={10}>
            <Image
              src={HEADSHOT}
              alt={HEADSHOT_ALT}
              width={440}
              height={440}
              className="h-full w-full select-none object-cover"
            />
          </At>
          <At x={700} y={931} w={275} h={231} z={10}>
            <CrewPolaroid />
          </At>

          {/* social bar */}
          <At x={80} y={1386} w={894} h={94} z={10}>
            <SocialPillBar className="rounded-[12px] px-[5%] text-[30px]" />
          </At>

          {/* get in touch */}
          <At x={80} y={1560} z={10}>
            <p className="font-mono text-[24px] uppercase tracking-[0.06em] text-accent">
              GET IN TOUCH&nbsp;&nbsp;→
            </p>
          </At>
          <At x={80} y={1608} w={496} h={78} z={10}>
            <EmailPill className="text-[28px]" />
          </At>
          <At x={80} y={1716} z={10}>
            <ConsultingLine className="text-[28px]" />
          </At>

          {/* footer (mobile: location only, no GRID tag) */}
          <At x={80} y={1770} z={10}>
            <p className="font-mono text-[24px] uppercase tracking-[0.06em] text-muted">
              BASED · SEATTLE, WA
            </p>
          </At>
        </ScaledStage>

        {/* clearance for the fixed MobileNavBar */}
        <div className="h-24" />
      </div>
    </main>
  )
}
