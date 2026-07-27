import type { MetadataRoute } from "next"

// Open to all crawlers — including AI agents. The site is a public exhibit;
// llms.txt gives agents the guided tour.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-Web", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
    ],
    sitemap: "https://ryanwigley.com/sitemap.xml",
  }
}
