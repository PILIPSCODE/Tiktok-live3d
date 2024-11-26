"use client"
import { useAnimations, useGLTF, useScroll } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { Group } from "three"

// useGLTF.preload("/3d/bangunan/Ground.glb")

export default function Model5() {
    const group = useRef<Group>(null)
    const { nodes, materials, animations, scene } = useGLTF(
        "/3d/bangunan/Ground.glb"
    )

    return(
    <>
        <group position={[0, -1, 0]} ref={group}>
            <primitive object={scene} scale={[23, 20, 23]} position={[0, -0.5, 0]} />
        </group>
    </>
    )
}