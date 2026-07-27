from __future__ import annotations

import math
from pathlib import Path

import bpy
from mathutils import Vector


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "models" / "ryan-avatar.glb"
SOURCE_BLEND = ROOT / "assets" / "avatar" / "source" / "ryan-avatar.blend"


def clear_scene() -> None:
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete()


def material(name: str, color: tuple[float, float, float, float], roughness: float = 0.75) -> bpy.types.Material:
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get("Principled BSDF")
    if bsdf:
        bsdf.inputs["Base Color"].default_value = color
        bsdf.inputs["Roughness"].default_value = roughness
        bsdf.inputs["Metallic"].default_value = 0.0
    return mat


SKIN = material("warm stylized skin", (0.78, 0.52, 0.42, 1), 0.82)
HAIR = material("medium brown side-swept hair", (0.20, 0.15, 0.105, 1), 0.88)
HAIR_DARK = material("dark hair shadow", (0.09, 0.06, 0.045, 1), 0.9)
EYE_BLUE = material("soft blue gray eyes", (0.38, 0.55, 0.68, 1), 0.62)
STUBBLE = material("subtle brown stubble", (0.28, 0.18, 0.14, 1), 0.9)
JACKET = material("oak tan canvas jacket", (0.61, 0.42, 0.19, 1), 0.9)
JACKET_DARK = material("dark contrast collar and cuffs", (0.12, 0.105, 0.085, 1), 0.88)
SHIRT = material("quiet off-white shirt", (0.78, 0.73, 0.64, 1), 0.78)
PANTS = material("onyx black twill pants", (0.02, 0.024, 0.027, 1), 0.86)
PANTS_DETAIL = material("black twill pocket stitching", (0.055, 0.06, 0.065, 1), 0.86)
SHOES = material("dark minimal shoes", (0.012, 0.012, 0.014, 1), 0.7)
METAL = material("muted zipper metal", (0.66, 0.57, 0.43, 1), 0.45)


def assign(obj: bpy.types.Object, mat: bpy.types.Material) -> bpy.types.Object:
    obj.data.materials.append(mat)
    return obj


def smooth(obj: bpy.types.Object) -> bpy.types.Object:
    bpy.context.view_layer.objects.active = obj
    obj.select_set(True)
    bpy.ops.object.shade_smooth()
    obj.select_set(False)
    return obj


def rounded_cube(
    name: str,
    loc: tuple[float, float, float],
    scale: tuple[float, float, float],
    mat: bpy.types.Material,
    bevel: float = 0.04,
) -> bpy.types.Object:
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc)
    obj = bpy.context.object
    obj.name = name
    obj.dimensions = scale
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    if bevel:
        mod = obj.modifiers.new("small bevel", "BEVEL")
        mod.width = bevel
        mod.segments = 5
        obj.modifiers.new("weighted normals", "WEIGHTED_NORMAL")
    assign(obj, mat)
    return obj


def sphere(
    name: str,
    loc: tuple[float, float, float],
    scale: tuple[float, float, float],
    mat: bpy.types.Material,
) -> bpy.types.Object:
    bpy.ops.mesh.primitive_uv_sphere_add(segments=32, ring_count=16, radius=1, location=loc)
    obj = bpy.context.object
    obj.name = name
    obj.scale = scale
    assign(obj, mat)
    smooth(obj)
    return obj


def cylinder_between(
    name: str,
    loc: tuple[float, float, float],
    radius: float,
    depth: float,
    mat: bpy.types.Material,
    rotation: tuple[float, float, float] = (0, 0, 0),
    vertices: int = 24,
) -> bpy.types.Object:
    bpy.ops.mesh.primitive_cylinder_add(vertices=vertices, radius=radius, depth=depth, location=loc, rotation=rotation)
    obj = bpy.context.object
    obj.name = name
    assign(obj, mat)
    smooth(obj)
    return obj


def cylinder_between_points(
    name: str,
    start: tuple[float, float, float],
    end: tuple[float, float, float],
    radius: float,
    mat: bpy.types.Material,
    vertices: int = 24,
) -> bpy.types.Object:
    start_v = Vector(start)
    end_v = Vector(end)
    midpoint = (start_v + end_v) / 2
    direction = end_v - start_v
    length = direction.length

    bpy.ops.mesh.primitive_cylinder_add(vertices=vertices, radius=radius, depth=length, location=midpoint)
    obj = bpy.context.object
    obj.name = name
    obj.rotation_euler = direction.to_track_quat("Z", "Y").to_euler()
    assign(obj, mat)
    smooth(obj)
    return obj


def capsule_between(
    name: str,
    start: tuple[float, float, float],
    end: tuple[float, float, float],
    radius: float,
    mat: bpy.types.Material,
) -> None:
    cylinder_between_points(f"{name} shaft", start, end, radius, mat)
    sphere(f"{name} cap A", start, (radius, radius, radius), mat)
    sphere(f"{name} cap B", end, (radius, radius, radius), mat)


def capsule_limb(
    name: str,
    loc: tuple[float, float, float],
    radius: float,
    length: float,
    mat: bpy.types.Material,
    rotation: tuple[float, float, float] = (0, 0, 0),
) -> None:
    cylinder_between(f"{name} shaft", loc, radius, length, mat, rotation)

    # Cylinder local Z axis endpoints transformed for simple horizontal/vertical limbs.
    rz = rotation[1]
    if abs(rz - math.pi / 2) < 0.01:
        dx = length / 2
        sphere(f"{name} cap A", (loc[0] - dx, loc[1], loc[2]), (radius, radius, radius), mat)
        sphere(f"{name} cap B", (loc[0] + dx, loc[1], loc[2]), (radius, radius, radius), mat)
    else:
        dz = length / 2
        sphere(f"{name} cap A", (loc[0], loc[1], loc[2] - dz), (radius, radius, radius), mat)
        sphere(f"{name} cap B", (loc[0], loc[1], loc[2] + dz), (radius, radius, radius), mat)


def build_avatar() -> None:
    clear_scene()

    # Body is front-facing toward negative Y in Blender; glTF export maps it into
    # the Three scene where the route can rotate rear/front views.
    rounded_cube("off-white shirt visible at jacket opening", (0, -0.23, 1.17), (0.4, 0.07, 0.42), SHIRT, 0.025)
    rounded_cube("oak tan jacket torso", (0, 0, 1.2), (0.66, 0.34, 0.78), JACKET, 0.09)
    rounded_cube("relaxed jacket shoulders", (0, 0.01, 1.48), (0.82, 0.33, 0.2), JACKET, 0.09)
    rounded_cube("slightly wider jacket hem", (0, 0, 0.84), (0.72, 0.38, 0.16), JACKET, 0.055)
    rounded_cube("dark contrast collar", (0, -0.13, 1.63), (0.48, 0.1, 0.12), JACKET_DARK, 0.025)
    rounded_cube("rear jacket shoulder yoke", (0, 0.2, 1.48), (0.68, 0.045, 0.08), JACKET_DARK, 0.015)
    rounded_cube("vertical metal zipper", (0, -0.218, 1.18), (0.025, 0.018, 0.54), METAL, 0.004)
    rounded_cube("left jacket pocket seam", (-0.22, -0.22, 1.05), (0.18, 0.018, 0.12), JACKET_DARK, 0.006)
    rounded_cube("right jacket pocket seam", (0.22, -0.22, 1.05), (0.18, 0.018, 0.12), JACKET_DARK, 0.006)

    sphere("neck", (0, 0, 1.68), (0.13, 0.12, 0.14), SKIN)
    sphere("stylized head", (0, -0.02, 1.94), (0.22, 0.19, 0.29), SKIN)
    sphere("brown hair cap", (0, 0.015, 2.12), (0.225, 0.19, 0.105), HAIR)
    rounded_cube("side swept front hair mass", (-0.055, -0.13, 2.13), (0.31, 0.12, 0.075), HAIR, 0.045)
    rounded_cube("right side hair volume", (0.22, 0.0, 2.015), (0.08, 0.14, 0.22), HAIR_DARK, 0.04)
    rounded_cube("left temple hair volume", (-0.22, -0.015, 2.0), (0.07, 0.1, 0.16), HAIR, 0.035)
    rounded_cube("subtle hair back block", (0, 0.12, 2.04), (0.34, 0.09, 0.18), HAIR_DARK, 0.05)
    sphere("left soft blue eye", (-0.075, -0.198, 1.98), (0.023, 0.008, 0.016), EYE_BLUE)
    sphere("right soft blue eye", (0.075, -0.198, 1.98), (0.023, 0.008, 0.016), EYE_BLUE)
    rounded_cube("left calm brow", (-0.075, -0.205, 2.025), (0.085, 0.008, 0.012), HAIR_DARK, 0.003)
    rounded_cube("right calm brow", (0.075, -0.205, 2.025), (0.085, 0.008, 0.012), HAIR_DARK, 0.003)
    rounded_cube("soft nose plane", (0, -0.205, 1.92), (0.035, 0.015, 0.075), SKIN, 0.012)
    rounded_cube("slight friendly smile line", (0, -0.21, 1.835), (0.12, 0.01, 0.012), HAIR_DARK, 0.004)
    rounded_cube("light moustache shadow", (0, -0.212, 1.865), (0.15, 0.008, 0.016), STUBBLE, 0.006)
    rounded_cube("small chin stubble", (0, -0.205, 1.75), (0.12, 0.012, 0.05), STUBBLE, 0.012)

    # Relaxed arms: down at the sides rather than T-pose, readable from rear.
    capsule_between("left tan jacket upper sleeve", (-0.42, 0.0, 1.42), (-0.62, -0.005, 1.08), 0.095, JACKET)
    capsule_between("right tan jacket upper sleeve", (0.42, 0.0, 1.42), (0.62, -0.005, 1.08), 0.095, JACKET)
    capsule_between("left tan jacket forearm", (-0.62, -0.005, 1.08), (-0.58, -0.02, 0.78), 0.078, JACKET)
    capsule_between("right tan jacket forearm", (0.62, -0.005, 1.08), (0.58, -0.02, 0.78), 0.078, JACKET)
    rounded_cube("left dark cuff", (-0.58, -0.02, 0.78), (0.14, 0.12, 0.08), JACKET_DARK, 0.025)
    rounded_cube("right dark cuff", (0.58, -0.02, 0.78), (0.14, 0.12, 0.08), JACKET_DARK, 0.025)
    sphere("left relaxed hand", (-0.58, -0.04, 0.7), (0.07, 0.05, 0.085), SKIN)
    sphere("right relaxed hand", (0.58, -0.04, 0.7), (0.07, 0.05, 0.085), SKIN)

    rounded_cube("onyx black pelvis", (0, 0, 0.66), (0.48, 0.3, 0.28), PANTS, 0.07)
    capsule_between("left onyx pant upper leg", (-0.15, 0, 0.6), (-0.18, -0.005, 0.32), 0.105, PANTS)
    capsule_between("right onyx pant upper leg", (0.15, 0, 0.6), (0.18, -0.005, 0.32), 0.105, PANTS)
    capsule_between("left onyx pant lower leg", (-0.18, -0.005, 0.32), (-0.2, -0.005, 0.03), 0.092, PANTS)
    capsule_between("right onyx pant lower leg", (0.18, -0.005, 0.32), (0.2, -0.005, 0.03), 0.092, PANTS)
    rounded_cube("right leg restrained cargo pocket", (0.31, -0.045, 0.38), (0.12, 0.03, 0.2), PANTS_DETAIL, 0.012)
    rounded_cube("left shoe", (-0.2, -0.055, -0.1), (0.23, 0.36, 0.1), SHOES, 0.04)
    rounded_cube("right shoe", (0.2, -0.055, -0.1), (0.23, 0.36, 0.1), SHOES, 0.04)

    # Rear-view identity details.
    rounded_cube("rear oak jacket center seam", (0, 0.205, 1.2), (0.025, 0.025, 0.54), JACKET_DARK, 0.004)
    rounded_cube("rear oak jacket bottom seam", (0, 0.205, 0.9), (0.58, 0.025, 0.025), JACKET_DARK, 0.004)

    # Add a simple armature-like empty for easier future rigging reference.
    bpy.ops.object.empty_add(type="PLAIN_AXES", location=(0, 0, 0))
    bpy.context.object.name = "avatar origin feet center"

    # Camera and lights are saved in the source file only; they do not matter for GLB runtime.
    bpy.ops.object.light_add(type="AREA", location=(0, -4, 4))
    light = bpy.context.object
    light.name = "soft studio area light"
    light.data.energy = 450
    light.data.size = 5

    bpy.ops.object.camera_add(location=(0, -4.2, 1.25), rotation=(math.radians(78), 0, 0))
    bpy.context.scene.camera = bpy.context.object

    # Move model so feet sit at z=0 for predictable web placement.
    for obj in bpy.context.scene.objects:
        if obj.type == "MESH":
            obj.location.z += 0.1

    bpy.ops.object.select_all(action="DESELECT")
    for obj in bpy.context.scene.objects:
        if obj.type == "MESH":
            obj.select_set(True)
    bpy.context.view_layer.objects.active = next(obj for obj in bpy.context.scene.objects if obj.type == "MESH")

    SOURCE_BLEND.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    bpy.ops.wm.save_as_mainfile(filepath=str(SOURCE_BLEND))
    bpy.ops.export_scene.gltf(
        filepath=str(OUTPUT),
        export_format="GLB",
        use_selection=True,
        export_apply=True,
        export_materials="EXPORT",
    )


if __name__ == "__main__":
    build_avatar()
