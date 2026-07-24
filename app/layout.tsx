import { GeistSans } from "geist/font/sans"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { BlueprintBackdrop } from "@/components/blueprint-backdrop"

export const metadata: Metadata = {
  metadataBase: new URL("https://ryanwigley.com"),
  title: "Ryan Wigley | AI Systems Engineer",
  description:
    "I engineer AI systems that run businesses, starting with my own. From API infrastructure to operating systems — designing how complex inputs flow through structured processes to produce reliable outputs.",
  openGraph: {
    title: "Ryan Wigley | AI Systems Engineer",
    description:
      "I engineer AI systems that run businesses, starting with my own.",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-747E1F6JP2"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-747E1F6JP2');
            `,
          }}
        />
      </head>
      <body className={`${GeistSans.className} min-h-screen bg-background text-foreground antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <BlueprintBackdrop />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
