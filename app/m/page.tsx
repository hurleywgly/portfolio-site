import type { Metadata } from "next"
import { HomeMobileMock } from "@/components/home-mobile-mock"

export const metadata: Metadata = {
  title: { absolute: "Ryan Wigley | AI Systems Builder" },
  alternates: { canonical: "/" },
  robots: { index: false },
}

/**
 * /m — standalone reference build of the Figma mobile frame (1054×2360) at
 * mock scale, via {@link HomeMobileMock}. `/` renders the same component in
 * its mobile slot, so this route exists to preview/QA the mobile experience
 * in isolation at any viewport width without the desktop exhibit alongside it.
 */
export default function HomeMobileMockPage() {
  return (
    <main className="-mt-[76px] md:-mt-[81px]">
      <HomeMobileMock />
    </main>
  )
}
