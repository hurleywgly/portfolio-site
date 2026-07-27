'use client'

import { Tool } from "@/lib/types"
import { ThemeAwareImage } from "@/components/ui/theme-aware-image"

interface ToolCardProps {
  tool: Tool
}

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <div className="flex items-start gap-3 rounded-lg border p-4">
      <ThemeAwareImage
        lightSrc={tool.icon.light}
        darkSrc={tool.icon.dark}
        alt={`${tool.name} icon`}
        width={24}
        height={24}
        className="mt-1"
      />
      <div>
        <h3 className="font-medium">{tool.name}</h3>
        <p className="text-sm text-muted-foreground">{tool.description}</p>
      </div>
    </div>
  )
} 