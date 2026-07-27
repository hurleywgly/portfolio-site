import type { Metadata } from "next"
import { ProjectsShowcase } from "@/components/projects-showcase"

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A working shelf of shipped tools and live systems by Ryan Wigley — plus Waveform, the flagship still in build.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects · Ryan Wigley",
    description:
      "A working shelf of shipped tools and live systems by Ryan Wigley — plus Waveform, the flagship still in build.",
    url: "/projects",
  },
}

export default function ProjectsPage() {
  return (
    <div className="flex min-h-[calc(100svh-5rem)] flex-col">
      <main className="exhibit-shell relative flex-1 pt-10 md:pt-16">
        <ProjectsLatticeDecor />

        {/* hero */}
        <header className="relative">
          {/* Mobile type is expressed in vw so it tracks the SAME effective
              size as the mock-scale pages (/, /about, /methodology), which
              render the 1054-wide artboard scaled to the viewport. Figma sets
              every mobile hero at Fraunces Black 48 on that artboard, so the
              match is 48/1054 = 4.554vw (≈17.1px @375, ≈19.6px @430) — exactly
              what /about measures. Kicker 26/1054, body 35/1054, same source. */}
          <p className="font-mono text-[2.467vw] lowercase tracking-[0.04em] text-accent md:text-[13px]">
            // current projects
          </p>
          <h1 className="mt-4 max-w-[18ch] font-display text-[4.554vw] font-black leading-[1.22] tracking-[-0.02em] text-ink md:text-[34px] md:leading-[1.05]">
            Always tinkering.
          </h1>
          <p className="mt-6 max-w-[48ch] font-body text-[3.321vw] leading-[1.5] text-muted md:text-[17px] md:leading-[1.55]">
            I like building with my hands (and my keyboard) and exploring new
            ways of problem solving.
          </p>
        </header>

        {/* showcase */}
        <section className="relative mt-14 md:mt-20">
          <ProjectsShowcase />
        </section>
      </main>

      <ProjectsFooter />
    </div>
  )
}

/** Sparse architectural lattice in the open space around the hero — desktop
 *  only, clear of all text. Rules + one L-bracket + hollow square + junction
 *  dots; a single gold terminal dot. Anchored to the content box edges. */
function ProjectsLatticeDecor() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden md:block"
    >
      {/* top-right L-bracket with a gold terminal dot */}
      <span className="absolute right-[46px] top-[72px] h-[152px] w-[150px] border-r border-t border-rule dark:border-lattice-mid" />
      <span className="absolute right-[43px] top-[69px] h-[7px] w-[7px] rounded-full bg-accent" />
      {/* hollow square at the bracket's far end */}
      <span className="absolute right-[190px] top-[218px] h-[10px] w-[10px] border-[1.5px] border-diagram dark:border-lattice-mid" />
      {/* short junction rule + dot, upper-mid gap */}
      <span className="absolute right-[300px] top-[150px] h-px w-[96px] bg-rule dark:bg-lattice-mid" />
      <span className="absolute right-[300px] top-[147px] h-[7px] w-[7px] rounded-full bg-diagram dark:bg-lattice-mid" />
      {/* left-gutter vertical rule + dot */}
      <span className="absolute left-[10px] top-[286px] h-[150px] w-px bg-rule dark:bg-lattice-mid" />
      <span className="absolute left-[7px] top-[430px] h-[7px] w-[7px] rounded-full bg-diagram dark:bg-lattice-mid" />
    </div>
  )
}

/** Page footer — socials row. Mirrors the shared Footer's styling (the grid
 *  coordinate tag was retired site-wide, see PLAN.md #59). */
function ProjectsFooter() {
  return (
    <footer className="mb-24 border-t border-rule md:mb-0">
      <div className="exhibit-shell flex flex-col gap-5 py-8 font-mono text-[11px] uppercase tracking-[0.14em] text-muted sm:flex-row sm:items-center sm:justify-between">
        <p className="flex flex-wrap gap-x-2 gap-y-1">
          <a href="https://x.com/rywigs">X</a>
          <span aria-hidden="true">·</span>
          <a href="https://github.com/hurleywgly">GITHUB</a>
          <span aria-hidden="true">·</span>
          <a href="https://www.linkedin.com/in/rywigs/">LINKEDIN</a>
          <span aria-hidden="true">·</span>
          <a href="mailto:ryan.wigley522@gmail.com">EMAIL</a>
        </p>
      </div>
    </footer>
  )
}
