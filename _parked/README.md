# Parked reference surfaces

This directory holds pre–Stage A implementation references that must not be
compiled as live Next.js application code.

- The avatar work returns later as its own project. Its spike routes, scene
  components, model pipeline references, and transition experiments are kept
  here for that future build.
- The dashboard and work routes are retained as content/reference snapshots.
- The former writing and project-detail routes are retained while the live
  route surface is reduced to the DESIGN.md v1.0 information architecture.
- The generated Radix UI kitchen sink and its dependent experiments are parked
  so the unused dependency tree can be removed without discarding reference
  code.
- The previous Geist font files and GSAP loader are retained for provenance;
  the live site now uses the three canonical Google font families.

`_parked/` is intentionally excluded from TypeScript and lint checks.
