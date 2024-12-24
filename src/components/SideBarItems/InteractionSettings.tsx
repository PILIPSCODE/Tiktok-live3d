"use client"
import React, { useEffect, useRef, useState } from 'react'
import GiftList from "../../../gift.json"
import AnimationList from "../../../animation.json"
import CustomSelect from '../Ui/select'
import { useInteraction } from '@/hooks/useInteraction'
import { FaCheck, FaEdit, FaTrash } from 'react-icons/fa'
import { Interaction, ResorceType } from '../../../interface'
import { useCharacter } from '@/hooks/useCharacter'

function IntercationSettings() {
  const { Intercation, SetInteraction, Gift, SetAnimation } = useInteraction()
  const { Resource } = useCharacter()
  const [IntercationMap, SetInteractionMap] = useState<Interaction[]>([])
  const [isEdit, setEdit] = useState<number[]>([])
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    SetInteractionMap(Intercation)
  }, [Intercation])

  const handleDeleteInteraction = (index: number) => {
    SetInteraction((prev: any) => prev.filter((_: any, i: number) => i !== index));
  };

  const handleSelectGift = (selectedOption: any, index: number) => {
    SetInteraction((prev: any) =>
      prev.map((item: any, i: number) =>
        i === index ? { ...item, gift: selectedOption.name } : item
      )
    );
  };
  const handleSelectAnimation = (selectedOption: any, index: number) => {
    SetInteraction((prev: any) =>
      prev.map((item: any, i: number) =>
        i === index ? { ...item, animation: selectedOption.name } : item
      )
    );
  };
  const handleSelectAudio = (selectedOption: any, index: number) => {
    SetInteraction((prev: any) =>
      prev.map((item: any, i: number) =>
        i === index ? { ...item, audio: selectedOption.name } : item
      )
    );
  };

  useEffect(() => {
    Intercation
      .map((e: any) => {
        if (e.gift === Gift?.giftName) {
          SetAnimation(e.animation)

          const audioResource = Resource.filter((el: ResorceType) => el.name === e.audio)

          if (audioResource) {
            const audio = new Audio(`data:${audioResource[0].type};base64,` + audioResource[0].Base64);
            audio.volume = 1;
            audioRef.current = audio;
            audio.play();
          }
        }
      })


  }, [Gift])




  return (
    <div className='p-4 min-h-40 relative '>
      {
        IntercationMap.map((e: any, index: number) => (
          <div key={index} className='flex gap-2 my-1 p-2 items-start  rounded-md'>
            <div>
              <CustomSelect
                placeholder="Gift"
                options={GiftList}
                defaultValue={e.gift}
                className='text-xs'
                displayKey="name"
                onSelect={(selectedOption) => handleSelectGift(selectedOption, index)}
              />
            </div>
            <div>
              <CustomSelect
                placeholder="Animation"
                options={AnimationList}
                className='text-xs'
                defaultValue={e.animation}
                displayKey="name"
                onSelect={(selectedOption) => handleSelectAnimation(selectedOption, index)}
              />
            </div>
            <div>
              <CustomSelect
                placeholder="Audio"
                options={Resource.filter((e: any) => e.type.includes("audio"))}
                className='text-xs'
                defaultValue={e.audio}
                displayKey="name"
                onSelect={(selectedOption) => handleSelectAudio(selectedOption, index)}
              />
            </div>
            <button
              className={` ${isEdit.includes(index) ? "bg-green-500" : "bg-blue-500"} mt-1 text-white p-2 rounded-md`}
            >
              {isEdit.includes(index) ?
                <FaCheck onClick={() => setEdit((prev) => prev.filter(i => i !== index))} />
                :
                <FaEdit onClick={() => setEdit((prev) => [...prev, index])} />
              }
            </button>
            <button
              className="bg-red-500 text-white p-2 rounded-md mt-1"
              onClick={() => handleDeleteInteraction(index)}
            >
              <FaTrash />
            </button>
          </div>
        ))
      }
      <button className='bg-black text-white p-3 rounded-md transition-transform duration-300 transform hover:scale-105 float-right' onClick={() => SetInteraction((prev: any) => [...prev, { animation: "", audio: "", gift: "" }])}>New Intercation</button>
    </div>
  )
}

export default IntercationSettings