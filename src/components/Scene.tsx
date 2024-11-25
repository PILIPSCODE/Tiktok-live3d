"use client"

import { Canvas, useThree } from "@react-three/fiber"
// import Model from "./Model"
import { useProgress, Html} from "@react-three/drei"
import Char1 from "./model/char1"
import Char2 from "./model/char2"
import Char3 from "./model/char3"
import Char4 from "./model/char4"
import Pet from "./model/pet"
import Satelit from "./model/satelit"
import SatelitMoon from "./model/Satelit_moon"
import Ground from "./model/ground"
import Building from "./model/Bangunan"
import Earth from "./model/earth"
import PohonNatal from "./model/PohonNatal"
import Chair from "./model/Chair"
import  Kapal from "./model/Ship"
import { OrbitControls } from "@react-three/drei"
import { Suspense } from "react"

function Loader() {
  const { progress, active } = useProgress()

  return <Html center>{progress.toFixed(1)} % loaded</Html>
}

export default function Scene() {
  return (
    <Canvas gl={{ antialias: true }} camera={{ position: [-1.4, 1.7, 5], fov: 65 }} dpr={[1, 4]} className="relative h-svh">
      <directionalLight position={[-70, 50, 30]} intensity={5} />
      <Suspense fallback={<Loader />}>
        <Pet/>
        <Char1/>
        <Char2/>
        <Char3/>
        <Char4/>
        {/* <ModelGelud/> */}
        <Chair/>
        <Ground/>
        <Satelit/>
        <PohonNatal/>
        <Kapal/>
        <SatelitMoon/>
        <Building position={[-2,5,-20]}/>
        <Building position={[1,5,-20]}/>
        <Earth/>
        <OrbitControls />
        </Suspense>
    </Canvas>
  )
}