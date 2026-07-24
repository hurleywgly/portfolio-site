import type { Metadata } from "next"
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
  title: "Ryan Wigley | AI Systems Builder",
  description:
    "A working exhibit of live systems, tools, and methods by Ryan Wigley.",
  openGraph: {
    title: "Ryan Wigley | AI Systems Builder",
    description: "A working exhibit of live systems, tools, and methods.",
  },
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
