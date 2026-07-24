"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MobileNavBar } from "@/components/mobile-nav-bar"
import { RwLogo } from "@/components/rw-logo"
import { SiteNav } from "@/components/site-nav"
import { ThemeSwitcher } from "@/components/theme-switcher"

/**
 * Shared page chrome for every route except the exhibit pages. Home (and its
 * /m mock-scale variant) are self-contained exhibits that render their own
 * nav, logo, and theme-switcher inside the scaled canvas, so the global
 * header steps aside there.
 */
export function Header() {
  const pathname = usePathname()
  if (pathname === "/" || pathname === "/m") return null

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

      <div className="flex items-center justify-between px-5 py-4 md:hidden">
        <Link href="/" aria-label="Ryan Wigley — home">
          <RwLogo className="text-[24px]" />
        </Link>
        <ThemeSwitcher />
      </div>

      <MobileNavBar />
    </>
  )
}
