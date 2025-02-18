"use client"
import Gifinteraction from '@/components/Gifinteraction'
import Toast from '@/components/Toast'
import { socket } from '@/utils/socket'
import dynamic from 'next/dynamic'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
const Scene = dynamic(() => import("@/components/Mode"), { ssr: false })
const RequestMusic = dynamic(() => import("@/components/RequsetMusic"), { ssr: false })
const Connection = dynamic(() => import("@/components/ConectionStatus"), { ssr: false })
const Navbar = dynamic(() => import("@/components/SideBar"), { ssr: false })



const page = () => {
    const params = useParams();
    const [open, setOpen] = useState(false)

    useEffect(() => {
        socket.emit("EmbedJoin", params.username)
    }, [])
    return (
        <div className='h-screen w-screen flex overflow-hidden justify-center font-Archivo'>
            <section className={`h-screen  relative ${open ? "w-96 max-xl:w-0" : "w-screen"} flex justify-center items-center  duration-500 flex-grow`}>
                <Toast />
                <Scene widget={true} />
                <div className="bottom-16 z-10 absolute max-w-80">
                    <RequestMusic in="display" />
                </div>
                <Gifinteraction />
                <Connection />
            </section>
            <Navbar open={open} setOpen={setOpen} />

        </div>
    )
}

export default page