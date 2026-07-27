"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MobileNavBar } from "@/components/mobile-nav-bar"
import { RwLogo } from "@/components/rw-logo"
import { SiteNav } from "@/components/site-nav"
import { ThemeSwitcher } from "@/components/theme-switcher"

/**
 * Shared page chrome. The desktop strip is real and visible on every route,
 * including `/` and `/m` — home used to draw its own nav/logo/theme-switcher
 * scaled inside the exhibit artboard, which gave it a different measured
 * size/position than every other page's chrome and made navigation "jump"
 * between routes (PLAN.md #61). `/` and `/m` still bake their own
 * logo+theme-switcher row at mock scale into the mobile artboard (and render
 * the real MobileNavBar themselves), so the shared Header's MOBILE slot stays
 * an invisible same-height placeholder on just those two routes, keeping the
 * root layout footprint constant while routes stream in.
 */
export function Header() {
  const pathname = usePathname()
  const hideMobileChrome = pathname === "/" || pathname === "/m"
  const mobileVisibility = hideMobileChrome
    ? "invisible pointer-events-none"
    : ""

  return (
    <>
      <header className="sticky top-0 z-40 hidden border-b border-rule bg-page/90 backdrop-blur md:block">
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between gap-8 px-10">
          <Link href="/" aria-label="Ryan Wigley — home">
            <RwLogo className="text-[26px]" />
          </Link>
          <div className="flex items-center gap-8">
            <SiteNav />
            <ThemeSwitcher />
          </div>
        </div>
      </header>

      <div
        className={`flex h-[76px] items-center justify-between px-5 py-4 md:hidden ${mobileVisibility}`}
        aria-hidden={hideMobileChrome || undefined}
      >
        <Link href="/" aria-label="Ryan Wigley — home">
          <RwLogo className="text-[24px]" />
        </Link>
        <ThemeSwitcher />
      </div>

      {!hideMobileChrome && <MobileNavBar />}
    </>
  )
}
