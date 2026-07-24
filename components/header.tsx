"use client"

import {
  FileText,
  FolderKanban,
  Home,
  UserRound,
  Wrench,
  type LucideIcon,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { siteNav, type SiteNavItem } from "@/lib/site"

const navIcons: Record<string, LucideIcon> = {
  home: Home,
  projects: FolderKanban,
  tools: Wrench,
  writing: FileText,
  about: UserRound,
}

function isCurrent(pathname: string, item: SiteNavItem) {
  if (!item.href) return false
  return (
    pathname === item.href ||
    (item.href !== "/" && pathname.startsWith(`${item.href}/`))
  )
}

function NavItem({
  item,
  pathname,
  mobile = false,
}: {
  item: SiteNavItem
  pathname: string
  mobile?: boolean
}) {
  const Icon = navIcons[item.label]
  const active = isCurrent(pathname, item)
  const className = mobile
    ? `flex min-w-0 flex-col items-center gap-1 px-1 py-2 font-mono text-[9px] lowercase tracking-[-0.02em] ${
        active ? "text-accent" : "text-nav-icon"
      }`
    : `relative inline-flex items-center gap-2 py-2 font-mono text-xs lowercase tracking-[0.08em] transition-colors ${
        active
          ? "text-ink after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-accent"
          : "text-muted hover:text-ink"
      }`

  const content = (
    <>
      <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span>{item.label}</span>
    </>
  )

  if (item.external) {
    return (
      <a
        href={item.external}
        className={className}
        target="_blank"
        rel="noreferrer"
      >
        {content}
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    )
  }

  return (
    <Link
      href={item.href!}
      className={className}
      aria-current={active ? "page" : undefined}
    >
      {content}
    </Link>
  )
}

export function Header() {
  const pathname = usePathname()

  return (
    <header className="relative z-50">
      <div className="hidden border-b border-rule md:block">
        <div className="exhibit-shell flex h-24 items-center justify-between gap-8">
          <nav className="flex items-center gap-7" aria-label="Primary navigation">
            {siteNav.map((item) => (
              <NavItem
                key={item.label}
                item={item}
                pathname={pathname}
              />
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </div>

      <div className="fixed right-4 top-4 z-50 md:hidden">
        <ThemeToggle />
      </div>
      <nav
        className="fixed inset-x-3 bottom-3 z-50 grid grid-cols-5 rounded-xl border border-card-border bg-card px-2 text-on-card shadow-lg md:hidden"
        aria-label="Primary navigation"
      >
        {siteNav.map((item) => (
          <NavItem
            key={item.label}
            item={item}
            pathname={pathname}
            mobile
          />
        ))}
      </nav>
    </header>
  )
}
