export const BLOG_URL = "https://blog.ryanwigley.com"

export type SiteNavItem =
  | {
      label: string
      href: string
      external?: never
    }
  | {
      label: string
      href?: never
      external: string
    }

export const siteNav = [
  { label: "home", href: "/" },
  { label: "projects", href: "/projects" },
  { label: "tools", href: "/tools" },
  { label: "writing", external: BLOG_URL },
  { label: "about", href: "/about" },
] as const satisfies readonly SiteNavItem[]

/**
 * The OG card (app/opengraph-image.png — exported from the Figma `og-card`
 * frames on the Design Language page). Next's file convention injects it for
 * routes that DON'T define their own `metadata.openGraph`, but a page-level
 * openGraph object shallow-replaces the resolved images — so every page that
 * sets openGraph must spread this back in explicitly.
 */
export const OG_IMAGE = [
  {
    url: "/opengraph-image.png",
    width: 1200,
    height: 630,
    alt: "Ryan Wigley — AI systems builder & product manager. A working exhibit of live systems, tools, and methods.",
  },
]
