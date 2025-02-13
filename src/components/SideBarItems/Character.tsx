"use client"
import { useCharacter } from '@/hooks/useCharacter'
import { useTiktokConnection } from '@/hooks/UseTiktokConnection'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

function Character() {
  const { setCharacter, Character } = useCharacter()
  const { version } = useTiktokConnection()
  const [CharacterMap, setCharacterMap] = useState("")


  useEffect(() => {
    setCharacterMap(Character)
  }, [Character])

  const handleClick = (e: any) => {
    setCharacter(`${e.glb}`)
  }
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
  return (
    <div className='flex p-3 gap-2 overflow-x-scroll'>

      {version === "2d" ?
        <></>
        :
        arrChar.map((e, index) => (
          <div key={index}>
            <div className='h-32 w-32   relative' onClick={() => handleClick(e)}>
              <Image fill alt='img-char' className={`${CharacterMap === `${e.glb}` ? " blur-sm" : ""} duration-300 rounded-lg object-cover`} src={e.img} />
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Character