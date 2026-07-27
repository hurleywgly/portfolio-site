import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { ActiveProject } from "@/lib/types"

const STATUS_CLASSES: Record<string, string> = {
  live: "status-live",
  active: "status-active",
  "pre-build": "status-pre-build",
  concept: "status-concept",
}

export function SystemCard({ project }: { project: ActiveProject }) {
  return (
    <div className="group relative rounded-lg border border-border/60 bg-card/50 p-5 glow-hover transition-all hover:border-border">
      {/* Header row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="font-semibold text-foreground text-[15px]">{project.title}</h3>
        <span
          className={`shrink-0 text-[10px] font-medium tracking-wider uppercase px-2 py-0.5 rounded-full border ${
            STATUS_CLASSES[project.status] ?? STATUS_CLASSES.concept
          }`}
        >
          {project.status === "pre-build" ? "pre-build" : project.status}
        </span>
      </div>

      {/* Transformation signature */}
      <div className="font-mono text-xs text-muted-foreground mb-3 flex items-center flex-wrap gap-x-0">
        <span className="text-foreground/70">{project.transformIn}</span>
        <span className="transform-arrow text-[10px]">{"-->"}</span>
        <span className="text-primary">{project.transformOut}</span>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
        {project.description}
      </p>

      {/* Proof of life */}
      {project.proofOfLife && (
        <p className="text-[11px] text-muted-foreground/60 font-mono mb-3">
          {project.proofOfLife}
        </p>
      )}

      {/* Links */}
      {project.links && project.links.length > 0 && (
        <div className="flex flex-wrap gap-3 pt-1">
          {project.links.map((link) => (
            <Link
              key={link.url}
              href={link.url}
              target="_blank"
              className="text-xs text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
            >
              {link.label}
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
