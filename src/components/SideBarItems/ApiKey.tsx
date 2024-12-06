"use client"
import { useTiktokConnection } from '@/app/AppProvider';
import React, { useState } from 'react'
import { FaEye, FaRegEyeSlash } from 'react-icons/fa';
import Input from '../Ui/input';

function ApiKey() {
  const { SetUserConnection, UserConncetion } = useTiktokConnection();
  const [show, setShow] = useState(false)


  return (
    <div className=' w-full p-3'>
      <div className='my-4'>
        <h1 className='text-base mb-1'>---- Groq AI ----</h1>
        <div className='relative flex items-center'>
          <Input
            type={`${show ? "text" : "password"}`}
            Inputsize={"sm"}
            onChange={e => SetUserConnection({ ...UserConncetion, apikey: e.target.value })}
            className='flex-grow   w-full '
            placeholder='Enter Groq Api key!!' />
          <div className='absolute right-2' onClick={() => setShow(!show)}>
            {show ?
              <FaEye />
              :
              <FaRegEyeSlash />
            }
          </div>
        </div>
          <select onChange={e => SetUserConnection({ ...UserConncetion, model: e.target.value })} defaultValue={"Select Model"} className="select border-2 border-black bg-white  w-full mt-2">
            <option disabled>Select Model</option>
            <option>llama3-70b-8192</option>
            <option>llama3-8b-8192</option>
          </select>
      </div>

    </div>
  )
}
// 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
export default ApiKey