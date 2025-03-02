"use client"

import { useResponse } from '@/hooks/useResponse'
import React, { useEffect, useRef, useState } from 'react'
import { FaAlignCenter, FaAlignJustify, FaAlignLeft, FaAlignRight, FaCheck, FaEdit, FaTrash } from 'react-icons/fa'
import { BubbleSettings, ResponseAi } from '../../../interface'
import data from "../../../defaultspeak.json"
import AnimationList from "../../../animation.json"
import CustomSelect from '../Ui/select'
import { useInteraction } from '@/hooks/useInteraction'
import Input from '../Ui/input'


function ChatDisplay() {
  const { BubbleChat, setBubbleChat } = useResponse()
  const { DefaultSpeak, SetDefaultSpeak, checkbox } = useInteraction()
  const [BubbleChatMap, setBubbleChatMap] = useState<BubbleSettings>()
  const [DefaultSpeakMap, setDefaultSpeakMap] = useState<ResponseAi[]>([])


  useEffect(() => {
    setBubbleChatMap(BubbleChat)
  }, [BubbleChat])
  useEffect(() => {
    if (DefaultSpeak.length > 0) return
    SetDefaultSpeak(data)
  }, [])
  useEffect(() => {
    setDefaultSpeakMap(DefaultSpeak)
  }, [DefaultSpeak])



  const BorderStyle = [
    "Border1",
    "Border2",
    "Border3",
  ]
  const textPosition = [
    {
      position: "text-justify",
      icons: FaAlignJustify
    },
    {
      position: "text-left",
      icons: FaAlignLeft
    },
    {
      position: "text-center",
      icons: FaAlignCenter
    },
    {
      position: "text-right",
      icons: FaAlignRight
    },
  ]

  const handleChange = (response: string, index: number, value: string) => {
    SetDefaultSpeak((prev: any) =>
      prev.map((item: any, i: number) =>
        i === index ? { ...item, response: value } : item
      )
    );
  }

  const handleDeleteInteraction = (index: number) => {
    SetDefaultSpeak((prev: any) => prev.filter((_: any, i: number) => i !== index));
  };

  const handleSelectAnimation = (selectedOption: any, index: number) => {
    SetDefaultSpeak((prev: any) =>
      prev.map((item: any, i: number) =>
        i === index ? { ...item, animation: selectedOption.name } : item
      )
    );
  };

  return (
    <div>
      <div className='p-3'>
        <div className='text-base  p-2 '>
          <p className='mb-3'>Chat Style</p>
          <div className='flex gap-4 overflow-x-scroll'>
            <div>
              <div className='my-2 flex  gap-2'>
                {textPosition.map((e: any, index) => (
                  <button onClick={() => setBubbleChat({ ...BubbleChatMap, CommentPosition: e.position })}
                    className={`${BubbleChatMap?.CommentPosition === e.position ? " rounded-md blur-sm" : "bg-white"}`} key={index}><e.icons className='text-2xl' /></button>
                ))}
              </div>
              <div className='my-2 flex gap-2'>
                {textPosition.map((e, index) => (
                  <button onClick={() => setBubbleChat({ ...BubbleChatMap, usernamePosition: e.position })}
                    className={`${BubbleChatMap?.usernamePosition === e.position ? " rounded-md blur-sm" : "bg-white"}`} key={index}><e.icons className='text-2xl' /></button>
                ))}
              </div>
              <div className='my-2 flex gap-2'>
                {textPosition.map((e, index) => (
                  <button onClick={() => setBubbleChat({ ...BubbleChatMap, ResponsePosition: e.position })}
                    className={`${BubbleChatMap?.ResponsePosition === e.position ? " rounded-md blur-sm" : "bg-white"}`} key={index}><e.icons className='text-2xl' /></button>
                ))}
              </div>
            </div>
            <div className='flex gap-4 items-center'>

              {BorderStyle.map((e, index) => (
                <button onClick={() => setBubbleChat({ ...BubbleChatMap, TypeBorder: e })}
                  className={`${BubbleChatMap?.TypeBorder === e ? " rounded-md blur-sm" : ""} bg-white  rounded-md h-full px-1`} key={index}>{e}</button>
              ))}
            </div>
          </div>
        </div>
        <div className='text-sm my-2 p-2'>
          <h1>Text Speed</h1>
          <div className='flex gap-2 items-center'>
            <input defaultValue={BubbleChatMap?.TextSpeed} onChange={(e) => { setBubbleChat({ ...BubbleChatMap, TextSpeed: e.target.value }) }} type="range" min={1} max="5" className="range" step="1" />
            <p>{BubbleChatMap?.TextSpeed}X</p>
          </div>
        </div>
        <div >
          <div className='flex p-2 gap-2 items-center my-3 text-base'>
            <p>Default Speak</p>
            <input type="checkbox" ref={checkbox} className="toggle toggle-info" />
          </div>
          <div className={`${checkbox.current?.checked ? "min-h-40" : "min-h-0"} duration-300`}>
            {checkbox.current?.checked && (
              DefaultSpeakMap.map((e: ResponseAi, index: number) => (
                <div key={index} className="flex max-md:flex-col max-md:items-stretch gap-2 my-2  items-start rounded-md">
                  <Input Inputsize="sm" onChange={(el) => handleChange(e.response, index, el.target.value)} placeholder="Word" className='w-full' defaultValue={e.response} />
                  <CustomSelect
                    placeholder="Animation"
                    options={AnimationList}
                    className="text-xs"
                    defaultValue={e.animation}
                    displayKey="name"
                    onSelect={(selectedOption) => handleSelectAnimation(selectedOption, index)}
                  />
                  <button
                    className="bg-red-500 text-white flex justify-center items-center gap-2 p-2 rounded-md mt-1"
                    onClick={() => handleDeleteInteraction(index)}
                  >
                    <FaTrash />
                    <p className='md:hidden max-md:text-sm'>Delete</p>
                  </button>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

export default ChatDisplay

