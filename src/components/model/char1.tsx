"use client"
import { useCharacter } from "@/hooks/useCharacter"
import { useInteraction } from "@/hooks/useInteraction"
import { useAnimations, useGLTF } from "@react-three/drei"
import { useEffect, useRef, useState } from "react"
import { Group } from "three"
export default function Model1() {
    const group = useRef<Group>(null)
    const { Animation, prevAnimation, setPrevAnimation, prevAnimationRef } = useInteraction();

    const animate = Animation.animation !== "" ? Animation.animation : "Idle"

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
        return () => {
            if (actions[animate]) {
                actions[animate].fadeOut(0.5);
            }
        };

    }, [animate, CharacterMap, actions]);

    useEffect(() => {
        prevAnimationRef.current = prevAnimation;
    }, [prevAnimation]);

    useEffect(() => {
        setPrevAnimation(Animation)
    }, [Animation])



    return (
        <>
            <group position={[0, -1, 0]} ref={group}>
                <primitive object={scene} scale={[0.9, 0.9, 0.9]} position={[0, 1, 1.7]} />
            </group>
        </>
    )
}