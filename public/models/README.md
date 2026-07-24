# Avatar Model Drop Zone

Put exported web-ready avatar assets here.

Expected production filename:

```text
public/models/ryan-avatar.glb
```

This file currently exists as a generated first-pass avatar. Regenerate it with:

```text
/Applications/Blender.app/Contents/MacOS/Blender -b --python scripts/generate-ryan-avatar.py
```

To preview it in the local spike:

```text
http://localhost:3000/avatar-spike?model=/models/ryan-avatar.glb
```

Keep source files outside the public runtime path if they are large:

```text
assets/avatar/source/ryan-avatar.vroid
assets/avatar/source/ryan-avatar.vrm
assets/avatar/source/ryan-avatar.blend
```
