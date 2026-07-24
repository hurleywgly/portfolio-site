"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { projectsData, type ProjectEntry } from "@/lib/projects-data"
import { cn } from "@/lib/utils"

/**
 * The selected-state projects showcase: a list of six rows on one side and a
 * featured media plate on the other. Hovering (desktop) or tapping (mobile) a
 * row selects it — the plate swaps to that project's cover, tag, and build
 * link. All six covers are stacked and cross-faded so preview is instant.
 *
 * Layout: single column on mobile (plate → hint → list); two columns on
 * desktop (list left, sticky plate right). The global Header + MobileNavBar
 * supply page chrome, so this renders content only.
 */
export function ProjectsShowcase() {
  const [activeSlug, setActiveSlug] = useState(projectsData[0].slug)
  const active =
    projectsData.find((p) => p.slug === activeSlug) ?? projectsData[0]

  return (
    <div className="flex flex-col gap-9 lg:flex-row lg:items-start lg:gap-12">
      <FeaturedPanel active={active} />

      <div className="lg:order-1 lg:w-[44%] lg:max-w-[520px]">
        <p className="mb-3 text-right font-mono text-[12px] lowercase tracking-[0.02em] text-muted">
          <span className="lg:hidden">tap a project to preview&nbsp;&nbsp;→</span>
          <span className="hidden lg:inline">
            hover a project to preview&nbsp;&nbsp;→
          </span>
        </p>
        <ul className="flex flex-col">
          {projectsData.map((p) => (
            <li key={p.slug}>
              <ProjectRow
                project={p}
                selected={p.slug === activeSlug}
                onSelect={() => setActiveSlug(p.slug)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/** One catalogue row: name · dashed leader · status tag · arrow, with a gold
 *  rail + surface plate when selected. */
function ProjectRow({
  project,
  selected,
  onSelect,
}: {
  project: ProjectEntry
  selected: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      onMouseEnter={onSelect}
      onFocus={onSelect}
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "group relative flex w-full items-baseline gap-3 rounded-[6px] py-3.5 pl-5 pr-3 text-left outline-none transition-colors",
        "focus-visible:ring-1 focus-visible:ring-accent",
        selected && "bg-surface",
      )}
    >
      {selected && (
        <span
          aria-hidden="true"
          className="absolute bottom-2 left-0 top-2 w-[3px] rounded-full bg-accent"
        />
      )}
      <span className="shrink-0 font-display text-[18px] font-semibold leading-tight tracking-[-0.01em] text-ink sm:text-[20px]">
        {project.name}
      </span>
      <span
        aria-hidden="true"
        className="mx-1 flex-1 self-center border-t border-dashed border-rule opacity-70 dark:border-lattice-mid"
      />
      <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
        {project.tag}
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "shrink-0 font-mono text-[13px] leading-none transition-transform group-hover:translate-x-0.5",
          selected ? "text-accent" : "text-muted",
        )}
      >
        →
      </span>
    </button>
  )
}

/** The featured media plate — forest (light) / slate (dark) card carrying the
 *  cross-faded cover, the tag, the '{Name}.' title and the build link. */
function FeaturedPanel({ active }: { active: ProjectEntry }) {
  const title = /[.?!]$/.test(active.name) ? active.name : `${active.name}.`

  const inner = (
    <>
      <div className="relative aspect-[8/5] w-full overflow-hidden rounded-[8px] border border-card-border">
        {projectsData.map((p) => {
          const shown = p.slug === active.slug
          return (
            <Image
              key={p.slug}
              src={p.cover}
              alt={shown ? `${p.name} — cover art` : ""}
              aria-hidden={shown ? undefined : true}
              fill
              sizes="(max-width: 1024px) 92vw, 620px"
              priority={p.slug === projectsData[0].slug}
              className={cn(
                "object-cover transition-opacity duration-500",
                shown ? "opacity-100" : "opacity-0",
              )}
            />
          )
        })}
      </div>

      <div className="mt-5">
        <span className="font-mono text-[12px] uppercase tracking-[0.16em] text-accent">
          {active.tag}
        </span>
        <h2 className="mt-1.5 font-display text-[26px] font-black leading-[1.02] tracking-[-0.01em] text-on-card sm:text-[30px]">
          {title}
        </h2>
        <p className="mt-3 max-w-[48ch] font-body text-[15px] leading-[1.55] text-on-card-muted">
          {active.blurb}
        </p>
        <span className="mt-5 inline-flex items-center font-mono text-[13px] lowercase text-on-card transition-colors group-hover:text-accent">
          {active.buildLabel}&nbsp;&nbsp;→
        </span>
      </div>
    </>
  )

  const className = cn(
    "group block rounded-[12px] border border-card-border bg-card p-4 transition-colors hover:border-on-card-muted sm:p-5",
    "lg:order-2 lg:flex-1",
  )

  if (active.external) {
    return (
      <a
        href={active.href}
        target="_blank"
        rel="noreferrer"
        className={className}
      >
        {inner}
      </a>
    )
  }
  return (
    <Link href={active.href} className={className}>
      {inner}
    </Link>
  )
}
