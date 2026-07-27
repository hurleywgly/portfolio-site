import { dirname } from "node:path"
import { fileURLToPath } from "node:url"

const projectRoot = dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Optimization ON (Next default). Was `unoptimized: true`, which served raw
    // files with no srcset — the cause of soft/pixelated art on 2×/3× phones
    // (PLAN.md #42). Host is Vercel (`.vercel/project.json`; `netlify.toml` is a
    // leftover from a8370f4), whose optimizer needs no local sharp; sharp 0.34.5
    // is present anyway for local/standalone builds.
    formats: ["image/avif", "image/webp"],
  },
  output: "standalone",
  turbopack: {
    root: projectRoot,
  },
}

export default nextConfig
