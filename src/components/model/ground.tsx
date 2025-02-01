"use client"
import { useGLTF } from "@react-three/drei"
import { useRef } from "react"

useGLTF.preload("/3d/bangunan/Ground.glb")

export default function Model5() {
    const group = useRef(null)
    const { scene } = useGLTF("/3d/bangunan/Ground.glb")

    return (
        <group position={[0, -1, 0]} ref={group}>
            <primitive object={scene} scale={[23, 20, 23]} position={[0, -0.5, 0]} />
        </group>
    )
}
