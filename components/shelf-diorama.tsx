import Image from "next/image"
import { cn } from "@/lib/utils"

/**
 * The personality diorama — robot, Space Needle, Golden Gate, paddleboard,
 * book stack on a shelf. Staged PNG art (transparent). It never shrinks below
 * its intrinsic character; the parent just gives it room.
 */
export function ShelfDiorama({ className }: { className?: string }) {
  return (
    <Image
      src="/art/home/shelf-diorama.png"
      alt="A shelf diorama: a small robot, the Space Needle, the Golden Gate Bridge, a paddleboard, and a stack of books."
      width={711}
      height={355}
      priority
      className={cn("h-full w-full select-none object-contain", className)}
    />
  )
}
