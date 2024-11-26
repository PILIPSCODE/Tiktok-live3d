"use client"
import { useAnimations, useGLTF, useScroll } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { Group } from "three"

// useGLTF.preload("/3d/bangunan/satelit_moon.glb")

export default function Model7() {
    const group = useRef<Group>(null)
    const { nodes, materials, animations, scene } = useGLTF(
        "/3d/bangunan/satelit_moon.glb"
    )

    return (
        <group position={[0,-1,0]} ref={group}>
            <primitive  object={scene} scale={[1,1,1]} rotation={[1,-3,2]}  position={[5,4,-10]} />
        </group>
    )
}