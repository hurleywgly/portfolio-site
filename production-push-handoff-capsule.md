# PRODUCTION-PUSH.CAPSULE.md

> Baton pass from a crashed fleet session to a calm single-threaded finisher: interview Ryan, write PLAN.md, then ship one task per turn.

**Version:** 1.0
**Created:** 2026-07-24
**From:** RyOS diagnostic session (parked fleet session `3f55e63b`, ryan_portfolio)
**To:** Fresh Claude Code session in `~/my_projects/ryan_portfolio`
**Purpose:** Kick off a short AskUserQuestion interview that produces `PLAN.md` (simple bullets: remaining + completed), then run a multi-turn, NO-parallel-agents campaign to production push of the Working Exhibit redesign.
**Tier:** Standard
**Category:** Conversation Thread
**Archetype:** Handoff

---

## 1. Dispatch Summary

The previous session built most of the Working Exhibit portfolio redesign using a Workflow + four parallel page agents. That fleet, re-resumed across app restarts, repeatedly spiked memory to 60–80GB and crashed the machine. The session transcript is parked (safe, non-resumable) at `~/.claude/parked-sessions/2026-07-24-ryan-portfolio-3f55e63b/`. All code survived as working-tree WIP on branch `redesign/working-exhibit`. Your job: finish and deploy this redesign calmly — **strictly one thing at a time**.

## 2. Core Content

### Hard operating constraints (non-negotiable)

- **NO Workflow tool. NO parallel Agent fan-out. NO background agent fleets.** The fleet pattern is what crashed this machine for hours. Work inline, single-threaded, one task per turn.
- One subagent at a time is acceptable only for a bounded read-only lookup; never for page builds.
- Do NOT resume or load the parked session `3f55e63b`. Read its transcript files only if a specific fact is missing — never `--resume` it.
- Do not commit unless Ryan explicitly says to. Working tree contains deliberate uncommitted WIP.

### Repo state at handoff (2026-07-24)

- Branch: `redesign/working-exhibit` (234 files / +11,227 −2,894 vs `main`)
- Last commit: `b914e7c` — DESIGN.md v1.1 conventions
- Uncommitted WIP (~16 files): about + methodology pages, layout, lattice, email-pill, social-pill-bar, skill-playbook, arc-timeline, glance-card, about/methodology/tools data files, plus NEW untracked `app/robots.ts`, `app/sitemap.ts`, `public/llms.txt`
- Build: `npm run build` (next build --webpack) · Lint: `npm run lint` (tsc --noEmit) · E2E: `npm run test:e2e` (Playwright, includes `navigation-stability.spec.ts`)
- Vercel-linked (`.vercel/project.json` present); `vercel deploy` = preview, `vercel deploy --prod` = production. Staging preview of this exact WIP deployed at handoff (2026-07-24): https://ryanportfolio-blj1i0qnl-hurleywglys-projects.vercel.app (SSO-protected preview — Ryan's login required; redeploy fresh if stale).

### Step A — Interview (first thing, before touching code)

Run a short AskUserQuestion interview (2–3 rounds max, multi-select where sensible) to define the plan. Seed it with the candidate lists in Step B and ask:

1. Which candidate REMAINING items are real, and what's missing from the list?
2. What does "looking good" mean for launch — which routes/themes must be pixel-checked?
3. Production target: merge to `main` + `vercel --prod`? Domain cutover needed?
4. Any items explicitly OUT of scope for this push?

### Step B — Write `PLAN.md` (repo root)

Format contract — super simple; each bullet is a short sentence or title, nothing more:

```markdown
# PLAN.md — Working Exhibit production push

## REMAINING
- [ ] <one short sentence per task, ordered for execution>

## COMPLETED
- [x] <one short sentence per shipped chunk>
```

**Candidate COMPLETED items** (from git log + prior session; confirm/trim with Ryan):
- [x] DESIGN.md token system, fonts, theme provider, route skeleton
- [x] Package prune (469 pkgs) and legacy code parked
- [x] Working Exhibit home page — 4 surfaces
- [x] /m mock-scale mobile variant with per-theme shelf/crew art
- [x] Real RW monogram SVG + true mobile lattice on /m
- [x] Zero-shift navigation (SSR footprints, constant chrome, scrollbar gutter)
- [x] Shelf composed as transparent per-theme SVGs
- [x] Real blog URL fix (blog.ryanwigley.com)
- [x] Playwright navigation-stability e2e spec
- [x] DESIGN.md v1.1 implementation conventions; /m hero to canon 48px
- [x] Metadata lane: sitemap.ts, robots.ts, llms.txt (in WIP, uncommitted)
- [x] Stage B partial page builds salvaged (about + methodology WIP)

**Candidate REMAINING items** (from prior session's stated chain; verify each — some may already be done in WIP):
- [ ] Finish about page build
- [ ] Finish methodology page build
- [ ] Finish any remaining pages from the four-page plan (identify which ones)
- [ ] Review pass: clean build, all six routes render, both themes
- [ ] Home pixel nits
- [ ] JSON-LD verify (prior session claimed metadata lane done — confirm)
- [ ] Per-area commits of WIP (only when Ryan says commit)
- [ ] Fresh preview deploy + Ryan review
- [ ] Merge to main + production deploy

### Step C — Multi-turn campaign loop

Each turn: pick the TOP unchecked item in PLAN.md → do it inline → verify (build/route/theme as relevant) → check it off in PLAN.md → report in one short paragraph → stop and hand back. Never batch multiple items into one turn unless Ryan asks. PLAN.md is the single source of truth; keep it current every turn.

## 3. Patterns and Learnings

- **Fleet-crash pattern**: Parallel page-build agents + app restarts = re-resumed orchestration state that rehydrates into 60–80GB heap. *When:* any temptation to fan out agents in this repo. *Why:* transcripts of fleets are heavy; desktop app auto-reopens session tabs on launch and re-resumes. → Single-threaded is the fix, not a preference.
- **Plan-file-as-campaign-state**: A dumb markdown checklist beats orchestration state — it survives crashes, costs nothing to rehydrate, and Ryan can edit it directly. *When:* any multi-session push. *Why:* state you can read off a file beats state you have to resume.
- **WIP-is-sacred**: The working tree is the latest truth (ahead of HEAD). Never reset/checkout/stash without explicit instruction.

## 4. Integration Plan

Prerequisites: fresh Claude Code session with cwd `~/my_projects/ryan_portfolio`; Vercel CLI authed; no other heavy sessions open.

- **Step 1: Confirm repo state** `[auto]` — Where: repo root. Do: `git status --short && git log -1 --oneline`; confirm branch `redesign/working-exhibit` and ~16 WIP files. Verify: matches "Repo state at handoff" above (file count may drift slightly if Ryan worked). Rollback: if wildly different, stop and ask Ryan what changed.
- **Step 2: Interview** `[manual]` — Where: in-session. Do: run Step A's AskUserQuestion rounds. Verify: Ryan has answered scope, quality bar, and production target. Rollback: n/a.
- **Step 3: Write PLAN.md** `[auto]` — Where: `PLAN.md` at repo root. Do: assemble from Step B candidates + interview answers, in the exact simple-bullet format. Verify: Ryan approves the list in one confirmation turn. Rollback: edit until approved.
- **Step 4: Run the campaign** `[auto, one item per turn]` — Where: repo. Do: Step C loop. Verify: each turn ends with PLAN.md updated + short report. Rollback: any failed task stays unchecked with a one-line blocker note under it.
- **Step 5: Ship** `[manual gate]` — Where: Vercel. Do: on Ryan's word — commits, merge to `main`, `vercel deploy --prod`. Verify: production URL renders all routes, both themes. Rollback: Vercel instant rollback to prior deployment.

## 5. Signals

- The interview may reveal WIP pages are further along than the REMAINING candidates imply — trust `git diff` over the prior session's narrative.
- `npm run build` early: it is the fastest truth about how far the WIP actually is.
- Consider proposing per-area commit boundaries during the campaign (nav / home / about / methodology / metadata) so the eventual commit turn is trivial — but only propose, never commit unprompted.
- If any single task feels like it "needs" parallelism, that's a signal to split it into two sequential PLAN.md bullets instead.

## 7. Sanitization Notes

Skipped (same-owner transfer). Machine-crash context retained deliberately as a behavioral guardrail.

---

*Dispatch complete.*
