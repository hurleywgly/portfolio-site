export const BLOG_URL = "https://ryanwigley.substack.com"

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
