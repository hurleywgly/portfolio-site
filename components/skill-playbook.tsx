"use client"

import Image from "next/image"
import { useState } from "react"
import { InstallBar } from "@/components/install-bar"
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

/** 28px circle expander: "+" collapsed, "−" expanded. Forest in light, gold in dark. */
function ExpandIcon({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden="true"
      className="relative grid h-7 w-7 shrink-0 place-items-center rounded-full border border-card text-card transition-colors dark:border-accent dark:text-accent"
    >
      <span className="block h-[2px] w-[13px] rounded-full bg-current" />
      {!open && (
        <span className="absolute block h-[13px] w-[2px] rounded-full bg-current" />
      )}
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

/** The feature-image plate: the skill cover, or a captioned empty plate. */
function FeaturePlate({ skill }: { skill: Skill }) {
  return (
    <div className="relative aspect-[464/236] w-full overflow-hidden rounded-[4px] border border-on-card-muted/70 bg-page">
      {skill.cover ? (
        <Image
          src={skill.cover}
          alt={`${skill.name} — feature artwork`}
          fill
          sizes="(max-width: 1280px) 100vw, 460px"
          className="select-none object-cover"
        />
      ) : (
        <span className="absolute inset-x-0 bottom-4 text-center font-mono text-[11px] tracking-[0.06em] text-ink">
          {FEATURE_CAPTION}
        </span>
      )}
    </div>
  )
}

function PairsWith({ slugs }: { slugs: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {slugs.map((s) => (
        <span
          key={s}
          className="border border-on-card-muted/70 px-2.5 py-1 font-mono text-[10px] lowercase tracking-[0.06em] text-on-card"
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
      className="border-x border-b border-card-border/60 bg-card-deep px-6 py-8 lg:px-9"
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_460px] lg:gap-12">
        {/* narrative */}
        <div>
          {d ? (
            <>
              <PanelLabel>use cases</PanelLabel>
              <div className="space-y-5">
                {d.useCases.map((uc) => (
                  <div key={uc.heading}>
                    <h4 className="font-body text-[15px] font-medium leading-snug text-on-card">
                      {uc.heading}
                    </h4>
                    <p className="mt-1 max-w-[560px] font-body text-[14px] leading-relaxed text-on-card-muted">
                      {uc.body}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <PanelLabel>why it matters</PanelLabel>
                <p className="max-w-[560px] font-body text-[14px] leading-relaxed text-on-card-muted">
                  {d.whyItMatters}
                </p>
              </div>

              <div className="mt-8">
                <PanelLabel>how it fits my workflow</PanelLabel>
                <p className="max-w-[560px] font-body text-[14px] leading-relaxed text-on-card-muted">
                  {d.howItFits}
                </p>
              </div>
            </>
          ) : (
            <p className="max-w-[560px] font-body text-[15px] leading-relaxed text-on-card-muted">
              {skill.tagline}
            </p>
          )}
        </div>

        {/* right column */}
        <div className="space-y-6">
          <FeaturePlate skill={skill} />

          {d?.pairsWith?.length ? (
            <div>
              <PanelLabel>pairs with</PanelLabel>
              <PairsWith slugs={d.pairsWith} />
            </div>
          ) : null}

          <div>
            <PanelLabel>install this skill</PanelLabel>
            <InstallBar
              command={installFor(skill.slug)}
              align="center"
              className="rounded-[4px] bg-page p-2 pl-3"
              codeClassName="text-[12px] leading-snug"
              buttonClassName="rounded-[3px] px-4 py-2.5 text-[11px]"
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
    <div className="mb-3">
      <div
        className={cn(
          "flex items-center gap-4 border border-rule bg-surface px-4 py-3.5 transition-colors sm:gap-6 sm:px-6",
          open && "border-b-transparent",
        )}
      >
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex min-w-0 flex-1 items-center gap-4 text-left sm:gap-6"
        >
          <span className="w-[130px] shrink-0 font-display text-[19px] font-semibold leading-none tracking-[-0.01em] text-ink lg:w-[210px]">
            {skill.name}
          </span>
          <span className="hidden min-w-0 flex-1 truncate font-body text-[14px] text-muted sm:block">
            {skill.tagline}
          </span>
          <span className="hidden shrink-0 font-mono text-[10px] lowercase tracking-[0.04em] text-muted xl:block">
            {skill.categories.join(" · ")}
          </span>
        </button>

        <a
          href={SKILLS_GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="hidden shrink-0 font-mono text-[11px] lowercase tracking-[0.03em] text-muted transition-colors hover:text-ink lg:inline-flex"
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

export function SkillPlaybook() {
  const [filter, setFilter] = useState<Filter>("all")
  const [openSlugs, setOpenSlugs] = useState<Set<string>>(
    () => new Set(defaultOpenSlugs),
  )

  const toggle = (slug: string) =>
    setOpenSlugs((prev) => {
      const next = new Set(prev)
      if (next.has(slug)) next.delete(slug)
      else next.add(slug)
      return next
    })

  const filters: Filter[] = ["all", ...skillCategories]
  const visible = skills.filter(
    (s) => filter === "all" || s.categories.includes(filter),
  )

  return (
    <div>
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
