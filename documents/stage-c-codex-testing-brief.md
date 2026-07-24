# Stage C — Codex Testing Brief (contract)

Audience: the Codex `$goal` dispatches for Stage C (theme-switch bash + final end-user test
pass), Sol 5.6 @ xhigh. Orchestrator: Fable (git + review stays orchestrator-side).
Status: contract written 2026-07-24, ahead of Stage C. Do not run before Stage B is checked off.

## Non-negotiable: browser use IS the test vehicle

End-user testing here means **driving real browsers**, not curling HTML or reading source.
Mechanism: **Playwright from the shell** (`npm i -D @playwright/test && npx playwright install
chromium webkit`) — shell-native, no MCP connectors (Codex MCP auth is unreliable; MCP is
banned for these jobs, same as Stage A infra). Headless is fine; every assertion must come
from a rendered page — computed styles, screenshots, real clicks.

## Test matrix (minimum)

- **Pages:** `/` `/projects` `/tools` `/about` `/methodology` + a 404.
- **Viewports:** 1440×1024, 1280×800 (responsive desktop), 768×1024, 390×844 (mobile).
- **Browsers:** Chromium + WebKit (Safari-engine bugs are real for `color-scheme`/fonts).
- **Themes:** light, dark, and `prefers-color-scheme` emulation both ways.

## Theme-switch bash (the "debug the hell out of it" job)

On EVERY page × viewport × browser:
1. Click the theme switcher; assert token flip via computed styles on page bg, card, ink,
   accent (sample actual rgb values against DESIGN.md hexes — not class names).
2. **No FOUC:** first-paint screenshot on cold load in dark system-pref must never flash light
   (screenshot within the first frames; compare pixels).
3. **Persistence:** toggle → reload → still dark; toggle → client-navigate to every other
   route → still dark; new context with system-pref dark + no stored choice → dark.
4. Toggle state itself: moon-active gold in dark, sun-active in light (screenshot the pill).
5. No layout shift on toggle (bounding boxes before/after within 1px).
6. Mobile bar + desktop nav render the active page correctly in both themes.

## End-user pass (final test job)

- Every nav item navigates (incl. `writing` → external https://blog.ryanwigley.com, opens
  in new tab with rel=noopener).
- All `public/art/**` images referenced by pages actually load (no 404s, no broken img).
- Keyboard: tab order reaches nav + toggle + interactive cards; visible focus.
- `next build && next start` (production server), not just dev mode.
- Console: zero errors on every page/theme/viewport.
- Metadata smoke: title/description/OG per page, `llms.txt` reachable (Stage B ships these).

## Artifacts + report

Save screenshots to `test-artifacts/` (gitignored) named
`{page}-{viewport}-{browser}-{theme}[-state].png`. Final output: a results table
(pass/fail per matrix cell), every failure with repro steps + screenshot path, and a
severity-ranked fix list. Fixes to app code are allowed (focused, listed); test
infra lives in `tests/e2e/` and IS committed by the orchestrator.
