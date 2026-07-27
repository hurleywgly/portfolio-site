import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://ryanwigley.com"
  const lastModified = new Date()
  return [
    { url: `${base}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/projects`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/tools`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/about`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/methodology`, lastModified, changeFrequency: "monthly", priority: 0.7 },
  ]
}
