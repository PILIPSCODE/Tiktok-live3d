"use client"
import { useAnimations, useGLTF, useScroll } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { Group } from "three"


// useGLTF.preload("/3d/bangunan/Kursi_Angkasa.glb")
export default function Model9() {
    const group = useRef<Group>(null)
    const { scene } = useGLTF(
        "/3d/bangunan/Kursi_Angkasa.glb"
    )

    return (
        <group position={[0,-1,0]} ref={group}>
            <primitive  object={scene} scale={[1,1,1]} rotation={[0,-1,0]} position={[5,1.7,-6]} />
        </group>
    )
}