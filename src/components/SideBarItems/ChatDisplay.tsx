import { useResponse } from '@/app/AppProvider'
import React from 'react'
import { FaAlignCenter, FaAlignJustify, FaAlignLeft, FaAlignRight } from 'react-icons/fa'

function ChatDisplay() {
  const { BubbleChat, setBubbleChat } = useResponse()
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
    <div className='flex gap-4 p-2'>
      <div>
        <div className='my-2 flex  gap-2'>
          {textPosition.map((e:any, index) => (
            <button onClick={() => setBubbleChat({ ...BubbleChat, CommentPosition: e.position })} className='bg-white' key={index}><e.icons className='text-2xl'/></button>
          ))}
        </div>
        <div className='my-2 flex gap-2'>
          {textPosition.map((e, index) => (
            <button onClick={() => setBubbleChat({ ...BubbleChat, usernamePosition: e.position })} className='bg-white' key={index}><e.icons className='text-2xl'/></button>
          ))}
        </div>
        <div className='my-2 flex gap-2'>
          {textPosition.map((e, index) => (
            <button onClick={() => setBubbleChat({ ...BubbleChat, ResponsePosition: e.position })} className='bg-white' key={index}><e.icons className='text-2xl'/></button>
          ))}
        </div>
      </div>
      <div className='flex gap-4 items-center'>

        {BorderStyle.map((e, index) => (
          <button onClick={() => setBubbleChat({ ...BubbleChat, TypeBorder: e })} className='bg-white h-full px-1' key={index}>{e}</button>
        ))}

      </div>
    </div>
  )
}

export default ChatDisplay