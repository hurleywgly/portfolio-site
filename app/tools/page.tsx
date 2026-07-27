import type { Metadata } from "next"
import { Footer } from "@/components/footer"
import { InstallBar } from "@/components/install-bar"
import { SkillPlaybook } from "@/components/skill-playbook"
import { INSTALL_ALL, playbookHero } from "@/lib/tools-data"

export const metadata: Metadata = {
  title: "Tools",
  description:
    "The reusable skills and tools behind Ryan Wigley's work — the commands he reaches for on nearly every project. Each one is installable.",
  alternates: { canonical: "/tools" },
  openGraph: {
    title: "Tools · Ryan Wigley",
    description:
      "The reusable skills and tools behind Ryan Wigley's work — the commands he reaches for on nearly every project. Each one is installable.",
    url: "/tools",
  },
}

export default function ToolsPage() {
  return (
    <div className="flex min-h-[calc(100svh-5rem)] flex-col">
      <main className="exhibit-shell relative flex-1 pt-10 md:pt-16">
        <ToolsLatticeDecor />

        {/* hero */}
        <header className="relative">
          {/* kicker is gold, matching /about and /methodology (canon: kickers
              are '// lowercase mono' in accent) */}
          <p className="font-mono text-[2.467vw] lowercase tracking-[0.04em] text-accent md:text-[13px]">
            {playbookHero.kicker}
          </p>
          {/* mobile heading uses the same 48/1054 vw ratio as every other page
              so the effective size matches the mock-scale pages */}
          <h1 className="mt-4 max-w-[22ch] font-display text-[4.554vw] font-black leading-[1.22] tracking-[-0.02em] text-ink md:text-[34px] md:leading-[1.05]">
            {playbookHero.title}
          </h1>
          <p className="mt-6 max-w-[58ch] font-body text-[18px] leading-[1.5] text-muted md:text-[20px]">
            {playbookHero.intro}
          </p>

          {/* install everything, or grab one skill below */}
          <div className="mt-8 flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-6">
            <InstallBar
              command={INSTALL_ALL}
              className="min-h-[58px] w-full max-w-[732px] rounded-[6px] border border-rule bg-surface pl-5 dark:border-lattice-mid"
              codeClassName="text-[14px] leading-[20px]"
              buttonClassName="h-[58px] w-[92px] rounded-r-[5px] text-[13px]"
            />
            <p className="font-mono text-[13px] lowercase tracking-[0.02em] text-muted">
              {playbookHero.installHint}
            </p>
          </div>
        </header>

        {/* playbook */}
        <section className="relative">
          <SkillPlaybook />
        </section>
      </main>

      <Footer />
    </div>
  )
}

/** Sparse architectural lattice in the open space around the hero — desktop
 *  only, clear of all text. Mirrors the projects page: rules + L-bracket +
 *  hollow square + junction dots, one gold terminal dot. */
function ToolsLatticeDecor() {
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
    </div>
  )
}
