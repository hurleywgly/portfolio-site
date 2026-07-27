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
 * Desktop nav strip: 16px icon beside each lowercase-mono word.
 * home · projects · tools · writing · about — writing is the external blog.
 * Active page carries a gold underline.
 */
export function SiteNav({ className }: { className?: string }) {
  const pathname = usePathname()

  return (
    <nav
      className={cn("flex items-center gap-[22px]", className)}
      aria-label="Primary"
    >
      {siteNav.map((item: SiteNavItem) => {
        const Icon = navIcons[item.label]
        const active = isCurrent(pathname, item)
        const inner = (
          <>
            <Icon className="h-4 w-auto shrink-0" aria-hidden="true" />
            <span>{item.label}</span>
          </>
        )
        const classes = cn(
          "relative inline-flex items-center gap-[7px] py-1 font-mono text-[15px] lowercase tracking-[0.02em] transition-colors",
          "after:absolute after:inset-x-0 after:-bottom-[3px] after:h-[2px] after:origin-left after:bg-accent after:transition-transform",
          active
            ? "text-ink after:scale-x-100"
            : "text-ink/70 hover:text-ink after:scale-x-0",
        )

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
              <span className="sr-only">(opens in a new tab)</span>
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
