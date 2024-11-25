"use client"
import { useAnimations, useGLTF, useScroll } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { Group } from "three"

useGLTF.preload("/3d/PilKun.glb")
export default function Model3() {
    const group = useRef<Group>(null)
    const {scene, animations} = useGLTF(
        "/3d/PilKun.glb"
    )

    const { actions, clips } = useAnimations(animations, scene)
    useEffect(() => {
      //@ts-ignore
      actions["LeaningOnWall"].play()
    }, [])

    return (
        <>
        <group position={[0,-1,0]} ref={group}>
            <primitive  object={scene} scale={[0.7, 0.7, 0.7]} rotation={[0,-0.4,0]} position={[-0.3, 1, -4.9]}   />
        </group>
        </>
    )
}3