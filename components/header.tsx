"use client"

import { Mail, Linkedin, Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

const NAV_ITEMS = [
  { label: "Work", href: "/work" },
  { label: "Methodology", href: "/methodology" },
  { label: "Writing", href: "/writing" },
  { label: "About", href: "/about" },
  { label: "Dashboard", href: "/dashboard" },
]

export function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50">
      <div className="container max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo / Name */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image
            src="/ryan-profile.jpg"
            alt="Ryan Wigley"
            width={32}
            height={32}
            className="rounded-full"
            priority
          />
          <span className="font-semibold text-sm tracking-tight">Ryan Wigley</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  isActive
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Social + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="https://www.linkedin.com/in/ryanwigley/"
            className="text-muted-foreground hover:text-foreground hidden sm:block"
            target="_blank"
          >
            <Linkedin className="h-4 w-4" />
          </Link>
          <Link
            href="https://x.com/rywigs"
            className="text-muted-foreground hover:text-foreground hidden sm:block"
            target="_blank"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </Link>
          <Link
            href="mailto:ryan.wigley522@gmail.com"
            className="text-muted-foreground hover:text-foreground hidden sm:block"
          >
            <Mail className="h-4 w-4" />
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-muted-foreground hover:text-foreground"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-md">
          <nav className="container max-w-5xl mx-auto px-4 py-3 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-3 py-2 text-sm rounded-md ${
                    isActive
                      ? "text-primary font-medium bg-primary/5"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>
      )}
    </header>
  )
}
