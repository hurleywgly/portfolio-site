import { BLOG_URL } from "@/lib/site"
import { cn } from "@/lib/utils"

function Line({ w = "100%" }: { w?: string }) {
  return (
    <span
      className="block h-[2px] rounded-full bg-on-card-muted opacity-45"
      style={{ width: w }}
    />
  )
}

/**
 * Writing → the blog, styled as a small newspaper front page: masthead,
 * text columns + a lead image block, SYSTEMS · BUILDING standfirst. Forest in
 * light, slate in dark. External link to the Substack.
 */
export function WritingTile({ className }: { className?: string }) {
  return (
    <a
      href={BLOG_URL}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "group flex h-full w-full flex-col rounded-[10px] border border-card-border bg-card p-4",
        className,
      )}
    >
      <span className="font-display text-[19px] font-semibold leading-none tracking-[-0.01em] text-on-card">
        Writing
      </span>
      <span className="mt-2 block h-px w-full bg-on-card-muted opacity-45" />

      <div className="mt-3 flex flex-1 gap-3">
        <div className="flex flex-1 flex-col justify-start gap-[7px] pt-0.5">
          <Line />
          <Line />
          <Line w="82%" />
          <Line />
          <Line w="68%" />
          <Line w="90%" />
        </div>
        <div className="flex w-[42%] flex-col gap-[7px]">
          <span className="block h-11 w-full rounded-[3px] border border-on-card-muted opacity-45" />
          <Line />
          <Line w="76%" />
        </div>
      </div>

      <span className="mt-3 block h-px w-full bg-on-card-muted opacity-45" />
      <div className="mt-2 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.08em] text-on-card">
        <span>Systems</span>
        <span>Building</span>
      </div>
    </a>
  )
}
