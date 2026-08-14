"use client"

import Image from "next/image"
import posthog from "posthog-js"
import { useState } from "react"
import { InstallBar } from "@/components/install-bar"
import {
  readDeepLink,
  scrollDeepLinkIntoView,
  useIsomorphicLayoutEffect,
} from "@/lib/deep-link"
import { cn } from "@/lib/utils"
import {
  FEATURE_CAPTION,
  SKILLS_GITHUB_URL,
  defaultOpenSlugs,
  installFor,
  skillCategories,
  skills,
  type Skill,
  type SkillCategory,
} from "@/lib/tools-data"

type Filter = SkillCategory | "all"

/* ------------------------------------------------------------------ atoms */

/** 28px circle expander: "+" collapsed, "−" expanded. Forest in light, gold in
 *  dark. The whole badge quarter-turns and the vertical stroke rotates flat as
 *  it opens — a small spin from + to − (honors prefers-reduced-motion). */
function ExpandIcon({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative grid h-7 w-7 shrink-0 place-items-center rounded-full border border-card text-card transition-[transform,color] duration-300 ease-out motion-reduce:transition-none dark:border-accent dark:text-accent",
        open && "rotate-90",
      )}
    >
      <span className="block h-[2px] w-[13px] rounded-full bg-current" />
      <span
        className={cn(
          "absolute block h-[13px] w-[2px] rounded-full bg-current transition-transform duration-300 ease-out motion-reduce:transition-none",
          open ? "rotate-90 opacity-0" : "rotate-0 opacity-100",
        )}
      />
    </span>
  )
}

/** In-card section label: lowercase mono + a short accent tick beneath. */
function PanelLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3">
      <span className="font-mono text-[11px] lowercase tracking-[0.08em] text-on-card-muted">
        {children}
      </span>
      <span className="mt-1.5 block h-[2px] w-[22px] bg-diagram dark:bg-accent" />
    </div>
  )
}

/**
 * The feature-image plate: the skill cover, or a captioned empty plate.
 * Taller than the Figma frame (aspect-[464/236] → 464/300) and the same ratio
 * for every skill so heights stay standardized across the list — Ryan
 * approved this divergence explicitly (#43).
 *
 * `sizes` reflects the plate's real rendered width: full panel width (minus
 * the panel's own padding) below `lg`, a fixed 464px column at `lg`+. Image
 * optimization IS enabled (PLAN.md #42 removed `images.unoptimized: true`),
 * so this `sizes` hint drives a real responsive srcset. The remaining limit
 * is source resolution, not delivery: 14 of 17 covers are 611×384 rendering
 * at ~462×298 (~1.3× density), so they still soften at 2×/3× DPR — fixing
 * that needs regenerated art at ~924×600, see PLAN.md #65.
 */
function FeaturePlate({ skill }: { skill: Skill }) {
  return (
    <div className="relative aspect-[464/300] w-full overflow-hidden rounded-[4px] border border-on-card-muted bg-page">
      {skill.cover ? (
        <Image
          src={skill.cover}
          alt={`${skill.name} — feature artwork`}
          fill
          sizes="(max-width: 1023px) calc(100vw - 48px), 464px"
          quality={90}
          className="select-none object-cover"
        />
      ) : (
        <span className="absolute bottom-4 left-3.5 font-mono text-[11px] tracking-[0.02em] text-ink">
          {FEATURE_CAPTION}
        </span>
      )}
    </div>
  )
}

function PairsWith({ slugs }: { slugs: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {slugs.map((s) => (
        <span
          key={s}
          className="border border-on-card-muted px-3 py-[7px] font-mono text-[2.9vw] lowercase tracking-[0.06em] text-on-card md:text-[10px]"
        >
          {s}
        </span>
      ))}
    </div>
  )
}

/* ----------------------------------------------------------------- panel */

function SkillPanel({ skill }: { skill: Skill }) {
  const d = skill.detail
  return (
    <div
      id={`skill-panel-${skill.slug}`}
      className="bg-card-deep px-6 pb-8 pt-6 lg:px-9 lg:pb-9 lg:pr-20"
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,660px)_464px] lg:gap-10">
        {/* narrative */}
        <div>
          {d ? (
            <>
              <PanelLabel>use cases</PanelLabel>
              <div className="space-y-6">
                {d.useCases.map((uc) => (
                  <div key={uc.heading}>
                    <h4 className="font-body text-[15px] font-semibold leading-tight text-on-card">
                      {uc.heading}
                    </h4>
                    <p className="mt-1.5 font-body text-[14px] leading-[20px] text-on-card-muted">
                      {uc.body}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-9">
                <PanelLabel>why it matters</PanelLabel>
                <p className="font-body text-[14px] leading-[20px] text-on-card">
                  {d.whyItMatters}
                </p>
              </div>

              <div className="mt-9">
                <PanelLabel>how it fits my workflow</PanelLabel>
                <p className="font-body text-[14px] leading-[20px] text-on-card">
                  {d.howItFits}
                </p>
              </div>
            </>
          ) : (
            <p className="max-w-[560px] font-body text-[15px] leading-[22px] text-on-card">
              {skill.tagline}
            </p>
          )}
        </div>

        {/* right column */}
        <div>
          <FeaturePlate skill={skill} />

          {d?.pairsWith?.length ? (
            <div className="mt-7">
              <PanelLabel>pairs with</PanelLabel>
              <PairsWith slugs={d.pairsWith} />
            </div>
          ) : null}

          <div className="mt-7">
            <PanelLabel>install this skill</PanelLabel>
            {/* Mobile text tracks the same artboard-derived vw as the row
                typography below (Figma's expanded-panel install code/button
                are both 18/1054, #66) so it can't out-rank the h1; md:
                restores today's real-px desktop size unchanged. */}
            <InstallBar
              command={installFor(skill.slug)}
              align="center"
              className="min-h-[64px] bg-page pl-3.5"
              codeClassName="text-[2.9vw] leading-[18px] md:text-[12px]"
              buttonClassName="h-[46px] w-[72px] text-[2.9vw] md:text-[11px]"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------- row */

function SkillRow({
  skill,
  open,
  onToggle,
}: {
  skill: Skill
  open: boolean
  onToggle: () => void
}) {
  const panelId = `skill-panel-${skill.slug}`
  return (
    // `scroll-mt-*` clears the sticky desktop header when a deep link from the
    // home arsenal scrolls this row to the top of the page.
    <div id={`skill-row-${skill.slug}`} className="mb-3 scroll-mt-4 md:scroll-mt-24">
      <div
        className={cn(
          "flex min-h-[72px] items-center gap-4 border border-rule bg-surface px-4 py-3.5 transition-colors sm:gap-6 sm:px-6 lg:px-9 lg:pr-4",
          open && "border-b-transparent",
        )}
      >
        {/* h3: one level below the sr-only "Skills" h2 in SkillPlaybook, one
            level above the use-case h4s inside SkillPanel (#62 — the page
            previously jumped h1 straight to h4). `contents` keeps the button
            as the actual flex item so this is purely a semantic wrapper —
            zero visual/layout change, per the WAI-ARIA accordion pattern of
            a heading wrapping its toggle button. */}
        {/* Mobile name/tagline/category are expressed in the same
            artboard-px/1054 vw convention as the hero above, pulled directly
            from the Figma mobile playbook frame (1006:99: row name 25px,
            tagline 20px — 25/1054=2.372vw, 20/1054=1.898vw; category has no
            mobile equivalent in the frame, scaled proportionally). This was
            the actual #66 regression: real-19px name rendered bigger than
            the ~17px mock-scale-equivalent h1. md: restores today's real-px
            desktop sizes unchanged. */}
        <h3 className="contents">
          <button
            type="button"
            onClick={onToggle}
            data-attr={`skill-toggle-${skill.slug}`}
            aria-expanded={open}
            aria-controls={panelId}
            className="flex min-w-0 flex-1 flex-col gap-1 text-left sm:flex-row sm:items-center sm:gap-4 lg:gap-6"
          >
            <span className="shrink-0 font-display text-[3.6vw] font-semibold leading-none tracking-[-0.01em] text-ink sm:w-[130px] md:text-[19px] lg:w-[232px]">
              {skill.name}
            </span>
            <span className="min-w-0 flex-1 font-body text-[3.2vw] leading-snug text-muted sm:truncate md:text-[14px]">
              {skill.tagline}
            </span>
            <span className="hidden w-[226px] shrink-0 font-mono text-[2.9vw] lowercase tracking-[0.03em] text-muted md:text-[10px] xl:block">
              {skill.categories.join(" · ")}
            </span>
          </button>
        </h3>

        <a
          href={SKILLS_GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="hidden shrink-0 font-mono text-[11px] lowercase tracking-[0.02em] text-muted transition-colors hover:text-accent lg:mr-10 lg:inline-flex"
        >
          github&nbsp;↗
        </a>

        <button
          type="button"
          onClick={onToggle}
          tabIndex={-1}
          aria-hidden="true"
          className="shrink-0"
        >
          <ExpandIcon open={open} />
        </button>
      </div>

      {open && <SkillPanel skill={skill} />}
    </div>
  )
}

/* -------------------------------------------------------------- playbook */

/** Below Tailwind's `md` breakpoint (768px) — the same mobile/desktop split
 *  used everywhere else on this page (hero kicker/h1/intro, row typography). */
const MOBILE_QUERY = "(max-width: 767px)"

export function SkillPlaybook() {
  const [filter, setFilter] = useState<Filter>("all")
  const [openSlugs, setOpenSlugs] = useState<Set<string>>(
    () => new Set(defaultOpenSlugs),
  )

  // Two post-mount passes, in priority order:
  //
  // 1. A deep link (`/tools?skill=capsule`, from a home arsenal chip) wins
  //    outright: that skill — and ONLY that skill — is expanded, and its row is
  //    scrolled to the top of the page. Collapsing the defaults matters as much
  //    as the scroll does; leaving three other panels open above/below turns
  //    the requested skill into one card in a wall of them.
  // 2. Otherwise: Figma's mobile playbook frame (1006:99) shows exactly ONE
  //    expanded exemplar (/research); the desktop frame shows three, and
  //    DESIGN.md's hygiene.mobile-deltas already documents "1 expanded skill on
  //    mobile playbook vs 3 desktop" as canon (#67 — live shipped 3 open on
  //    mobile, a ~5,983px-tall initial page).
  //
  // Both server render and the first client render use the same desktop-default
  // set (SSR-safe, no hydration mismatch); only after mount do we read the URL
  // and the real viewport.
  useIsomorphicLayoutEffect(() => {
    const wanted = readDeepLink("skill")
    if (wanted && skills.some((s) => s.slug === wanted)) {
      setOpenSlugs(new Set([wanted]))
      scrollDeepLinkIntoView(`skill-row-${wanted}`)
      return
    }
    if (window.matchMedia(MOBILE_QUERY).matches && defaultOpenSlugs.length > 0) {
      setOpenSlugs(new Set([defaultOpenSlugs[0]]))
    }
  }, [])

  const toggle = (slug: string) => {
    if (!openSlugs.has(slug)) {
      posthog.capture("skill_expanded", { skill: slug })
    }
    setOpenSlugs((prev) => {
      const next = new Set(prev)
      if (next.has(slug)) next.delete(slug)
      else next.add(slug)
      return next
    })
  }

  const filters: Filter[] = ["all", ...skillCategories]
  const visible = skills.filter(
    (s) => filter === "all" || s.categories.includes(filter),
  )

  return (
    <div>
      {/* Visually-hidden section heading — establishes h1 → h2 → h3 (row
          name) → h4 (use-case heading) with no level skip (#62). Filter
          chips + the accordion list have no visible heading of their own in
          the design, so this is sr-only rather than a new visible label. */}
      <h2 className="sr-only">Skills</h2>

      {/* filter chips */}
      <div className="mt-10 flex flex-wrap gap-2">
        {filters.map((f) => {
          const active = filter === f
          return (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={active}
              className={cn(
                "rounded-[4px] border px-3 py-1.5 font-mono text-[11px] lowercase tracking-[0.03em] transition-colors",
                active
                  ? "border-transparent bg-card text-on-card"
                  : "border-rule text-muted hover:border-diagram hover:text-ink",
              )}
            >
              {f}
            </button>
          )
        })}
      </div>

      <p className="mb-6 mt-9 font-mono text-[13px] lowercase tracking-[0.06em] text-muted">
        // click any skill to expand
      </p>

      {/* accordion list */}
      <div>
        {visible.map((skill) => (
          <SkillRow
            key={skill.slug}
            skill={skill}
            open={openSlugs.has(skill.slug)}
            onToggle={() => toggle(skill.slug)}
          />
        ))}
      </div>
    </div>
  )
}
