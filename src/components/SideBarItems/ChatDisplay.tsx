"use client"

import { useResponse } from '@/hooks/useResponse'
import React, { useEffect, useState } from 'react'
import { FaAlignCenter, FaAlignJustify, FaAlignLeft, FaAlignRight } from 'react-icons/fa'
import { BubbleSettings } from '../../../interface'


function ChatDisplay() {
  const { BubbleChat, setBubbleChat } = useResponse()
  const [BubbleChatMap, setBubbleChatMap] = useState<BubbleSettings>()


  useEffect(() => {
    setBubbleChatMap(BubbleChat)
  }, [BubbleChat])


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
  return (
    <div>
      <div className='flex gap-4 p-2'>
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
              className={`${BubbleChatMap?.TypeBorder === e ? " rounded-md blur-sm" : ""} bg-white h-full px-1`} key={index}>{e}</button>
          ))}
        </div>


      </div>

    </div>
  )
}

export default ChatDisplay

