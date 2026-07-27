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
 *
 * At `md`+ this route has no desktop content of its own — before #63 that
 * meant literally no navigation rendered at all (the shared Header's desktop
 * strip was force-hidden here, same as `/`, and the mock's own chrome is
 * mobile-only). Now the desktop strip is real/visible on every route (#61),
 * so `/` and `/m` no longer need the `md:` half of this offset — only the
 * mobile one, which still cancels the shared Header's invisible mobile slot
 * (see components/header.tsx) so the mock's own baked mobile chrome sits at
 * the true viewport top below `md`.
 */
export default function HomeMobileMockPage() {
  return (
    <main className="-mt-[76px] md:mt-0">
      <HomeMobileMock />
    </main>
  )
}
