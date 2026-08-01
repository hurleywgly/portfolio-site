# POSTHOG-INTEGRATION.CAPSULE.md

> Wire lightweight, ad-blocker-resistant PostHog analytics into a freshly-shipped Next.js portfolio without disturbing a pixel of it.

**Version:** 1.0
**Created:** 2026-07-29
**From:** Claude (orchestrator) — ryan_portfolio production-push session
**To:** Codex, implementing solo in the repo
**Purpose:** Implement PostHog product analytics on ryanwigley.com (PLAN.md #21) — pageviews, a small set of semantic events, and a clean verification loop — on a test branch Ryan approves before merge.
**Tier:** Standard
**Category:** Conversation Thread
**Archetype:** Steroid

---

## 1. Dispatch Summary

The Working Exhibit redesign is live and stable at https://ryanwigley.com (Next.js 16 app router, webpack build, Vercel). Analytics is the last unstarted item from the production plan. Your job: add PostHog with a light touch — the site is a portfolio, not a SaaS funnel — then prove events flow. Everything else on the site is considered DONE and audited; treat the codebase as fragile canon, not a playground.

## 2. Core Content

### Repo facts

| | |
|---|---|
| Repo | `~/my_projects/ryan_portfolio`, branch `main` (remote: `hurleywgly/portfolio-site` — origin URL may still say `portfolio_site`; pushes redirect) |
| Stack | Next.js 16.2.3 (app router, `next build --webpack`), Tailwind, React client components where needed |
| Host | Vercel (`ryanportfolio` project, prod = ryanwigley.com). `netlify.toml` is a dead artifact — ignore it |
| Build/QA | `npm run build` (must stay clean) · `npm run lint` (tsc) · `npm run test:e2e` (Playwright incl. `navigation-stability.spec.ts` — one PRE-EXISTING failure: "client navigation resets scroll", serial-mode; not yours to fix) |
| All 6 routes | `/` `/about` `/methodology` `/projects` `/tools` `/m` (noindex reference route) — all static-prerendered; keep them that way |
| Conventions | PLAN.md is the working log (add a #21 entry when done). DESIGN.md v1.2 + /design-system.html are design canon — analytics must not alter any rendered UI. Commits end with `Co-Authored-By: Codex <noreply@openai.com>` + `Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>` |

### PostHog account context

Ryan's PostHog org is **Productonics** (US cloud, us.posthog.com). The only existing project is **Waveform** — that is a DIFFERENT product. **Do not ship portfolio events into the Waveform project.** Create (or have Ryan create) a new PostHog project named `ryanwigley.com` and use ITS project API key. The `phc_…` key is public-by-design (ships in the client bundle), but keep it in env anyway: `NEXT_PUBLIC_POSTHOG_KEY` + `NEXT_PUBLIC_POSTHOG_HOST` on Vercel (all environments) and `.env.local` for dev. Never commit `.env.local`.

### What to implement

1. **posthog-js, client-side only.** Official Next.js app-router pattern: initialize in `instrumentation-client.ts` (supported in Next 15.3+; verify it fires under the webpack builder — if not, fall back to a small `"use client"` provider mounted in `app/layout.tsx`). The site is fully static — nothing may become dynamic/SSR because of analytics.
2. **Reverse proxy** through Next rewrites so ad-blockers don't eat events: `/ingest/*` → `https://us.i.posthog.com/*` (+ `/ingest/static/*` → `https://us-assets.i.posthog.com/static/*`) in `next.config.mjs`, and `api_host: "/ingest"`, `ui_host: "https://us.posthog.com"` in the init. Do not touch the existing `images` config in that file.
3. **Config posture (keep it lean):**
   - `defaults: "2025-05-24"` (SPA pageview capture on history change comes with it — verify client-side navs emit `$pageview`)
   - `person_profiles: "identified_only"` — visitors are anonymous; keeps costs sane
   - Session recording OFF at launch (`disable_session_recording: true`) — Ryan can flip it in-app later
   - Autocapture ON (default) — it covers most link/click coverage for free
4. **Semantic events** (thin layer, names are the contract):
   - `project_launched` — `/projects` second-tap/click that navigates; props: `{ project: slug, href }`. Hook into `activate()` in `components/projects-showcase.tsx`
   - `skill_expanded` — playbook accordion open (not close); props: `{ skill: slug }` (`components/skill-playbook.tsx` `toggle`)
   - `install_copied` — the copy button in `components/install-bar.tsx`; props: `{ command }`
   - `theme_changed` — theme switcher; props: `{ theme: "light" | "dark" }`
   - Nothing else. Resist inventing more; autocapture + these four tell the whole story.
5. **No consent banner** for launch — anonymous, cookieless-leaning analytics on a personal site (set `persistence: "localStorage+cookie"` default is fine). Flag in your report that Ryan can add a banner later if he ever enables recordings.

### Guardrails (each protects something that broke once this cycle)

- **No layout/UI changes of any kind.** The site just passed a pixel audit; a zero-shift navigation e2e exists and must stay green.
- Touch only: `instrumentation-client.ts` (new), `next.config.mjs` (rewrites only), the four listed components (one `capture` call each), `package.json` (+posthog-js), PLAN.md. If you believe you must touch anything else, stop and say so in the report instead.
- Don't add a `<Suspense>`/`useSearchParams` pageview tracker unless the `defaults` history-capture genuinely fails — that pattern forces client-side rendering boundaries this site doesn't have.
- Static export intact: `npm run build` must still show all routes as `○ (Static)`.
- Work on branch **`feat/posthog`**. Do NOT merge or deploy to prod — Ryan tests first (this mirrors how the og-card landed).

## 3. Patterns and Learnings

- **Verify via DOM/network, not assumption.** This project produced multiple false "verified" claims; the fix was checking the real thing (here: the PostHog Live Events feed + `/ingest` requests in the network tab).
- **Config edits need a dev-server restart** — `next.config.mjs` doesn't hot-reload; a stale server produced phantom bugs twice this cycle.
- **Vercel is the host of record.** `.vercel/project.json` present; `vercel deploy` = preview, `--prod` = production (Ryan's call).

## 5. Integration Plan

Prerequisites: repo at `main` clean; a `ryanwigley.com` PostHog project + its `phc_` key (ask Ryan or create via the PostHog MCP if available); `NEXT_PUBLIC_POSTHOG_KEY`/`_HOST` set in `.env.local`.

- **Step 1: Branch** `[auto]` — `git checkout -b feat/posthog` from up-to-date `main`. Verify: clean tree. Rollback: n/a.
- **Step 2: Install + init** `[auto]` — `npm i posthog-js`; add `instrumentation-client.ts` with the §2.3 posture; add the `/ingest` rewrites. Verify: `npm run build` clean, all routes still `○ Static`. Rollback: revert branch.
- **Step 3: Semantic events** `[auto]` — the four `posthog.capture` calls. Verify: `tsc` clean; grep confirms exactly 4 capture sites. Rollback: per-file revert.
- **Step 4: Local proof** `[auto]` — run dev, click through: initial `$pageview`, a client-side nav `$pageview`, and each of the four events visible in PostHog **Live Events**, requests going to `/ingest` (not `us.i.posthog.com` directly). Verify: screenshots/log lines in the report; console clean; `npm run test:e2e` — no NEW failures vs the one pre-existing skip/fail noted in §2. Rollback: fix before proceeding.
- **Step 5: Vercel env + preview** `[manual-ish]` — add the two env vars to the Vercel project (all envs), `vercel deploy` (PREVIEW only), confirm events flow from the preview URL. Verify: Live Events shows the preview host. Rollback: preview deploys are inert.
- **Step 6: Hand back** `[manual]` — push `feat/posthog`, update PLAN.md (#21 entry: what shipped, event names, key location), report to Ryan. **Ryan merges + prods.** Rollback: branch dies quietly if rejected.

## 6. Signals

- If `instrumentation-client.ts` doesn't execute under the webpack builder, say so plainly and use the provider-component fallback — don't silently ship a half-initialized SDK.
- Watch the bundle: posthog-js adds ~50KB gz. If first-load JS on `/` grows past ~15KB net (lazy internals should absorb the rest), report the number rather than optimizing unprompted.
- The PostHog MCP in Ryan's tooling defaults to the **Waveform** project — any MCP-based verification must explicitly target the new project, or it will "verify" against the wrong dataset.
- `/m` is noindex but real traffic can land there; its pageviews are fine to keep (they're honest data).

## 7. Sanitization Notes

Same-owner transfer — paths, handles, and infra names retained. The one deliberate omission: **no PostHog API key is embedded**; §2 says where it lives and how it reaches the app (env vars). The Waveform project token that floats around Ryan's MCP context must NOT be reused here — that's a wrong-project foot-gun, not a secret.

---

*Dispatch complete.*
