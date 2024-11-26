// scene.tsx

"use client";
import { OrbitControls } from "@react-three/drei"
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
import Kapal from "./model/Ship"

const Scene = () => {
  return (
    <>
      <directionalLight position={[-70, 50, 30]} intensity={5} />
      <Pet />
      <Char1 />
      <Char2 />
      <Char3 />
      <Char4 />
      {/* <ModelGelud/> */}
      <Chair />
      <Ground />
      <Satelit />
      <PohonNatal />
      <Kapal />
      <SatelitMoon />
      <Building position={[-2, 5, -20]} />
      <Building position={[1, 5, -20]} />
      <Earth />
      <OrbitControls />
    </>
  );
};

export default Scene;