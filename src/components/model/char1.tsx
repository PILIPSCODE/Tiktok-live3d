"use client"
import { useAnimations, useGLTF } from "@react-three/drei"
import { useEffect, useRef } from "react"
import { Group } from "three"
import { useCharacter, useInteraction } from "@/app/AppProvider"

export default function Model1() {
    const group = useRef<Group>(null)
    const { Animation,SetAnimation } = useInteraction();
    const animate  = Animation !== ""? Animation:"Idle"    

    const { Character } = useCharacter();
    const defaultCharacther = "/3d/PilKun.glb"

    const Char = Character === ""? defaultCharacther : Character

    const gltf = useGLTF(Char);

    const scene = Array.isArray(gltf) ? gltf[0].scene : gltf.scene;
    const animations = Array.isArray(gltf) ? gltf[0].animations : gltf.animations;

    const { actions, mixer } = useAnimations(animations, scene)
    useEffect(() => {
    useGLTF.preload(Char)


        if (actions[animate]) {
            actions[animate].reset().fadeIn(0.5).play();
            if(Animation === "BackFlip") {
                setTimeout(() => {
                    SetAnimation("Idle");
                }, actions[animate].getClip().duration * 1000); 
            }
        }
        return () => {
            if (actions[animate]) {
                actions[animate].fadeOut(0.5);
            }
        };
    }, [Animation,Character]);

    return (
        <>
        <group position={[0,-1,0]} ref={group}>
            <primitive  object={scene} scale={[0.8, 0.8, 0.8]}  position={[-0.3, 1, 1]}   />
        </group>
        </>
    )
}
// "use client";

// import { useGLTF, useAnimations } from "@react-three/drei";
// import { useEffect, useRef } from "react";
// import { Group } from "three";
// import { useCharacter, useInteraction } from "@/app/AppProvider";

// useGLTF.preload("/PilKia.glb");
// useGLTF.preload("/3d/PilKia.glb");

// export default function Model1() {
//   const group = useRef<Group>(null);

//   // State untuk animasi dan karakter
//   const { Animation, SetAnimation } = useInteraction();
//   const animate = Animation !== "" ? Animation : "Idle";

//   const { Character } = useCharacter();
//   const defaultCharacter = "/PilKia.glb";

//   // Ambil model dan animasi secara terpisah
//   const { scene, materials } = useGLTF("/PilKia.glb"); // Model utama
//   // const { animations } = useGLTF("/3d/PilKia.glb"); // Animasi terpisah

//   // Kontrol animasi
//   // const { actions } = useAnimations(animations, scene);

//   // useEffect(() => {
//   //   // Handle animasi
//   //   if (actions && actions[animate]) {
//   //     actions[animate].reset().fadeIn(0.5).play();
//   //     if (Animation === "BackFlip") {
//   //       setTimeout(() => {
//   //         SetAnimation("Idle");
//   //       }, actions[animate].getClip().duration * 1000);
//   //     }
//   //   }

//   //   return () => {
//   //     if (actions && actions[animate]) {
//   //       actions[animate].fadeOut(0.5);
//   //     }
//   //   };
//   // }, [Animation, actions]);

//   return (
//     <group position={[0, -1, 0]} ref={group}>
//       {/* Model utama */}
//       <primitive scale={[0.8, 0.8, 0.8]} position={[-0.3, 1, 1]} />
      
//       {/* Tambahkan skinnedMesh dengan material */}
//       <skinnedMesh name="Mesh_0" material={materials.Material_0} />
//     </group>
//   );
// }
