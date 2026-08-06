"use client"

import { useEffect, useLayoutEffect } from "react"

/**
 * Deep-link plumbing for the home page's tiles and arsenal chips.
 *
 * The home tiles and chips are exhibit objects, not a nav menu — they used to
 * dump every visitor at the top of `/projects` or `/tools` and leave them to
 * find the thing they just tapped. Each one now carries the slug it stands for
 * (`/projects?project=stumble`, `/tools?skill=capsule`) and the destination
 * page opens on that exact item.
 *
 * `/projects` and `/tools` are statically rendered, so the param is read from
 * `window.location` after mount rather than through `useSearchParams` — that
 * hook forces a Suspense boundary around the whole showcase/playbook and would
 * blank their server-rendered HTML. Both pages already run a post-mount viewport
 * pass for the same reason, so this is the established pattern here.
 */

/** `useLayoutEffect` on the client, `useEffect` on the server (no SSR warning).
 *  Running before paint is what makes a Link click from home land on the
 *  correct project/skill without a visible flash of the default one. */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

/** Reads a deep-link param off the current URL. Client-only by construction. */
export function readDeepLink(key: string): string | null {
  if (typeof window === "undefined") return null
  return new URLSearchParams(window.location.search).get(key)
}

/** Brings a deep-linked element to the top of the viewport once the layout it
 *  triggered (an expanded panel, a swapped cover) has actually committed.
 *  Instant, not smooth — this is an arrival, not an in-page jump; `scroll-mt-*`
 *  on the target clears the sticky desktop header. */
export function scrollDeepLinkIntoView(id: string) {
  requestAnimationFrame(() => {
    document.getElementById(id)?.scrollIntoView({ block: "start" })
  })
}
