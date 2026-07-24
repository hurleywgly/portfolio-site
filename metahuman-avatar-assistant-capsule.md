# METAHUMAN-AVATAR-ASSISTANT.CAPSULE.md

> Handoff for a separate Codex/computer to assist Ryan with creating a realistic MetaHuman-quality portfolio avatar.

**Version:** 1.0
**Created:** 2026-06-27
**From:** Ryan portfolio avatar exploration thread
**To:** Separate Codex agent on another computer assisting Ryan interactively
**Purpose:** Transfer the avatar direction, rejected paths, current best pipeline options, and practical assistant behavior needed to help Ryan create a realistic digital double for his portfolio site.
**Tier:** Standard
**Category:** Conversation Thread
**Archetype:** Handoff

---

## 1. Dispatch Summary

Ryan is exploring a 3D avatar for his personal portfolio. The target is no longer a stylized cartoon, Ready Player Me avatar, or procedural caricature. The desired result is a near-identical realistic digital double: "Ryan as if jumped into a 3D movie/video game," wearing a tan/Oak jacket and black pants.

A local Three.js/React Three Fiber spike already proved that the portfolio can load a GLB, render a rear-facing home view, and render a front-facing profile view. The generated procedural placeholder was rejected because it got clothing colors roughly right but did not look like Ryan. The receiving agent should treat likeness quality as the hard requirement and use MetaHuman as the quality bar.

The separate-computer assistant should help Ryan with the MetaHuman/Unreal workflow, reference capture, export planning, and fallback comparisons. It should not upload Ryan's photos or transmit personal files to any service without explicit, service-specific permission.

---

## 2. Core Content

### Target Experience

- Homepage: rear-facing or three-quarter rear realistic Ryan avatar standing inside a premium technical UI scene.
- Profile/About page: same character can turn around or appear front-facing.
- Environment metaphor: living tree plus systems-grid, premium technical/product feel.
- Tone: realistic, calm, refined, not goofy, not gamey, not anime, not cartoon.
- Wardrobe:
  - Tan/Oak canvas workwear jacket, inspired by Rhythm Men's James Jacket in Oak.
  - Black pants, inspired by AETHER Fairfax Pant in Onyx Black.
  - Neutral shirt.
  - Dark minimal shoes.
  - No visible brand marks or logos.

### Current Decision

Use **MetaHuman as the primary quality target**. It is the closest fit for the "realistic digital human" look Ryan reacted positively to.

However, MetaHuman may not be the simplest web-export pipeline. The practical framing is:

1. **Best visual ceiling:** MetaHuman.
2. **Best final controllability outside Epic:** Reallusion Character Creator + Headshot, possibly with KeenTools FaceBuilder or a phone scan.
3. **Fastest same-day likeness test:** Avaturn or in3D.
4. **Best use of generative 3D tools like Tripo:** tree/grid/props/background objects, not the main Ryan avatar.

### Rejected Direction

The local procedural GLB placeholder is rejected as art direction. It can stay as a loader/scene test only.

If the receiving agent sees a file such as `public/models/ryan-avatar.glb` or a procedural Blender script in the portfolio repo, do not treat it as the target avatar. It proves:

- GLB files can load in the site.
- Rear/front orientation switching works.
- A Three.js scene can hold the character and systems-tree/grid.

It does not prove:

- Likeness.
- Clothing realism.
- Final quality.

### Practical Role for Computer Use

Computer use can help, but should be used as an assistant, not an autonomous replacement for Ryan's taste judgment.

Good tasks for the agent:

- Guide Epic Launcher and Unreal setup.
- Read official docs and translate steps.
- Help Ryan navigate MetaHuman Creator UI.
- Compare screenshots against the target brief.
- Track decisions and export settings.
- Automate Blender cleanup when assets are exported.
- Integrate final GLB into the portfolio spike.

Tasks that should remain Ryan-controlled:

- Epic login and account setup.
- CAPTCHAs or auth prompts.
- Paid asset purchase decisions.
- Uploading Ryan's photos, scans, or personal files.
- Final likeness judgment.
- Any terms/privacy consent.

### Official and Useful Source Links

The receiving agent should re-open these rather than relying only on this capsule, because tool workflows can change:

- MetaHuman Create: https://www.metahuman.com/create
- MetaHuman download/install: https://www.metahuman.com/download
- MetaHuman license: https://www.metahuman.com/license
- MetaHuman docs home: https://dev.epicgames.com/documentation/metahuman
- Getting started with MetaHuman Creator: https://dev.epicgames.com/documentation/metahuman/getting-started-with-metahuman-creator
- MetaHuman Creator in Unreal Engine: https://dev.epicgames.com/documentation/metahuman/metahuman-creator-in-unreal-engine
- Mesh to MetaHuman: https://dev.epicgames.com/documentation/metahuman/from-mesh
- MetaHuman workflow changes: https://dev.epicgames.com/documentation/metahuman/metahuman-workflow-changes
- Reallusion Character Creator: https://www.reallusion.com/character-creator/
- Reallusion Headshot: https://www.reallusion.com/character-creator/headshot/
- Avaturn: https://avaturn.me/
- in3D: https://in3d.io/

### Current Working Assumptions

- Ryan can use a free Epic account for the early MetaHuman workflow.
- Unreal Engine is needed for the current MetaHuman workflow.
- The web portfolio runtime should still standardize on optimized `.glb` even if authoring happens in Unreal, Character Creator, Blender, or another DCC.
- Use `.fbx` as interchange when moving between Unreal, Mixamo, Character Creator, and Blender.
- Keep source files too: `.uasset`/Unreal project, `.blend`, Character Creator project files, and source textures.
- If the avatar is too heavy for web, keep MetaHuman as render/reference and make a lighter web avatar derived from it.

---

## 3. Patterns and Learnings

- **Name:** Likeness First
  **What:** Judge every pipeline by whether it can create a recognizable Ryan, not whether it can create a nice generic avatar.
  **When:** Choosing between MetaHuman, Character Creator, Avaturn, Ready Player Me, VRoid, Tripo, or procedural Blender.
  **Why:** The failed procedural prototype proved that good colors/silhouette are not enough. The avatar must read as Ryan.

- **Name:** Authoring Tool vs Web Runtime
  **What:** Separate the high-end tool used to make the avatar from the lightweight format used on the site.
  **When:** MetaHuman or Character Creator produce assets too complex for direct web loading.
  **Why:** Unreal can be the authoring environment while the portfolio uses optimized GLB via Three.js/R3F.

- **Name:** Two-Tool Bakeoff
  **What:** Run one high-ceiling MetaHuman attempt and one simpler photo-avatar/Character Creator attempt, then compare in the same web scene.
  **When:** Ryan asks whether MetaHuman is worth the complexity.
  **Why:** A side-by-side likeness and pipeline effort comparison beats abstract tool ranking.

- **Name:** Explicit Photo Consent
  **What:** Before uploading Ryan's photo/scan to any third-party site, ask for explicit approval naming the service and files.
  **When:** Any workflow step involves Avaturn, in3D, Headshot, Mesh to MetaHuman, cloud upload, or external AI processing.
  **Why:** The avatar depends on personal likeness data. The agent should not transmit it implicitly.

- **Name:** Generative 3D for Environment, Not Likeness
  **What:** Use Tripo/Meshy/text-to-3D for tree, grid, props, or background objects; avoid using them as the main Ryan avatar source.
  **When:** The user asks where AI 3D generation fits.
  **Why:** Current image/text-to-3D humanoids usually create topology, UV, rigging, and consistency cleanup debt.

---

## 4. Integration Plan

**Prerequisites**

- A computer that can run Epic Games Launcher and Unreal Engine.
- Free Epic account access.
- Sufficient disk space for Unreal and MetaHuman assets.
- Optional: Blender installed for cleanup/export inspection.
- Optional: a working copy of Ryan's portfolio repo if the agent will test web integration.
- Ryan available for login, consent, and likeness review.

**Step 1: Reconfirm Tool State** `[auto]`

Where: Browser/docs on the receiving computer.

Do: Open current MetaHuman docs and confirm whether Creator, Mesh to MetaHuman, and export workflows are still Unreal-based. Check install requirements and whether Epic has changed account, license, or plugin steps.

Verify: The agent can summarize the current path with official links and note anything that changed since this capsule.

Rollback: If MetaHuman access has changed, switch to the Character Creator/Headshot or Avaturn/in3D fallback path.

**Step 2: Install and Launch MetaHuman Authoring Stack** `[manual + assisted]`

Where: Epic Games Launcher and Unreal Engine on Ryan's computer.

Do: Ryan logs into Epic. Agent guides install of Unreal Engine and any MetaHuman Creator/Core Data/plugin requirements. The agent can point, narrate, and document, but Ryan handles account-sensitive steps.

Verify: Unreal opens a project with MetaHuman tooling visible or the official web/launcher flow is reachable.

Rollback: If install is too slow or blocked, capture blocker details and move to Step 6 for a faster external-avatar test.

**Step 3: Build the First MetaHuman Likeness Pass** `[manual + assisted]`

Where: MetaHuman Creator / Unreal.

Do: Create a first realistic Ryan-like character. Use Ryan's taste calls continuously. If using photo/mesh/footage, pause before upload and ask explicit permission: "Do you want me to upload [file names] to [service] for [purpose]?"

Verify: Ryan can say whether the likeness is directionally close enough to continue.

Rollback: If it remains generic after a reasonable pass, document what is missing: head shape, hair, eyes, jaw, stubble, expression, body proportions, or wardrobe.

**Step 4: Wardrobe Direction** `[manual + assisted]`

Where: MetaHuman wardrobe, Fab, Character Creator fallback, or Blender/Marvelous-style clothing route.

Do: Aim for the tan/Oak jacket and black pants. Do not over-index on exact product reproduction or logos. Prioritize silhouette, fabric material, color, and understated founder/technical taste.

Verify: Rear view reads as tan jacket + black pants; front view feels realistic and premium.

Rollback: If MetaHuman wardrobe is too limited, use MetaHuman for head/body likeness and solve clothes in Character Creator, Blender, or paid/free Fab assets.

**Step 5: Export/Bridge Plan** `[auto + assisted]`

Where: Unreal, Blender, or portfolio repo.

Do: Determine the cleanest way to get a web-usable asset:

- Direct GLB if available and good enough.
- FBX out to Blender, then GLB.
- Rendered/video fallback if real-time web export is too heavy.
- Lighter derived avatar if MetaHuman asset is too complex.

Verify: A test asset can be opened in Blender or a GLB viewer with correct scale, materials, and orientation.

Rollback: If export is blocked, preserve screenshots and use them to guide Character Creator/Headshot or a commissioned/agent-assisted Blender pass.

**Step 6: Run a Fast Fallback Bakeoff if Needed** `[auto + manual consent]`

Where: Avaturn, in3D, Avatar SDK, Character Creator/Headshot trial, or equivalent.

Do: Create one lower-friction photo-derived avatar and compare it against the MetaHuman pass. Again, no photo upload without explicit service-specific approval.

Verify: Ryan can rank:

- Likeness.
- Clothing control.
- Export quality.
- Time/complexity.
- Web-readiness.

Rollback: If none are close, recommend professional scan/artist pass or MetaHuman as reference-only.

**Step 7: Portfolio Integration** `[auto]`

Where: Ryan portfolio repo, if available.

Do: Place optimized runtime model in `public/models/`, load it through the existing R3F avatar stage or a replacement stage, and test:

- `/avatar-spike` for rear/front switch.
- Homepage rear-facing composition.
- About/profile front-facing composition.
- Mobile crop and performance.

Verify: Local page loads with no console errors; avatar appears believable from rear view first.

Rollback: If the asset is too heavy or broken, keep it out of homepage/about and only test in `/avatar-spike`.

---

## 5. Signals

- If Ryan says "this looks like a generic guy," stop optimizing the web scene and return to likeness creation.
- If the face is close but clothes are wrong, keep the head/body pipeline and solve wardrobe separately.
- If clothes are close but face is wrong, discard the asset as final-art direction.
- If MetaHuman looks excellent but export is painful, consider rendering stills/video for the hero first and defer real-time web character.
- If an avatar tool only exports cartoon/stylized output, classify it as a prototype or reference path, not the final path.
- If the web version loses the premium feel because of compression, use higher-quality static hero media and reserve real-time 3D for an interactive detail page.
- Keep Ryan in the loop at each visual checkpoint; the agent should not declare likeness success alone.

---

## 6. Sanitization Notes

Sanitization skipped under same-owner handoff assumptions. No credentials, tokens, private files, or uploaded photos are included. The capsule includes Ryan's name and portfolio context because the receiving agent is intended to assist Ryan directly.

Unavailable capsule lenses: Synthesizer and Guardian lens files were not present under the local capsule skill directory, so the capsule was assembled using the default Standard-tier perspective.

---

*Dispatch complete.*
