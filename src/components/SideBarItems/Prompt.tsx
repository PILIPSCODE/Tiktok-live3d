"use client"

import { useTiktokConnection } from '@/hooks/UseTiktokConnection';
import React from 'react'

function Prompt() {
  const { SetUserConnection, UserConncetion } = useTiktokConnection();
  return (
    <div className='w-full'>
      <textarea onChange={(e) => SetUserConnection({ ...UserConncetion, prompt: e.target.value })} defaultValue={UserConncetion.prompt} className='w-full focus:outline-none border-black border-b-2 h-32 bg-transparent p-2 max-md:text-xs text-sm' placeholder='Enter Your Prompt Here!!' id=""></textarea>
    </div>
  )
}

export default Prompt