import { cn } from "@/lib/utils"

/**
 * The personality diorama — robot, Space Needle, Golden Gate, paddleboard,
 * book stack on a shelf. Per canon these are individual SVG objects composed
 * into ONE transparent SVG grouping per theme (light and dark are different
 * drawings), exported whole from the Figma frames and swapped by theme class.
 */
export function ShelfDiorama({ className }: { className?: string }) {
  const alt =
    "A shelf diorama: a small robot, the Space Needle, the Golden Gate Bridge, a paddleboard, and a stack of books."
  return (
    <span className={cn("relative block h-full w-full", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/art/home/shelf-diorama.svg"
        alt={alt}
        className="h-full w-full select-none object-contain dark:hidden"
        draggable={false}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/art/home/shelf-diorama-dark.svg"
        alt={alt}
        className="hidden h-full w-full select-none object-contain dark:block"
        draggable={false}
      />
    </span>
  )
}
