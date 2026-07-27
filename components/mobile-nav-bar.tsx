"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { navIcons } from "@/components/nav-icons"
import { siteNav, type SiteNavItem } from "@/lib/site"
import { cn } from "@/lib/utils"

function isCurrent(pathname: string, item: SiteNavItem) {
  if (!item.href) return false
  return (
    pathname === item.href ||
    (item.href !== "/" && pathname.startsWith(`${item.href}/`))
  )
}

/**
 * Fixed bottom bar: icon + lowercase-mono label per item. Flat on the page
 * with a top hairline (matching the Figma mobile frame), active label + glyph
 * in gold.
 */
export function MobileNavBar({ className }: { className?: string }) {
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 grid grid-cols-5 border-t border-rule bg-page/90 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden",
        className,
      )}
      aria-label="Primary"
    >
      {siteNav.map((item: SiteNavItem) => {
        const Icon = navIcons[item.label]
        const active = isCurrent(pathname, item)
        const inner = (
          <>
            <Icon
              className={cn("h-[22px] w-auto", active && "text-accent")}
              aria-hidden="true"
            />
            <span
              className={cn(
                "font-mono text-[11px] lowercase tracking-[0.02em]",
                active ? "text-accent" : "text-muted",
              )}
            >
              {item.label}
            </span>
          </>
        )
        const classes =
          "flex flex-col items-center justify-center gap-1.5 py-2.5 text-nav-icon"

        if (item.external) {
          return (
            <a
              key={item.label}
              href={item.external}
              target="_blank"
              rel="noreferrer"
              className={classes}
            >
              {inner}
            </a>
          )
        }
        return (
          <Link
            key={item.label}
            href={item.href!}
            className={classes}
            aria-current={active ? "page" : undefined}
          >
            {inner}
          </Link>
        )
      })}
    </nav>
  )
}
