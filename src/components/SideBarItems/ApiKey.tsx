"use client"
import React, { useState } from 'react'
import { FaEye, FaRegEyeSlash } from 'react-icons/fa';
import Input from '../Ui/input';
import { useTiktokConnection } from '@/hooks/UseTiktokConnection';

function ApiKey() {
  const { SetUserConnection, UserConncetion } = useTiktokConnection();
  const [show, setShow] = useState(false)


  return (
    <div className=' w-full p-3 text-gray-700'>
      <div className='my-4'>
        <h1 className='text-base mb-1 '>Groq AI </h1>
        <div className='relative flex items-center'>
          <Input
            type={`${show ? "text" : "password"}`}
            Inputsize={"sm"}
            value={UserConncetion.apikey}
            onChange={e => SetUserConnection({ ...UserConncetion, apikey: e.target.value })}
            className='flex-grow text-gray-700  w-full '
            placeholder='Enter Groq Api key!!' />
          <div className='absolute right-2' onClick={() => setShow(!show)}>
            {show ?
              <FaEye />
              :
              <FaRegEyeSlash />
            }
          </div>
        </div>
        <select onChange={e => SetUserConnection({ ...UserConncetion, model: e.target.value })} defaultValue={UserConncetion.model || "Select Model"} className="select border-2 border-black bg-white max-md:text-xs w-full mt-2">
          <option disabled>Select Model</option>
          <option>llama3-70b-8192</option>
          <option>llama3-8b-8192</option>
        </select>
      </div>

    </div>
  )
}
// 
export default ApiKey