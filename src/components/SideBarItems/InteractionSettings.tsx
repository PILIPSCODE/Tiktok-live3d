"use client"
import React, { useEffect, useRef, useState } from 'react'
import GiftList from "../../../gift.json"
import AnimationList from "../../../animation.json"
import CustomSelect from '../Ui/select'
import { useInteraction } from '@/hooks/useInteraction'
import { FaTrash } from 'react-icons/fa'
import { Interaction, ResorceType, InteractionQueue } from '../../../interface'
import { useCharacter } from '@/hooks/useCharacter'

function IntercationSettings() {
  const { Intercation, SetInteraction, Gift, SetAnimation, Follow, Share, checkbox, SetToast, setIsGiftAnimation, setShare, setFollow } = useInteraction()
  const { Resource } = useCharacter()
  const [InteractionQueue, setInteractionQueue] = useState<InteractionQueue[]>([])
  const [currentInteraction, setCurrentInteraction] = useState<InteractionQueue | null>(null);
  const [IntercationMap, SetInteractionMap] = useState<Interaction[]>([])
  const [isPlay, setIsPlay] = useState(false)
  const [IntercationFollow] = useState(Intercation.findIndex((e: any) => e.type === "Follow"))
  const [IntercationShare] = useState(Intercation.findIndex((e: any) => e.type === "Share"))
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
    if (isPlay || !currentInteraction) return
    const audioResource = Resource.filter((el: ResorceType) => el.name === currentInteraction?.audio)

    if (audioResource) {
      checkbox.checked = false;
      const audio = new Audio(`data:${audioResource[0]?.type};base64,` + audioResource[0]?.Base64);
      audio.volume = 1;
      audioRef.current = audio;
      audio.play();
      setIsPlay(true)
      setIsGiftAnimation(true)
      SetToast({ text: String(currentInteraction?.type), uniqueId: currentInteraction?.uniqueId })
      SetAnimation({ animation: currentInteraction?.animation, playOn: "Interaction" })

      const handleEnded = () => {
        setTimeout(() => {
          setIsPlay(false)
          setInteractionQueue((prev) => prev.slice(1));
          setCurrentInteraction(null);
          setIsGiftAnimation(false)
          SetAnimation({ animation: "Idle", playOn: "Interaction" })
        }, 2000)
      }
      audio.addEventListener("ended", handleEnded)

      return () => {
        audio.removeEventListener("ended", handleEnded);
        audio.pause();
        checkbox.checked = true;
        audio.src = "";
        audioRef.current = null;
      }
    }
  }, [currentInteraction])


  useEffect(() => {
    if (InteractionQueue.length > 0 && !isPlay) {
      const nextInteraction = InteractionQueue[0];
      setCurrentInteraction(nextInteraction);
    }
  }, [InteractionQueue, isPlay, Resource])


  useEffect(() => {
    if (Share) {
      setInteractionQueue((prev: any) => [...prev, { ...Intercation[IntercationShare], uniqueId: Share.uniqueId }])
      setShare(null)
    }
    if (Follow) {
      setInteractionQueue((prev: any) => [...prev, { ...Intercation[IntercationFollow], uniqueId: Follow.uniqueId }])
      setFollow(null)
    }
  }, [Share, Follow])

  useEffect(() => {
    if (Gift) {
      Intercation
        .map((e: any) => {
          if (e.gift === Gift?.giftName) {
            setInteractionQueue((prev: any) => [...prev, e])
          }
        })
    }
  }, [Gift])



  useEffect(() => {
    if (IntercationShare === -1 && IntercationFollow === -1) {
      SetInteraction((prev: any) => [
        ...prev,
        { animation: "", audio: "", gift: "", type: "Share" },
        { animation: "", audio: "", gift: "", type: "Follow" }
      ]);
    }
  }, []);



  return (
    <div className='p-4 min-h-40 relative '>
      <div className='mt-3'>
        {
          IntercationMap.filter((e) => e.type !== "gift").map((e, index) => (
            <div key={index}>
              <h1 className='text-base mb-1 '>{e.type}</h1>
              <div className='flex max-md:flex-col  border-2  max-md:items-stretch  gap-2 my-1 p-2 items-stretch  rounded-md'>
                <CustomSelect
                  placeholder="Animation"
                  options={AnimationList}
                  className='text-xs '
                  defaultValue={e.animation}
                  displayKey="name"
                  onSelect={(selectedOption) => handleSelectAnimation(selectedOption, index)}
                />
                <CustomSelect
                  placeholder="Audio"
                  options={Resource.filter((e: any) => e.type.includes("audio"))}
                  className='text-xs'
                  defaultValue={e.audio}
                  displayKey="name"
                  onSelect={(selectedOption) => handleSelectAudio(selectedOption, index)}
                />
              </div>
            </div>
          ))
        }
      </div>
      <div className='my-3'>
        <h1 className='text-base '>Gift</h1>
        {
          IntercationMap.filter((e) => e.type === "gift").map((e: any, index: number) => (
            <div key={index} className='flex max-md:flex-col max-md:items-stretch  gap-2 mb-2 p-2 items-start  rounded-md'>
              <div>
                <CustomSelect
                  placeholder="Gift"
                  options={GiftList}
                  defaultValue={e.gift}
                  className='text-xs'
                  displayKey="name"
                  onSelect={(selectedOption) => handleSelectGift(selectedOption, index + 2)}
                />
              </div>
              <div>
                <CustomSelect
                  placeholder="Animation"
                  options={AnimationList}
                  className='text-xs'
                  defaultValue={e.animation}
                  displayKey="name"
                  onSelect={(selectedOption) => handleSelectAnimation(selectedOption, index + 2)}
                />
              </div>
              <div>
                <CustomSelect
                  placeholder="Audio"
                  options={Resource.filter((e: any) => e.type.includes("audio"))}
                  className='text-xs'
                  defaultValue={e.audio}
                  displayKey="name"
                  onSelect={(selectedOption) => handleSelectAudio(selectedOption, index + 2)}
                />
              </div>
              <button
                className="bg-red-500 text-white p-2 flex justify-center items-center gap-2 rounded-md mt-1"
                onClick={() => handleDeleteInteraction(index + 2)}
              >
                <FaTrash />
                <p className='md:hidden'>Delete</p>
              </button>
            </div>
          ))
        }
        <div className='w-full flex p-2'>
          <button className='bg-black text-white p-3 mb-2 w-full rounded-md transition-transform duration-300 transform hover:scale-105' onClick={() => SetInteraction((prev: any) => [...prev, { animation: "", audio: "", gift: "", type: "gift" }])}>Add More</button>
        </div>
      </div>


    </div>
  )
}

export default IntercationSettings

function SetToast(arg0: { text: string; uniqueId: any }) {
  throw new Error('Function not implemented.')
}
