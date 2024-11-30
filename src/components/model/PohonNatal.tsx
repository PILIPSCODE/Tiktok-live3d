"use client"
import { useAnimations, useGLTF, useScroll } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { Group } from "three"

useGLTF.preload("/3d/bangunan/Buildi.glb")

export default function Model8() {
    const group = useRef<Group>(null)
    const {scene } = useGLTF(
        "/3d/bangunan/Pohon_Natal.glb"
    )

    return (
        <group position={[0,-1,0]} ref={group}>
            <primitive  object={scene} scale={[3.5,3.5,3.5]}  position={[14,4,-20]} />
        </group>
    )
}