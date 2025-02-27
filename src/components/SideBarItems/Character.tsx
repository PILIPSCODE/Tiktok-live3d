"use client"
import { useCharacter } from '@/hooks/useCharacter'
import { useTiktokConnection } from '@/hooks/UseTiktokConnection'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import SidebarMenu from '../Ui/Collapse'
import hair from "../../../hair.json"
import ItemSelector from '../Ui/simpleGallery'
import { FaFemale, FaMale, FaTrash } from 'react-icons/fa'
import { commandInteraction, hairStyle } from '../../../interface'
import ColorWheel from '../colorWheell'
import CustomSelect from '../Ui/select'
import expression from "../../../dumycommand.json"
import { useInteraction2d } from '@/hooks/useInteraction2d'
import Input from '../Ui/input'



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
  const { setCharacter, Character, hairStyle, setHairStyle, setColorInteraction, ColorInteraction, ExpressionInteraction, setExpressionInteraction } = useCharacter()
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

  const handleChange = (value: string, index: number) => {
    setExpressionInteraction((prev: any) =>
      prev.map((item: any, i: number) =>
        i === index ? { ...item, command: value } : item
      )
    );
  }
  const handleSelectExpressionList = (selectedOption: any, index: number) => {
    setExpressionInteraction((prev: any) =>
      prev.map((item: any, i: number) =>
        i === index ? { ...item, expression: selectedOption.expresion } : item
      )
    );
  }

  const handleAdd = () => {
    setExpressionInteraction((prev: any) => [...prev, { expresion: "", command: "" }])
  }
  const handleDeleteCommand = (index: number) => {
    setExpressionInteraction((prev: any) => prev.filter((_: any, i: number) => i !== index))
  }


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
    <div className='flex p-3 gap-2 w-full '>

      {version === "2d" ?
        <div className='flex flex-col w-full gap-2 py-2'>
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

          {ExpressionInteraction.length === 0 ?
            <h4 className='text-sm text-center border border-black p-4'>Expression Command Empty, Add More Command Expression</h4>
            :
            ExpressionInteraction.map((e: any, index: number) => (
              <div className='flex gap-3 max-md:flex-col my-3'>
                <Input defaultValue={e.command} placeholder='Type Command' onChange={(e) => handleChange(e.target.value, index)} Inputsize={"sm"} />
                <CustomSelect className='text-xs' displayKey={"expresion"} placeholder='Select Expression' onSelect={(selectedOption) => handleSelectExpressionList(selectedOption, index)} defaultValue={e.expression} options={expression} />
                <button
                  onClick={() => handleDeleteCommand(index)}
                  className="bg-red-500 text-white p-2 flex justify-center items-center gap-2 rounded-md mt-1">
                  <FaTrash />
                  <p className='md:hidden'>Delete</p>
                </button>
              </div>
            ))}

          <div className='w-full flex mt-2'>
            <button className='bg-black text-white p-3 mb-2 w-full rounded-md transition-transform duration-300 transform hover:scale-105' onClick={handleAdd}>Add More</button>
          </div>
        </div>
        :
        <ItemSelector defaults={CharacterMap} imageKey='img' nameKey='glb' items={arrChar} onClick={handleClick} />
      }
    </div>
  )
}

export default Character