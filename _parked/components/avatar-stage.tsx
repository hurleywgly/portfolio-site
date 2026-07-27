"use client"

import { Suspense, useEffect, useMemo, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Grid, OrbitControls, useGLTF } from "@react-three/drei"
import * as THREE from "three"

export type AvatarViewMode = "home-rear" | "profile-front"

export const FALLBACK_AVATAR_MODEL = "/models/Xbot.glb"
export const RYAN_AVATAR_MODEL = "/models/ryan-avatar.glb"

type AvatarStageProps = {
  avatarX?: number
  background?: boolean
  className?: string
  interactive?: boolean
  modelPath?: string
  showAssetMarkers?: boolean
  viewMode?: AvatarViewMode
}

export function AvatarStage({
  avatarX = 0,
  background = true,
  className,
  interactive = false,
  modelPath = RYAN_AVATAR_MODEL,
  showAssetMarkers = false,
  viewMode = "home-rear",
}: AvatarStageProps) {
  return (
    <div className={className}>
      <Canvas
        className="!absolute !inset-0"
        camera={{ position: [0, 1.65, 5.6], fov: 36 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ height: "100%", width: "100%" }}
      >
        {background ? <color attach="background" args={["#070a0f"]} /> : null}
        <fog attach="fog" args={["#070a0f", 5.5, 12]} />
        <Suspense fallback={null}>
          <AvatarModel
            avatarX={avatarX}
            modelPath={modelPath}
            showAssetMarkers={showAssetMarkers}
            viewMode={viewMode}
          />
          <SystemsTree avatarX={avatarX} />
          <Environment preset="city" />
        </Suspense>
        <ambientLight intensity={0.75} />
        <directionalLight position={[2.5, 4.5, 2]} intensity={2.2} color="#f6d28b" />
        <pointLight position={[-2.5, 1.4, 2.8]} intensity={1.3} color="#82d2c8" />
        <Grid
          args={[10, 10]}
          cellSize={0.42}
          cellThickness={0.5}
          cellColor="#253449"
          sectionSize={2.1}
          sectionThickness={1}
          sectionColor="#d9a441"
          fadeDistance={9}
          fadeStrength={1.4}
          position={[0, -1.06, 0]}
        />
        {interactive ? (
          <OrbitControls
            enablePan={false}
            minDistance={3.5}
            maxDistance={7}
            minPolarAngle={Math.PI / 3.5}
            maxPolarAngle={Math.PI / 1.95}
            target={[avatarX, 0.62, 0]}
          />
        ) : null}
      </Canvas>
    </div>
  )
}

function AvatarModel({
  avatarX,
  modelPath,
  showAssetMarkers,
  viewMode,
}: {
  avatarX: number
  modelPath: string
  showAssetMarkers: boolean
  viewMode: AvatarViewMode
}) {
  const gltf = useGLTF(modelPath)
  const groupRef = useRef<THREE.Group>(null)
  const model = useMemo(() => gltf.scene.clone(true), [gltf.scene])
  const mixer = useMemo(() => new THREE.AnimationMixer(model), [model])
  const rotationY = viewMode === "home-rear" ? Math.PI : 0
  const isRyanAvatar = modelPath === RYAN_AVATAR_MODEL
  const modelScale = isRyanAvatar ? 0.86 : 1.02
  const modelY = isRyanAvatar ? -0.78 : -1.05

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = rotationY
    }
  }, [rotationY])

  useEffect(() => {
    model.traverse((object) => {
      if ("castShadow" in object) object.castShadow = true
      if ("receiveShadow" in object) object.receiveShadow = true
    })

    const idle =
      gltf.animations.find((clip) => /idle/i.test(clip.name)) ?? gltf.animations[0]

    if (!idle) return

    const action = mixer.clipAction(idle)
    action.fadeIn(0.2).play()

    return () => {
      action.fadeOut(0.2)
      mixer.stopAllAction()
    }
  }, [gltf.animations, mixer, model])

  useFrame((_, delta) => {
    mixer.update(delta)
  })

  return (
    <group ref={groupRef} position={[avatarX, modelY, 0]} rotation={[0, rotationY, 0]} scale={modelScale}>
      <primitive object={model} />
      {showAssetMarkers ? (
        <>
          <mesh position={[0, 1.78, -0.38]}>
            <boxGeometry args={[0.34, 0.28, 0.04]} />
            <meshStandardMaterial color="#b18433" roughness={0.78} metalness={0.08} />
          </mesh>
          <mesh position={[0, 1.8, 0.38]}>
            <sphereGeometry args={[0.06, 24, 24]} />
            <meshStandardMaterial color="#6ac6bd" emissive="#6ac6bd" emissiveIntensity={0.2} roughness={0.5} />
          </mesh>
        </>
      ) : null}
    </group>
  )
}

function SystemsTree({ avatarX }: { avatarX: number }) {
  const nodes = useMemo(
    () => [
      [-1.35, 0.25, -0.32],
      [-0.86, 0.92, -0.18],
      [-0.42, 1.52, -0.08],
      [0.34, 1.34, -0.16],
      [0.78, 0.72, -0.22],
      [1.28, 0.08, -0.36],
      [0, 2.02, -0.05],
    ] as const,
    [],
  )

  return (
    <group position={[avatarX, -0.2, -1.15]}>
      <mesh position={[0, 0.55, 0]}>
        <cylinderGeometry args={[0.025, 0.045, 2.5, 10]} />
        <meshStandardMaterial color="#7c5a2b" roughness={0.85} metalness={0.05} />
      </mesh>

      {nodes.map(([x, y, z], index) => (
        <TreeNode key={`${x}-${y}-${z}`} position={[x, y, z]} index={index} />
      ))}

      {nodes.slice(0, -1).map((node, index) => (
        <Branch
          key={`branch-${index}`}
          from={[0, 0.2 + index * 0.25, 0]}
          to={[node[0], node[1], node[2]]}
        />
      ))}
    </group>
  )
}

function TreeNode({
  position,
  index,
}: {
  position: readonly [number, number, number]
  index: number
}) {
  const color = index % 2 === 0 ? "#d9a441" : "#6ac6bd"

  return (
    <mesh position={position}>
      <sphereGeometry args={[0.055, 18, 18]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.35} roughness={0.45} />
    </mesh>
  )
}

function Branch({
  from,
  to,
}: {
  from: readonly [number, number, number]
  to: readonly [number, number, number]
}) {
  const points = useMemo(
    () => [new THREE.Vector3(...from), new THREE.Vector3(...to)],
    [from, to],
  )
  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points])

  return (
    <line geometry={geometry}>
      <lineBasicMaterial color="#d9a441" transparent opacity={0.42} />
    </line>
  )
}

useGLTF.preload(RYAN_AVATAR_MODEL)
useGLTF.preload(FALLBACK_AVATAR_MODEL)
