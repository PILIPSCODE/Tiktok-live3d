"use client"
import { useCharacter } from "@/hooks/useCharacter"
import { useInteraction } from "@/hooks/useInteraction"
import { useAnimations, useGLTF } from "@react-three/drei"
import { useEffect, useRef, useState } from "react"
import { Group } from "three"
export default function Model1() {
    const group = useRef<Group>(null)
    const { Animation } = useInteraction();
    const animate = Animation.length !== 0 && Animation[0].animation !== undefined ? Animation[0].animation : "Idle"

    const { Character } = useCharacter();
    const [CharacterMap, setCharacterMap] = useState("")


    const defaultCharacther = "/3d/Character/PilKun.glb"

    const Char = CharacterMap === "" ? defaultCharacther : CharacterMap

    const gltf = useGLTF(Char);

    const scene = Array.isArray(gltf) ? gltf[0].scene : gltf.scene;

    useEffect(() => {
        if (useGLTF.clear) useGLTF.clear(Char)
    }, [Char])

    useEffect(() => {
        setCharacterMap(`/3d/Character${Character}`)
    }, [Character])


    const animations = Array.isArray(gltf) ? gltf[0].animations : gltf.animations;

    const { actions } = useAnimations(animations, scene)

    useEffect(() => {
        useGLTF.preload(Char)
        actions[animate]?.reset().fadeIn(0.5).play();
        return () => {
            if (actions[animate]) {
                actions[animate].fadeOut(0.5);
            }
        };

    }, [animate, CharacterMap, actions]);






    return (
        <>
            <group position={[0, -1, 0]} ref={group}>
                <primitive
                    key={Char}
                    object={scene}
                    scale={[0.9, 0.9, 0.9]}
                    position={[0, 1, 1.7]}
                />
            </group>
        </>
    )
}