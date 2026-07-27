# VRoid + Blender Avatar Runbook

## Current Working Asset

There is now a first local procedural avatar:

```text
public/models/ryan-avatar.glb
assets/avatar/source/ryan-avatar.blend
scripts/generate-ryan-avatar.py
```

It is intentionally a rough web-ready stand-in, not the final photo-likeness pass. It already captures the core direction: rear-facing tan/Oak jacket, black pants, calm stylized character, front-facing profile option, and local GLB ownership.

Preview:

```text
http://localhost:3000/avatar-spike
```

## Shortest Path

1. Install VRoid Studio.
2. Create a new full-body masculine avatar from a preset.
3. Shape the face/hair by hand using Ryan's photo as a loose reference only.
4. Build the outfit in VRoid: tan/Oak workwear jacket, black pants, neutral shirt, dark shoes.
5. Export from VRoid Studio as `.vrm`.
6. Open Blender and install/enable the **VRM format** add-on.
7. Import the `.vrm` into Blender.
8. Fix scale, origin, forward axis, materials, and any obvious clothing clipping.
9. Export from Blender as binary glTF: `.glb`.
10. Save the web runtime asset as `public/models/ryan-avatar.glb`.
11. Preview locally at `/avatar-spike?model=/models/ryan-avatar.glb`.

## VRoid Settings

- Start from the least anime-looking masculine preset.
- Reduce eye size and stylized shine.
- Keep facial features soft and caricatured, not realistic.
- Use the jacket as the main rear-view identity signal.
- Prefer matte fabric colors:
  - Jacket: Oak/tan canvas.
  - Pants: Onyx black.
  - Shirt: off-white, gray, or black.
  - Shoes: dark minimal.

## Clothing Target

- Jacket reference: Rhythm Men's James Jacket in Oak.
  - Tan/Oak canvas.
  - Classic fit.
  - Contrast collar.
  - Metal zipper.
  - Subtle workwear durability.
- Pants reference: AETHER Fairfax Pant in Onyx Black.
  - Garment-dyed stretch twill.
  - Classic fit.
  - Slight taper.
  - Restrained right-leg cargo pocket.

## Blender Checklist

- Install the VRM add-on from Blender's Extensions/Preferences if VRM import is missing.
- Import `.vrm`.
- Save a source `.blend`.
- Set origin near the feet, centered on the body.
- Confirm forward-facing axis and rotate if needed.
- Apply transforms before export.
- Simplify shiny materials into matte fabric.
- Check rear view first; the homepage uses the back silhouette.
- Export as `glTF 2.0`, format `glTF Binary (.glb)`.
- Test in the portfolio route before polishing further.

## File Naming

```text
assets/avatar/source/ryan-avatar.vroid
assets/avatar/source/ryan-avatar.vrm
assets/avatar/source/ryan-avatar.blend
public/models/ryan-avatar.glb
```

## Acceptance Check

- `/avatar-spike?model=/models/ryan-avatar.glb` loads with no browser errors.
- Home rear view reads as Ryan from jacket silhouette and posture.
- Profile front view reads calm and premium, not mascot/gamey.
- The model is under 10 MB, ideally under 5 MB.
- The `.glb` is owned locally and does not depend on a hosted avatar service.
