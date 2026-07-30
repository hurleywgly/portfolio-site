import type { Metadata, Viewport } from "next"
import { Fragment_Mono, Fraunces, Hanken_Grotesk } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { ThemeProvider } from "@/components/theme-provider"

const displayFont = Fraunces({
  subsets: ["latin"],
  weight: ["600", "900"],
  variable: "--font-display",
  display: "swap",
})

const bodyFont = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
})

const monoFont = Fragment_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://ryanwigley.com"),
  title: {
    default: "Ryan Wigley | AI Systems Builder",
    template: "%s | Ryan Wigley",
  },
  description:
    "A working exhibit of live systems, tools, and methods by Ryan Wigley — builder of Waveform, Stumble AI, and hand-built agent skills.",
  openGraph: {
    type: "website",
    siteName: "Ryan Wigley — Working Exhibit",
    title: "Ryan Wigley | AI Systems Builder",
    description:
      "A working exhibit of live systems, tools, and methods by Ryan Wigley.",
    url: "https://ryanwigley.com",
  },
  twitter: {
    // Large card — the 1200×630 OG art (app/twitter-image.png, exported from
    // the Figma og-card frames on the Design Language page; dark variant kept
    // at public/og/og-card-dark.png for a future swap).
    card: "summary_large_image",
    title: "Ryan Wigley | AI Systems Builder",
    description:
      "A working exhibit of live systems, tools, and methods by Ryan Wigley.",
    creator: "@rywigs",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e9eedf" },
    { media: "(prefers-color-scheme: dark)", color: "#192b43" },
  ],
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://ryanwigley.com/#person",
  name: "Ryan Wigley",
  url: "https://ryanwigley.com",
  image: "https://ryanwigley.com/art/people/ryan-headshot.jpg",
  jobTitle: "AI Systems Builder",
  worksFor: { "@type": "Organization", name: "Raya" },
  address: { "@type": "PostalAddress", addressLocality: "Seattle", addressRegion: "WA" },
  sameAs: [
    "https://github.com/hurleywgly",
    "https://x.com/rywigs",
    "https://blog.ryanwigley.com",
    "https://productonics.com",
  ],
  knowsAbout: [
    "AI systems",
    "agent skills",
    "podcast tooling",
    "product management",
  ],
}

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://ryanwigley.com/#website",
  name: "Ryan Wigley — Working Exhibit",
  url: "https://ryanwigley.com",
  description:
    "A working exhibit of live systems, tools, and methods by Ryan Wigley.",
  publisher: { "@id": "https://ryanwigley.com/#person" },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable} min-h-screen bg-page font-body text-ink antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
