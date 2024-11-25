"use client"
import { useAnimations, useGLTF, useScroll } from "@react-three/drei"
import { useEffect, useRef } from "react"
import { Group } from "three"

type prop = {
    position:number[],
}

useGLTF.preload("/3d/bangunan/Buildi.glb")
export default function Model6(props:prop) {
    const group = useRef<Group>(null)
    const {scene } = useGLTF(
        "/3d/bangunan/Buildi.glb"
    )

    return (
        <group position={[0,-1,0]} ref={group}>
            <primitive  object={scene.clone()} scale={[4,4,4]}  position={props.position} />
        </group>
    )
}
