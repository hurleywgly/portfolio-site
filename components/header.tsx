"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MobileNavBar } from "@/components/mobile-nav-bar"
import { RwLogo } from "@/components/rw-logo"
import { SiteNav } from "@/components/site-nav"
import { ThemeSwitcher } from "@/components/theme-switcher"

/**
 * Shared page chrome. Exhibit routes overlap an invisible version of this
 * same-height slot with their self-contained chrome, keeping the root layout
 * footprint constant while routes stream in.
 */
export function Header() {
  const pathname = usePathname()
  const exhibitRoute = pathname === "/" || pathname === "/m"
  const exhibitVisibility = exhibitRoute
    ? "invisible pointer-events-none"
    : ""

  return (
    <>
      <header
        className={`sticky top-0 z-40 hidden border-b border-rule bg-page/90 backdrop-blur md:block ${exhibitVisibility}`}
        aria-hidden={exhibitRoute || undefined}
      >
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
        className={`flex h-[76px] items-center justify-between px-5 py-4 md:hidden ${exhibitVisibility}`}
        aria-hidden={exhibitRoute || undefined}
      >
        <Link href="/" aria-label="Ryan Wigley — home">
          <RwLogo className="text-[24px]" />
        </Link>
        <ThemeSwitcher />
      </div>

      {!exhibitRoute && <MobileNavBar />}
    </>
  )
}
