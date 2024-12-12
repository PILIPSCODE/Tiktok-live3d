import { useCharacter } from '@/app/AppProvider'
import Image from 'next/image'
import React from 'react'

function Character() {
  const { setCharacter, Character} = useCharacter()


  const handleClick = (e: any) => {
    setCharacter(`/3d/renderAnim${e.glb}`)
    setTimeout(() => {
      setCharacter(`/3d${e.glb}`)
    }, 1000)
  }
  const arrChar = [
    {
      name: "PilBot",
      img: "/imgChar/PilBot.png",
      glb: "/PilBot.glb",
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
      name: "PilKia",
      img: "/imgChar/PilKia.png",
      glb: "/PilKia.glb",
    },
  ]
  return (
    <div className='flex p-3 gap-2'>
      {
        arrChar.map((e, index) => (
          <div key={index}>
            <div className='h-32 w-32   relative' onClick={() => handleClick(e)}>
              <Image fill alt='img-char' className={`${Character === `/3d${e.glb}`? " blur-sm":""} duration-300 rounded-lg object-cover`} src={e.img} />
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Character