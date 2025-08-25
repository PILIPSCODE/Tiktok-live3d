"use client"
import React, { useEffect, useRef, useState } from 'react'
import GiftList from "../../../gift.json"
import AnimationList from "../../../animation.json"
import CustomSelect from '../Ui/select'
import { useInteraction } from '@/hooks/useInteraction'
import { FaTrash } from 'react-icons/fa'
import { ResorceType, InteractionQueue } from '../../../interface'
import { useCharacter } from '@/hooks/useCharacter'
import { useTiktokConnection } from '@/hooks/UseTiktokConnection'
import expression_list from "../../../dumycommand.json"
import Input from '../Ui/input'
import { useInteraction2d } from '@/hooks/useInteraction2d'

function IntercationSettings() {
  const { Intercation, SetInteraction, Gift, safeRemoveAndSet, Follow, Share, setCheckbox, SetToast, setIsGiftAnimation, setShare, setFollow } = useInteraction()
  const { Intercation2d, SetInteraction2d, SetGifInteraction, expression } = useInteraction2d()
  const { Resource, ExpressionInteraction, setExpressionInteraction } = useCharacter()
  const { version } = useTiktokConnection()
  const [InteractionQueue, setInteractionQueue] = useState<InteractionQueue[]>([])
  const [currentInteraction, setCurrentInteraction] = useState<InteractionQueue | null>(null);
  const [isPlay, setIsPlay] = useState(false)
  const [IntercationFollow] = useState(Intercation.findIndex((e: any) => e.type === "Follow"))
  const [IntercationShare] = useState(Intercation.findIndex((e: any) => e.type === "Share"))
  const [IntercationFollow2d] = useState(Intercation2d?.findIndex((e: any) => e.type === "Follow"))
  const [IntercationShare2d] = useState(Intercation2d?.findIndex((e: any) => e.type === "Share"))
  const audioRef = useRef<HTMLAudioElement | null>(null);


  const onversion = version === "2d" ? Intercation2d : Intercation
  const onversionShare = version === "2d" ? IntercationShare2d : IntercationShare
  const onversionFollow = version === "2d" ? IntercationFollow2d : IntercationFollow
  const setOnVersion = version === "2d" ? SetInteraction2d : SetInteraction
  const property = version === "2d" ? "type" : "audio"
  const detectmissingShare = onversion[onversionShare][property]
  const detectmissingFollow = onversion[onversionFollow][property]


  const handleDeleteInteraction = (index: number) => {
    setOnVersion((prev: any) => prev.filter((_: any, i: number) => i !== index));
  };

  const handleSelectGift = (selectedOption: any, index: number) => {
    setOnVersion((prev: any) =>
      prev.map((item: any, i: number) =>
        i === index ? { ...item, gift: selectedOption.name } : item
      )
    );
  };
  const handleSelectAnimation = (selectedOption: any, index: number) => {
    setOnVersion((prev: any) =>
      prev.map((item: any, i: number) =>
        i === index ? { ...item, animation: selectedOption.name } : item
      )
    );
  };
  const handleSelectAudio = (selectedOption: any, index: number) => {
    setOnVersion((prev: any) =>
      prev.map((item: any, i: number) =>
        i === index ? { ...item, audio: selectedOption.name } : item
      )
    );
  };
  const handleSelectVideo = (selectedOption: any, index: number) => {
    setOnVersion((prev: any) =>
      prev.map((item: any, i: number) =>
        i === index ? { ...item, gif: selectedOption.name } : item
      ));
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

  const handleDeleteCommand = (index: number) => {
    setExpressionInteraction((prev: any) => prev.filter((_: any, i: number) => i !== index))
  }

  const handleAdd = () => {
    setExpressionInteraction((prev: any) => [...prev, { expresion: "", command: "" }])
  }


  useEffect(() => {

    if (isPlay || !currentInteraction) return
    const audioResource = Resource?.filter((el: ResorceType) => el.name === currentInteraction?.audio)
    const gifResource = Resource?.filter((el: ResorceType) => el.name === currentInteraction?.gif)

    if (audioResource) {
      setCheckbox(false)
      const audio = new Audio(`data:${audioResource[0]?.type};base64,` + audioResource[0]?.Base64);
      audio.volume = 0.5;
      audioRef.current = audio;
      audio.play();
      setIsPlay(true)
      setIsGiftAnimation(true)
      SetToast({ text: String(currentInteraction?.type), uniqueId: currentInteraction?.uniqueId })
      if (currentInteraction.type === "gift") {
        SetGifInteraction(gifResource[0]?.Base64)
      }
      safeRemoveAndSet({ animation: currentInteraction?.animation, playOn: "Interaction" })

      const handleEnded = () => {

        setIsPlay(false)
        setInteractionQueue((prev) => prev.slice(1));
        setCurrentInteraction(null);
        setIsGiftAnimation(false)
        SetGifInteraction("")
        safeRemoveAndSet({ animation: "Idle", playOn: "IdleInteraction" })

      }
      audio.addEventListener("ended", handleEnded)

      return () => {
        audio.removeEventListener("ended", handleEnded);
        audio.pause();
        setCheckbox(true)
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

    if (Share && (detectmissingShare !== undefined && detectmissingShare !== "")) {

      setInteractionQueue((prev: any) => [...prev, { ...onversion[onversionShare], uniqueId: Share.uniqueId }])
      setShare(null)
    }
    if (Follow && (detectmissingFollow !== undefined && detectmissingFollow !== "")) {
      setInteractionQueue((prev: any) => [...prev, { ...onversion[onversionFollow], uniqueId: Follow.uniqueId }])
      setFollow(null)
    }
  }, [Share, Follow])

  useEffect(() => {
    if (Gift) {
      onversion.map((e: any) => {
        if (e.gift === Gift?.giftName) {
          setInteractionQueue((prev: any) => [...prev, e])
        }
      })
    }
  }, [Gift])



  useEffect(() => {
    if (IntercationShare === -1 && IntercationFollow === -1) {
      SetInteraction([
        { animation: "Idle", audio: "", gift: "", type: "Share" },
        { animation: "Idle", audio: "", gift: "", type: "Follow" }
      ]);
    }
    if (IntercationShare2d === -1 && IntercationFollow2d === -1) {
      SetInteraction2d([
        { video: "", audio: "", gift: "", type: "Share" },
        { video: "", audio: "", gift: "", type: "Follow" }
      ]);
    }
  }, []);



  return (
    <div className='p-4 min-h-40 relative '>
      <div className='mt-3'>

      </div>
      <div className='mt-3'>
        {onversion.filter((e: any) => e.type !== "gift").map((e: any, index: any) => {
          return (

            <div key={index}>
              <h1 className='text-base mb-1 '>{e.type}</h1>
              <div className='flex max-md:flex-col  max-md:items-stretch  gap-2 my-1 p-2 items-stretch  rounded-md'>
                {version === "2d" ?
                  <CustomSelect
                    placeholder="ext.Gif"
                    options={Resource?.filter((e: any) => e.type.includes("gif"))}
                    className='text-xs'
                    defaultValue={e.gif}
                    displayKey="name"
                    onSelect={(selectedOption) => handleSelectVideo(selectedOption, index)}
                  />
                  :
                  <CustomSelect
                    placeholder="Animation"
                    options={AnimationList}
                    className='text-xs'
                    defaultValue={e.animation}
                    displayKey="name"
                    onSelect={(selectedOption) => handleSelectAnimation(selectedOption, index)}
                  />
                }
                <CustomSelect
                  placeholder="Audio"
                  options={Resource?.filter((e: any) => e.type.includes("audio"))}
                  className='text-xs'
                  defaultValue={e.audio}
                  displayKey="name"
                  onSelect={(selectedOption) => handleSelectAudio(selectedOption, index)}
                />
              </div>
            </div>
          )
        }
        )
        }
      </div>
      <div className='my-3'>
        <h1 className='text-base '>Gift</h1>
        {onversion?.filter((e: any) => e.type === "gift").map((e: any, index: number) => (
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
              {version === "2d" ?
                <CustomSelect
                  placeholder="ext.Gif"
                  options={Resource?.filter((e: any) => e.type.includes("gif"))}
                  className='text-xs'
                  defaultValue={e.gif}
                  displayKey="name"
                  onSelect={(selectedOption) => handleSelectVideo(selectedOption, index + 2)}
                />
                :
                <CustomSelect
                  placeholder="Animation"
                  options={AnimationList}
                  className='text-xs'
                  defaultValue={e.animation}
                  displayKey="name"
                  onSelect={(selectedOption) => handleSelectAnimation(selectedOption, index + 2)}
                />
              }
            </div>
            <div>
              <CustomSelect
                placeholder="Audio"
                options={Resource?.filter((e: any) => e.type.includes("audio"))}
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
          <button className='bg-black text-white p-3 mb-2 w-full rounded-md transition-transform duration-300 transform hover:scale-105' onClick={() => setOnVersion((prev: any) => [...prev, { animation: "Idle", audio: "", gift: "", type: "gift" }])}>Add More</button>
        </div>
        {version === "2d" ?
          <>
            <h1 className='text-lg mt-2 '>Command Change Expression</h1>

            {ExpressionInteraction.length === 0 ?
              <h4 className='text-sm text-center border border-black p-4'>Expression Command Empty, Add More Command Expression</h4>
              :
              ExpressionInteraction.map((e: any, index: number) => (
                <div className='flex gap-3 max-md:flex-col my-3  items-start'>
                  <Input defaultValue={e.command} placeholder='Type Command' onChange={(e) => handleChange(e.target.value, index)} Inputsize={"sm"} />
                  <CustomSelect className='text-xs' displayKey={"expresion"} placeholder='Select Expression' onSelect={(selectedOption) => handleSelectExpressionList(selectedOption, index)} defaultValue={e.expression} options={expression_list} />
                  <button
                    onClick={() => handleDeleteCommand(index)}
                    className="bg-red-500 text-white p-2 flex justify-center items-center gap-2 rounded-md mt-1">
                    <FaTrash />
                    <p className='md:hidden'>Delete</p>
                  </button>
                </div>
              ))}
            <div className='w-full flex mt-2'>
              <button className='bg-black text-white p-3 mb-2 w-full rounded-md transition-transform duration-300 transform ' onClick={handleAdd}>Add</button>
            </div>
          </>

          :
          <></>
        }
      </div>


    </div>
  )
}

export default IntercationSettings

