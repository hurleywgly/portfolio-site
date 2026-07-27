"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
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
 * supply page chrome, so this renders content only. Reconciled against Figma
 * `40:2` 2026-07-26 — rows now carry the row-level summary + input→output
 * tagline the frame shows (previously name + tag only), and the featured
 * panel is an image in a bordered frame with page-level text below it
 * (previously a padded card) — Figma's panel sits directly on the page
 * background, not a forest/slate card surface.
 */
export function ProjectsShowcase() {
  const [activeSlug, setActiveSlug] = useState(projectsData[0].slug)
  const active =
    projectsData.find((p) => p.slug === activeSlug) ?? projectsData[0]

  return (
    <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-14">
      <FeaturedPanel active={active} />

      <div className="lg:order-1 lg:w-[43%] lg:max-w-[560px]">
        <p className="mb-3 text-right font-mono text-[12px] lowercase tracking-[0.02em] text-muted">
          <span className="lg:hidden">tap a project to preview&nbsp;&nbsp;→</span>
          <span className="hidden lg:inline">
            hover a project to preview&nbsp;&nbsp;→
          </span>
        </p>
        <ul className="flex flex-col divide-y divide-rule dark:divide-lattice-mid">
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

/** One catalogue row: mono name + status tag, a one-line summary, and a small
 *  input→output tagline — a surface plate + gold rail when selected.
 *
 *  Desktop hovers/focuses a row to preview it (`onSelect`, unchanged). Mobile
 *  has no hover, so the same tap that would otherwise be a no-op on an
 *  already-selected row instead launches it — "tap to preview → tap again to
 *  launch," per Ryan's explicit ask (PLAN.md #60). Because hover/focus already
 *  select before a click lands, this also means a desktop click on the
 *  already-hovered row launches immediately — a superset of the old
 *  (no-op-on-click) behavior, not a regression: hover-to-preview is untouched. */
function ProjectRow({
  project,
  selected,
  onSelect,
}: {
  project: ProjectEntry
  selected: boolean
  onSelect: () => void
}) {
  const router = useRouter()

  const activate = () => {
    if (!selected) {
      onSelect()
      return
    }
    // Already the active row — this is the "tap again" launch.
    if (project.external) {
      window.open(project.href, "_blank", "noopener,noreferrer")
    } else {
      router.push(project.href)
    }
  }

  return (
    <button
      type="button"
      onMouseEnter={onSelect}
      onFocus={onSelect}
      onClick={activate}
      aria-pressed={selected}
      className={cn(
        "group relative flex w-full flex-col rounded-[6px] py-3.5 pl-5 pr-4 text-left outline-none transition-colors",
        "focus-visible:ring-1 focus-visible:ring-accent",
        selected &&
          "border border-rule bg-surface dark:border-lattice-mid",
      )}
    >
      {selected && (
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-[3px] rounded-l-[6px] bg-accent"
        />
      )}
      <span className="flex items-baseline justify-between gap-3">
        <span className="font-mono text-[17px] lowercase leading-tight text-ink">
          {project.name}
        </span>
        <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
          {project.tag}
        </span>
      </span>
      <p className="mt-2 font-body text-[14px] leading-[1.4] text-muted">
        {project.summary}
      </p>
      {/* opacity-70 dropped (PLAN.md #64): it compounded with --muted to read
          ~2.87:1 on the row's surface in both themes — a real AA failure
          Codex's report didn't itemize by name but that's the same
          muted-secondary-text family. --muted alone (now WCAG-fixed above)
          already carries the de-emphasis; the extra opacity isn't needed. */}
      <p className="mt-1.5 font-mono text-[11px] leading-none text-muted">
        {project.tagline}
      </p>
    </button>
  )
}

/** The featured media plate — a bordered cover image with the tag, title,
 *  build link and description sitting directly on the page below it (no
 *  card surface, matching the Figma frame). */
function FeaturedPanel({ active }: { active: ProjectEntry }) {
  const title = /[.?!]$/.test(active.name) ? active.name : `${active.name}.`

  const inner = (
    <>
      <div className="relative aspect-[660/415] w-full overflow-hidden rounded-[4px] border border-rule transition-colors group-hover:border-diagram dark:border-lattice-mid dark:group-hover:border-on-card-muted">
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

      <div className="mt-5 flex flex-col lg:grid lg:grid-cols-[1fr_auto] lg:items-baseline lg:gap-x-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted lg:col-span-2 lg:row-start-1">
          {active.panelTag}
        </p>
        <h2 className="mt-1.5 font-display text-[28px] font-black leading-[1.02] tracking-[-0.01em] text-ink lg:col-start-1 lg:row-start-2 lg:mt-2 lg:text-[32px]">
          {title}
        </h2>
        <span className="order-3 mt-2 shrink-0 font-mono text-[13px] lowercase text-accent lg:order-none lg:col-start-2 lg:row-start-2 lg:mt-2 lg:justify-self-end">
          {active.buildLabel}&nbsp;&nbsp;→
        </span>
        <p className="order-2 mt-2 max-w-[48ch] font-body text-[15px] leading-[1.5] text-muted lg:col-span-2 lg:row-start-3 lg:mt-2">
          {active.blurb}
        </p>
      </div>
    </>
  )

  const className = "group block lg:order-2 lg:flex-1"

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
