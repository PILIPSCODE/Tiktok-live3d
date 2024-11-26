"use client"
import { useAnimations, useGLTF, useScroll } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { Group } from "three"

// useGLTF.preload("/3d/pet/model_Animation_Walking_withSkin.glb")

export default function Model6() {
    const group = useRef<Group>(null)
    const { nodes, materials, animations, scene } = useGLTF(
        "/3d/pet/model_Animation_Walking_withSkin.glb"
    )
    const { actions, clips } = useAnimations(animations, scene)
    useEffect(() => {
        console.log(actions)
        //@ts-ignore
        actions["Armature|Unreal Take|baselayer"].play()
      }, [])
 

    return (
        <group position={[0,-1,0]} ref={group}>
            <primitive  object={scene} scale={[0.7, 0.7, 0.7]} position={[-1, 1, -1]}  />
        </group>
    )
}