"use client"
import { useCharacter } from '@/hooks/useCharacter'
import { useTiktokConnection } from '@/hooks/UseTiktokConnection'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import SidebarMenu from '../Ui/Collapse'
import hair from "../../../hair.json"
import ItemSelector from '../Ui/simpleGallery'
import { FaFemale, FaMale } from 'react-icons/fa'
import { hairStyle } from '../../../interface'
import ColorWheel from '../colorWheell'
import CustomSelect from '../Ui/select'
import expression from "../../../dumycommand.json"
import { useInteraction2d } from '@/hooks/useInteraction2d'



const arrChar = [
  {
    name: "Pilbot",
    img: "/imgChar/PilBot.png",
    glb: "/Pilbot.glb",
  },
  {
    name: "PilGirl",
    img: "/imgChar/PilGril.png",
    glb: "/PilGirl.glb",
  },
  {
    name: "PilKun",
    img: "/imgChar/PilKun.png",
    glb: "/PilKun.glb",
  },
  {
    name: "Pilkia",
    img: "/imgChar/PilKia.png",
    glb: "/Pilkia.glb",
  },
]
function Character() {
  const { setCharacter, Character, hairStyle, setHairStyle, setColorInteraction, ColorInteraction } = useCharacter()
  const { expresion, setExpresion } = useInteraction2d()
  const { version } = useTiktokConnection()
  const [CharacterMap, setCharacterMap] = useState("")
  const [hairStyleMap, setHairStyleMap] = useState<hairStyle>({
    position: "",
    hairImg: "/",
    scale: ""
  });


  const handleSelectExpression = (selectedOption: any, index: number) => {
    setExpresion(selectedOption.expresion)
  };
  const handleSelectRandomColor = (selectedOption: any, index: number) => {
    setColorInteraction(selectedOption.type)
  };

  useEffect(() => {
    setHairStyleMap(hairStyle)
  }, [hairStyle])

  useEffect(() => {
    setCharacterMap(Character)
  }, [Character])

  const handleClick = (e: any) => {
    setCharacter(`${e.glb}`)
  }
  const handleSetHair = (e: any) => {
    setHairStyle(e)
  }


  const hairStyles = [
    {
      value: "Man Hair Style",
      icons: <FaMale />,
      JSX: <ItemSelector defaults={hairStyleMap?.hairImg} imageKey='hairImg' nameKey='hairImg' items={hair.man} onClick={handleSetHair} />,
    },
    {
      value: "Girl Hair Style",
      icons: <FaFemale />,
      JSX: <ItemSelector defaults={hairStyleMap?.hairImg} imageKey='hairImg' nameKey='hairImg' items={hair.girl} onClick={handleSetHair} />,
    },


  ]


  return (
    <div className='flex p-3 gap-2 '>

      {version === "2d" ?
        <div className='flex flex-col gap-2 py-2'>
          <h1 className='text-lg '>Hair Style</h1>
          <div className='px-3'>
            <SidebarMenu style='text-sm' items={hairStyles} />
          </div>
          <h1 className='text-lg mt-2 '>Color</h1>
          <ColorWheel />
          <h1 className='text-lg mt-2 '>Auto Change Color</h1>
          <CustomSelect className='text-xs' displayKey={"type"} placeholder='on interaction?' onSelect={(selectedOption) => handleSelectRandomColor(selectedOption, 0)} defaultValue={ColorInteraction} options={[{ type: "Share" }, { type: "Follow" }]} />
          <h1 className='text-lg mt-2 '>Expression</h1>
          <CustomSelect className='text-xs' displayKey={"expresion"} placeholder='Select Expression' onSelect={(selectedOption) => handleSelectExpression(selectedOption, 0)} defaultValue={expresion} options={expression} />
          <h1 className='text-lg mt-2 '>Command Change Expression</h1>

        </div>
        :
        <ItemSelector defaults={CharacterMap} imageKey='img' nameKey='glb' items={arrChar} onClick={handleClick} />
      }
    </div>
  )
}

export default Character