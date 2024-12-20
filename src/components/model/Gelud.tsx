"use client"
import { useAnimations, useGLTF, useScroll } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { Group } from "three"
import { useTiktok } from "@/app/AppProvider"

useGLTF.preload("/3d/Gelud.glb")
export default function ModelGelud() {
    const group = useRef<Group>(null)
    const { Animation,SetAnimation } = useTiktok();
    const animate  = Animation !== ""? Animation:"Idle"
    const {scene, animations} = useGLTF(
        "/3d/Gelud.glb"
    )
    const { actions, mixer } = useAnimations(animations, scene)
    useEffect(() => {
        console.log(actions)
        if (actions["BoxingIdle"]) {
            actions["BoxingIdle"].reset().fadeIn(0.5).play();
        }
        if (actions["BoxingIdle.001"]) {
            actions["BoxingIdle.001"].reset().fadeIn(0.5).play();
        }
        return () => {
            if (actions["BoxingIdle"]) {
                actions["BoxingIdle"].fadeOut(0.5);
            }
           
        };
    }, []);

    return (
        <>
        <group position={[0,-1,0]} ref={group}>
            <primitive  object={scene} scale={[0.8, 0.8, 0.8]}  position={[-0.3, 1, 1]}   />
        </group>
        </>
    )
}
