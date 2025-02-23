"use client"
import { useAnimations, useGLTF, useScroll } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { Group } from "three"

useGLTF.preload("/3d/bangunan/satelit_moon.glb")

export default function Model7() {
    const group = useRef<Group>(null)
    const { nodes, materials, animations, scene } = useGLTF(
        "/3d/bangunan/Kapal1.glb"
    )

    return (
        <group position={[0, -1, 0]} ref={group}>
            <primitive object={scene} scale={[4, 4, 4]} rotation={[0, -2, 0]} position={[0, 2, -8]} />
        </group>
    )
}