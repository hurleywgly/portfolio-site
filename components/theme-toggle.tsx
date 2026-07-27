"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { setTheme } = useTheme()

  return (
    <div
      className="inline-grid h-11 w-36 grid-cols-2 rounded-full border border-rule bg-surface p-1"
      role="group"
      aria-label="Color theme"
    >
      <button
        type="button"
        onClick={() => setTheme("light")}
        className="inline-flex items-center justify-center rounded-full bg-page text-accent transition-colors dark:bg-transparent dark:text-muted"
        aria-label="Use light theme"
      >
        <Sun className="h-4 w-4" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => setTheme("dark")}
        className="inline-flex items-center justify-center rounded-full text-muted transition-colors dark:bg-card dark:text-accent"
        aria-label="Use dark theme"
      >
        <Moon className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  )
}
