"use client"
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { IoIosSettings } from "react-icons/io";
import { GoTerminal } from "react-icons/go";
import { RiFilePaper2Line, RiMusic2Fill, RiUserVoiceFill } from "react-icons/ri";
import { TbApi, TbBackground } from "react-icons/tb";
import { IoFlower } from "react-icons/io5";
import { GiCharacter } from "react-icons/gi";
import { IoChatbox } from 'react-icons/io5';
import Console from './SideBarItems/Console';
import Prompt from './SideBarItems/Prompt';
import Character from './SideBarItems/Character';
import ApiKey from './SideBarItems/ApiKey';
import ChatDisplay from './SideBarItems/ChatDisplay';
import BackGround from './SideBarItems/Place';
import Voice from './SideBarItems/Voice';
import Music from './SideBarItems/Music';
import AnimationSettings from './SideBarItems/InteractionSettings';
import Input from './Ui/input';
import { useTiktokConnection } from '@/hooks/UseTiktokConnection';
import { useResponse } from '@/hooks/useResponse';
import Resource from './SideBarItems/Resource';
import { FaFolder } from 'react-icons/fa';
import Image from 'next/image';
import SidebarMenu from './Ui/Collapse';


type prop = {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
}
type list = {
    value: string;
    icons: React.JSX.Element
    JSX: React.JSX.Element
}
function Navbar(props: prop) {
    const { SetUserConnection, TiktokConnection, SetUserNameDisconnected, UserConncetion, setVersion, inputUser, setInputUser } = useTiktokConnection();
    const { setShowBubble, showBubble } = useResponse();
    const [loading, setLoading] = useState(false)
    const itemRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
    const text = TiktokConnection === "Connected" ? "Disconnect" : "Connect"

    const handleClick = () => {
        setLoading(true)
        if (TiktokConnection === "Connected") {
            SetUserNameDisconnected(inputUser)
            setTimeout(() => {
                setLoading(false)
            }, 3000)
        } else {
            SetUserConnection({ ...UserConncetion, username: inputUser })
            setTimeout(() => {
                setLoading(false)
            }, 3000)
        }
    }





    const nav_list: list[] = [
        {
            value: "Console",
            icons: <GoTerminal />,
            JSX: <Console />
        },
        {
            value: "Prompt",
            icons: <RiFilePaper2Line />,
            JSX: <Prompt />
        },
        {
            value: "Character",
            icons: <GiCharacter />,
            JSX: <Character />
        },
        {
            value: "Api Key",
            icons: <TbApi />,
            JSX: <ApiKey />
        },
        {
            value: "Resource",
            icons: <FaFolder />,
            JSX: <Resource />
        },
        {
            value: "Chat Settings",
            icons: <IoChatbox />,
            JSX: <ChatDisplay />
        },
        {
            value: "Place",
            icons: <TbBackground />,
            JSX: <BackGround />
        },
        {
            value: "Voice (TTS)",
            icons: <RiUserVoiceFill />,
            JSX: <Voice />
        },
        {
            value: "Music",
            icons: <RiMusic2Fill />,
            JSX: <Music />
        },
        {
            value: "Interaction Setting",
            icons: <IoFlower />,
            JSX: <AnimationSettings />
        },
    ]


    const handleClickItems = (item: any) => {
        if (item.value === "Chat Settings") {
            setShowBubble(!showBubble);
        } else {
            setShowBubble(false);
        }
    };




    return (
        <section className={`relative z-50 ${props.open ? "w-96 max-xl:w-screen" : "w-0"}   flex-grow h-screen  duration-1000`}>

            <div className='flex justify-end gap-4 text-white z-50 absolute top-3 right-3 '>
                <div className={props.open ? "flex gap-2" : "hidden"}>
                    <div onClick={() => setVersion("2d")} className='rounded-md bg-gray-500'>
                        <div className='pointer-events-none flex items-center gap-2 p-1 '>
                            <div className='w-7 h-7 relative'>
                                <Image src={"/imgChar/2dPilkun.png"} alt='' fill className='rounded-sm' />
                            </div>
                            <p>2d</p>
                        </div>
                    </div>
                    <div onClick={() => setVersion("3d")} className='rounded-md bg-gray-500'>
                        <div className='pointer-events-none flex items-center gap-2 p-1'>
                            <div className='w-7 h-7 relative'>
                                <Image src={"/imgChar/PilBot.png"} alt='' fill className='rounded-sm' />
                            </div>
                            <p>3d</p>
                        </div>
                    </div>
                </div>
                <label className={`${props.open ? "text-black " : "text-white"} z-50   xl:-left-10 text-4xl`}><IoIosSettings onClick={() => props.setOpen(!props.open)} className={`${props.open ? "max-xl:bg-white rounded-md shadow-md" : ""}`} /></label>
            </div>
            <div className={`h-screen bg-white overflow-y-scroll text-xl p-8 flex flex-col  text-black`}>


                <label className='text-4xl mb-4'>
                    <h1>Settings</h1>
                </label>
                <div className='flex text-white w-full gap-2 max-md:text-xs'>
                    <Input
                        onChange={(e) => { setInputUser(e.target.value) }}
                        value={inputUser}
                        type="text"
                        Inputsize={"sm"}
                        className={`w-full ${TiktokConnection === "Connected" ? "pointer-events-none" : "pointer-events-auto"}`}
                        placeholder='@Tiktok Username
                    '/>
                    <button onClick={handleClick} className='bg-black text-white p-3 rounded-md transition-transform duration-300 transform hover:scale-105'>{text}</button>
                </div>
                <p className='font-sans mb-8  text-sm'>{loading ? `${text}ing...` : TiktokConnection}</p>
                <SidebarMenu style='' items={nav_list} onItemClick={handleClickItems} />
            </div>
        </section>
    )
}

export default Navbar