"use client"
import { useAnimations, useGLTF, useScroll } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { Group } from "three"

// useGLTF.preload("/3d/PilGirl.glb")
export default function Model2() {
    const group = useRef<Group>(null)
    const {scene, animations} = useGLTF(
        "/3d/PilGirl.glb"
    )

    const { actions, clips } = useAnimations(animations, scene)
    useEffect(() => {
      //@ts-ignore
      actions["Floating"].play()
    }, [])

    return (
        <>
        <group position={[0,-1,0]} ref={group}>
            <primitive  object={scene} scale={[0.8, 0.8, 0.8]}position={[0.1, 3, -7]}   />
        </group>
        </>
    )
}3