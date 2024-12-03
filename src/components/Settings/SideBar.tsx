"use client"
import React, { Dispatch, SetStateAction, useState } from 'react'
import { IoIosSettings } from "react-icons/io";
import { GoTerminal } from "react-icons/go";
import { RiFilePaper2Line, RiMusic2Fill, RiUserVoiceFill } from "react-icons/ri";
import { TbApi, TbBackground } from "react-icons/tb";
import { IoAccessibilityOutline } from "react-icons/io5";
import { GiCharacter } from "react-icons/gi";
import { IoChatbox } from 'react-icons/io5';
import { useTiktok } from '@/app/AppProvider';


type prop = {
    open:boolean,
    setOpen:Dispatch<SetStateAction<boolean>>
}
type list = {
    value: string;
    icons: React.JSX.Element
}
function Navbar(props:prop) {
    const { SetUserName, TiktokConnection, setConnection} = useTiktok();
    const [inputUser, setInputUser] = useState("")
    const handleClick = () => {
        if(inputUser == "") return;

        if(TiktokConnection === "Connected"){
            setConnection(true)
        }else{
            SetUserName(inputUser)
        }
    }

    
    const [itemNav, setitemNav] = useState<string>("")

    const nav_list:list[] = [
        {
            value: "Console",
            icons: <GoTerminal/>
        },
        {
            value: "Prompt",
            icons: <RiFilePaper2Line/>
        },
        {
            value: "Character",
            icons: <GiCharacter/> 
        },
        {
            value: "Api Key",
            icons: <TbApi/> 
        },
        {
            value: "Chat Display",
            icons: <IoChatbox/> 
        },
        {
            value: "Background",
            icons: <TbBackground/> 
        },
        {
            value: "Voice (TTS)",
            icons: <RiUserVoiceFill/> 
        },
        {
            value: "Music",
            icons: <RiMusic2Fill/> 
        },
        {
            value: "Animation Setting",
            icons: <IoAccessibilityOutline/> 
        },
    ]

    return (
        <section className={`relative ${props.open? "w-96":"w-0"}   flex-grow h-screen transition-all duration-300`}>
        <label onClick={() => props.setOpen(!props.open)} className={`${props.open?"max-md:text-black":"text-white"} absolute top-3 right-3  md:-left-10 text-4xl`}><IoIosSettings/></label>
        <div className={`h-screen bg-white overflow-y-scroll text-xl p-8 flex flex-col  text-black`}>
            <label className='text-4xl mb-4'>
                <h1>Settings</h1>
            </label>
            <div className='flex text-white w-full gap-4 max-md:text-sm'>
              <input onChange={(e) => setInputUser(e.target.value) }  type="text" className='flex-grow bg-transparent text-black border-b-2  border-black p-2 max-md:w-32 max-md:h-12 focus:outline-none' placeholder='@Tiktok Username'/>
              <button onClick={handleClick} className='bg-black text-white p-3 rounded-md transition-transform duration-300 transform hover:scale-105'>{TiktokConnection === "Connected"?"Disconnect":"Connect"}</button>
            </div>
            <p className='font-sans mb-8 text-sm'>{TiktokConnection}</p>
            <ul className='flex flex-col gap-6'>
                {
                    nav_list.map((item:list, index) => (
                        <li className="flex flex-col" key={index}>
                            <span className='flex gap-2 items-center' onClick={() => setitemNav(itemNav === item.value?"":item.value)}>{item.icons}{item.value}</span>
                            <div className={`flex-grow ${itemNav === item.value? "max-h-96 opacity-100 p-3 bg-gray-200" :"max-h-0 opacity-0 "}   rounded-md transition-all duration-300 overflow-y-scroll `}> 
                                <h1>items</h1>
                                <h1>items</h1>
                                <h1>items</h1>
                                <h1>items</h1>
                                <h1>items</h1>
                                <h1>items</h1>
                                <h1>items</h1>
                                <h1>items</h1>
                                <h1>items</h1>
                                <h1>items</h1>
                                <h1>items</h1>
                            </div>
                        </li>
                    ))
                }
                
            </ul>
        </div>
        </section>
    )
}

export default Navbar