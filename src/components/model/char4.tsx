"use client"
import { useAnimations, useGLTF, useScroll } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { Group } from "three"

useGLTF.preload("/3d/Pilkia.glb")
export default function Model4() {
    const group = useRef<Group>(null)
    const {scene, animations} = useGLTF(
        "/3d/Pilkia.glb"
    )

    const { actions, clips } = useAnimations(animations, scene)
    useEffect(() => {
      //@ts-ignore
      actions["SittingLauging"].play()
    }, [])

    return (
        <>
       <spotLight position={[0, 5, 5]} angle={0.3} intensity={3} penumbra={1} /> 
        <group position={[0,-1,0]} ref={group}>
            <primitive  object={scene} scale={[0.8, 0.8, 0.8]} rotation={[0,-1,0]} position={[4.2,1.3,-5]}  />
        </group>
        </>
    )
}3