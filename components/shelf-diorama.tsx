import Image from "next/image"
import { cn } from "@/lib/utils"

/**
 * The personality diorama — robot, Space Needle, Golden Gate, paddleboard,
 * book stack on a shelf. The light and dark art are DIFFERENT drawings in the
 * canon (unique vector objects per theme), so both are staged and swapped by
 * theme class. The parent gives it room; it never shrinks below character.
 */
export function ShelfDiorama({ className }: { className?: string }) {
  const alt =
    "A shelf diorama: a small robot, the Space Needle, the Golden Gate Bridge, a paddleboard, and a stack of books."
  return (
    <span className={cn("relative block h-full w-full", className)}>
      <Image
        src="/art/home/shelf-diorama.png"
        alt={alt}
        width={1112}
        height={578}
        priority
        className="h-full w-full select-none object-contain dark:hidden"
      />
      <Image
        src="/art/home/shelf-diorama-dark.png"
        alt={alt}
        width={1128}
        height={578}
        priority
        className="hidden h-full w-full select-none object-contain dark:block"
      />
    </span>
  )
}
