import Image from "next/image"
import { cn } from "@/lib/utils"

/**
 * The crew — a pixel family portrait in a framed polaroid with a THE CREW
 * caption baked into the art. Staged PNG (transparent).
 */
export function CrewPolaroid({ className }: { className?: string }) {
  return (
    <Image
      src="/art/home/crew-polaroid.png"
      alt="A pixel-art family portrait captioned THE CREW."
      width={362}
      height={304}
      className={cn("h-full w-full select-none object-contain", className)}
    />
  )
}
