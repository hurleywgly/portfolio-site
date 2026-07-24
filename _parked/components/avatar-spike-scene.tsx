"use client"

import { useEffect, useState } from "react"
import {
  AvatarStage,
  FALLBACK_AVATAR_MODEL,
  RYAN_AVATAR_MODEL,
  type AvatarViewMode,
} from "@/components/avatar-stage"

const MODEL_QUERY_PARAM = "model"

export function AvatarSpikeScene() {
  const [viewMode, setViewMode] = useState<AvatarViewMode>("home-rear")
  const [modelPath, setModelPath] = useState(RYAN_AVATAR_MODEL)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const requestedModel = params.get(MODEL_QUERY_PARAM)

    if (requestedModel?.startsWith("/models/")) {
      setModelPath(requestedModel)
    }
  }, [])

  return (
    <div className="relative min-h-[100svh] overflow-hidden bg-[#070a0f] text-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(217,164,65,0.18),transparent_32%),linear-gradient(180deg,rgba(15,23,42,0.1),rgba(2,6,23,0.95))]" />

      <div className="absolute left-5 top-5 z-10 flex flex-wrap items-center gap-2 rounded-md border border-amber-400/20 bg-slate-950/70 p-2 backdrop-blur-md">
        <button
          type="button"
          onClick={() => setViewMode("home-rear")}
          className={`rounded px-3 py-2 font-mono text-[11px] uppercase tracking-wider transition-colors ${
            viewMode === "home-rear"
              ? "bg-amber-300 text-slate-950"
              : "bg-slate-900 text-amber-100 hover:bg-slate-800"
          }`}
        >
          Home rear
        </button>
        <button
          type="button"
          onClick={() => setViewMode("profile-front")}
          className={`rounded px-3 py-2 font-mono text-[11px] uppercase tracking-wider transition-colors ${
            viewMode === "profile-front"
              ? "bg-amber-300 text-slate-950"
              : "bg-slate-900 text-amber-100 hover:bg-slate-800"
          }`}
        >
          Profile front
        </button>
      </div>

      <div className="absolute bottom-5 left-5 right-5 z-10 max-w-2xl rounded-md border border-slate-500/20 bg-slate-950/65 p-4 backdrop-blur-md">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-amber-300/80">
          GLB loading spike
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          Rear-facing avatar in a living systems grid
        </h1>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-300/80">
          This route validates the web integration path: local GLB asset,
          Three.js/R3F rendering, page-level orientation control, and a
          procedural tree/grid environment for the homepage direction.
        </p>
        <p className="mt-3 font-mono text-[10px] uppercase tracking-wider text-slate-500">
          asset: {modelPath}
        </p>
      </div>

      <AvatarStage
        className="absolute inset-0"
        interactive
        modelPath={modelPath}
        showAssetMarkers={modelPath === FALLBACK_AVATAR_MODEL}
        viewMode={viewMode}
      />
    </div>
  )
}
