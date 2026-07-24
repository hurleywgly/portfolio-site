/**
 * Dynamic-import wrapper for GSAP.
 * Keeps the ~23KB core out of the initial bundle — loaded post-LCP only when
 * a component that needs orchestration mounts.
 */
export async function loadGsap() {
  const mod = await import("gsap")
  return mod.default || mod.gsap
}
