"use client"
import { useCharacter } from "@/hooks/useCharacter"
import { useInteraction } from "@/hooks/useInteraction"
import { useAnimations, useGLTF } from "@react-three/drei"
import { useEffect, useRef, useState } from "react"
import { Group } from "three"


export default function Model1() {
    const group = useRef<Group>(null)
    const { Animation, SetAnimation } = useInteraction();
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
        if (actions[animate]) {
            actions[animate].reset().fadeIn(0.5).play();
            setTimeout(() => {
                SetAnimation("Idle");
            }, actions[animate].getClip().duration * 1000);
        }
        return () => {
            if (actions[animate]) {
                actions[animate].fadeOut(0.5);
            }
        };
    }, [Animation, CharacterMap]);



    return (
        <>
            <group position={[0, -1, 0]} ref={group}>
                <primitive object={scene} scale={[0.8, 0.8, 0.8]} position={[-0.3, 1, 1]} />
            </group>
        </>
    )
}