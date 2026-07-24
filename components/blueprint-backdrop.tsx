import Image from "next/image"

/**
 * Persistent blueprint backdrop for the glass-museum aesthetic.
 * Lives in app/layout.tsx so Next App Router preserves it across route changes.
 * Starts at opacity 0.15 (not 0) to stay LCP-eligible in Chrome.
 */
export function BlueprintBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden"
    >
      {/* Hero image — priority for LCP */}
      <Image
        src="/hero-blueprint.png"
        alt=""
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="object-cover object-center opacity-60 blueprint-fade-in"
        style={{
          filter: "saturate(1.1) contrast(1.05)",
        }}
      />

      {/* Deepen the bottom for content legibility */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(15,23,42,0.15) 0%, rgba(15,23,42,0.55) 55%, rgba(15,23,42,0.85) 100%)",
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(15,23,42,0.6) 100%)",
        }}
      />

      <style>{`
        .blueprint-fade-in {
          animation: blueprint-fade 1400ms var(--transitions-slow) both;
        }
        @keyframes blueprint-fade {
          from { opacity: 0.15; transform: scale(1.04); }
          to { opacity: 0.6; transform: scale(1); }
        }
      `}</style>
    </div>
  )
}
