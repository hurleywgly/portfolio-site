import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        page: "var(--page)",
        surface: "var(--surface)",
        card: "var(--card)",
        "card-deep": "var(--card-deep)",
        "card-border": "var(--card-border)",
        "on-card": "var(--on-card)",
        "on-card-muted": "var(--on-card-muted)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        rule: "var(--rule)",
        diagram: "var(--diagram)",
        accent: "var(--accent)",
        "lattice-mid": "var(--lattice-mid)",
        "nav-icon": "var(--nav-icon)",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      maxWidth: {
        exhibit: "80rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
