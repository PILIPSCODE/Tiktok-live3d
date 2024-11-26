"use client"
import { useAnimations, useGLTF, useScroll } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { Group } from "three"
// import { useTiktok } from "@/app/AppProvider"

// useGLTF.preload("/3d/Pilbot.glb")
export default function Model1() {
    const group = useRef<Group>(null)
    // const { Animation,SetAnimation } = useTiktok();
    const Animation = ""
    const animate  = Animation !== ""? Animation:"Idle"
    const {scene, animations} = useGLTF(
        "/3d/Pilbot.glb"
    )
    const { actions, mixer } = useAnimations(animations, scene)
    useEffect(() => {
        if (actions[animate]) {
            actions[animate].reset().fadeIn(0.5).play();
            // if(Animation === "BackFlip") {
            //     setTimeout(() => {
            //         SetAnimation("Idle");
            //     }, actions[animate].getClip().duration * 1000); 
            // }
        }
        return () => {
            if (actions[animate]) {
                actions[animate].fadeOut(0.5);
            }
        };
    }, [Animation]);

    return (
        <>
        <group position={[0,-1,0]} ref={group}>
            <primitive  object={scene} scale={[0.8, 0.8, 0.8]}  position={[-0.3, 1, 1]}   />
        </group>
        </>
    )
}
