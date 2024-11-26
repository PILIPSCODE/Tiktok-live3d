"use client"
import { useAnimations, useGLTF, useScroll } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { Group } from "three"

// useGLTF.preload("/3d/bangunan/earth.glb")
export default function Model10() {
    const group = useRef<Group>(null)
    const {scene,animations} = useGLTF(
        "/3d/bangunan/earth.glb"
    )
    const { actions, clips } = useAnimations(animations, scene)
    useEffect(() => {
      //@ts-ignore
      if (actions && actions["Take 001"]) {
        const action = actions["Take 001"]
        action.timeScale = 0.09 // Adjust this to slow down (e.g., 0.5 for half speed)
        action.play()
    }
    //  actions["Take 001"].play()
  
    }, [])

    return (
        <>
       <directionalLight position={[20, 100, 200]} intensity={2} /> 
        <group position={[0,-1,0]} ref={group}>
            <primitive  object={scene} scale={[16,16,16]}  position={[155,6,-270]} />
        </group>
        </>
    )
}


const animations = [
    "BackFlip",
    "BodyBlock",
    "Dancing1",
    "DancingMachino",
    "DeathBackHeadShot",
    "Floating",
    "FlyKick",
    "GettingUp",
    "HappyIdle",
    "HipHopDancing1",
    "HipHopDancing2",
    "HouseDancing",
    "Idle",
    "JumpAway",
    "LeaningOnWall",
    "ListeningToMusic",
    "MacacoSide",
    "MmaKick",
    "Singing",
    "SittingLauging",
    "SleepingIdle",
    "Talking",
    "WalkInCircle",
    "WalkingLeftTurn",
    "WalkingTurn180",
    "Waving"
  ];
  