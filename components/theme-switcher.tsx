"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

/**
 * 144×44 pill pair. Appearance is driven purely by the `.dark` class so there
 * is no hydration flash and light/dark stay in strict parity:
 *   light → sun cell filled forest (active), moon muted
 *   dark  → moon cell filled gold (active), sun muted
 */
export function ThemeSwitcher({ className }: { className?: string }) {
  const { setTheme } = useTheme()

  return (
    <div
      className={cn(
        "inline-grid h-11 w-36 shrink-0 grid-cols-2 gap-1 rounded-full border border-rule bg-surface p-1",
        className,
      )}
      role="group"
      aria-label="Color theme"
    >
      <button
        type="button"
        onClick={() => setTheme("light")}
        className="inline-flex items-center justify-center rounded-full bg-card text-on-card transition-colors dark:bg-transparent dark:text-muted"
        aria-label="Use light theme"
      >
        <Sun className="h-[18px] w-[18px]" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => setTheme("dark")}
        className="inline-flex items-center justify-center rounded-full text-muted transition-colors dark:bg-accent dark:text-page"
        aria-label="Use dark theme"
      >
        <Moon className="h-[18px] w-[18px]" aria-hidden="true" />
      </button>
    </div>
  )
}
