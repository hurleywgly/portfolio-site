import Image from "next/image"
import { cn } from "@/lib/utils"

/**
 * The crew — a pixel family portrait in a framed polaroid with a THE CREW
 * caption baked into the art. Light and dark are separate exports (the frame
 * plate differs per theme), swapped by theme class.
 */
export function CrewPolaroid({ className }: { className?: string }) {
  const alt = "A pixel-art family portrait captioned THE CREW."
  return (
    <span className={cn("relative block h-full w-full", className)}>
      <Image
        src="/art/home/crew-polaroid.png"
        alt={alt}
        width={362}
        height={304}
        className="h-full w-full select-none object-contain dark:hidden"
      />
      <Image
        src="/art/home/crew-polaroid-dark.png"
        alt={alt}
        width={608}
        height={510}
        className="hidden h-full w-full select-none object-contain dark:block"
      />
    </span>
  )
}
