"use client"
import { useCharacter } from "@/hooks/useCharacter"
import { useInteraction } from "@/hooks/useInteraction"
import { useAnimations, useGLTF } from "@react-three/drei"
import { useEffect, useRef, useState } from "react"
import { Group } from "three"


export default function Model1() {
    const group = useRef<Group>(null)
    const { Animation, SetAnimation, Intercation, setIsGiftAnimation } = useInteraction();
    const animate = Animation !== "" ? Animation : "Idle"

    const { Character } = useCharacter();
    const [CharacterMap, setCharacterMap] = useState("")


    const defaultCharacther = "/3d/PilKun.glb"

    const Char = CharacterMap === "" ? defaultCharacther : CharacterMap

    const gltf = useGLTF(Char);

    const scene = Array.isArray(gltf) ? gltf[0].scene : gltf.scene;
    const animations = Array.isArray(gltf) ? gltf[0].animations : gltf.animations;

    const { actions } = useAnimations(animations, scene)

    useEffect(() => {
        setCharacterMap(`/3d${Character}`)
        setTimeout(() => {
            setCharacterMap(`/3d/renderAnim${Character}`)
        }, 1000)
    }, [Character])

    useEffect(() => {
        useGLTF.preload(Char)
        actions[animate]?.reset().fadeIn(0.5).play();
        Intercation?.map((e: any) => {
            if (animate === e.animation) {
                setIsGiftAnimation(true)
                setTimeout(() => {
                    setIsGiftAnimation(false)
                    SetAnimation("Idle");
                }, actions[animate] ? actions[animate].getClip().duration * 1000 : 9000);
            }
        })


        return () => {
            if (actions[animate]) {
                actions[animate].fadeOut(0.5);
            }
        };
    }, [Animation, animate, CharacterMap, Intercation, actions]);



    return (
        <>
            <group position={[0, -1, 0]} ref={group}>
                <primitive object={scene} scale={[0.9, 0.9, 0.9]} position={[0, 1, 1.7]} />
            </group>
        </>
    )
}