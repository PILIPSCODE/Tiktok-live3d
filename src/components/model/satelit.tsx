"use client"
import { useAnimations, useGLTF, useScroll } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { Group } from "three"

// useGLTF.preload("/3d/bangunan/satelit_groun.glb")

export default function Model8() {
    const group = useRef<Group>(null)
    const { nodes, materials, animations, scene } = useGLTF(
        "/3d/bangunan/satelit_groun.glb"
    )

    return (
        <group position={[0,-1,0]} ref={group}>
            <primitive  object={scene} scale={[2,2,2]} position={[8,1.4,-20]} />
        </group>
    )
}