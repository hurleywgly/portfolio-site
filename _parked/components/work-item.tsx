'use client'

import { WorkExperience } from "@/lib/types"
import { ThemeAwareImage } from "@/components/ui/theme-aware-image"

interface WorkItemProps {
  experience: WorkExperience
}

export function WorkItem({ experience }: WorkItemProps) {
  return (
    <div className="flex items-center gap-3">
      <ThemeAwareImage
        lightSrc={experience.logo.light}
        darkSrc={experience.logo.dark}
        alt={`${experience.company} logo`}
        width={32}
        height={32}
      />
      <div>
        <h3 className="font-medium">{experience.company}</h3>
        <p className="text-sm text-muted-foreground">{experience.role} • {experience.period}</p>
      </div>
    </div>
  )
} 