"use client"
import BubleChat from '@/components/BubleChat'
import Mode from '@/components/Mode'
import { useCharacter } from '@/hooks/useCharacter'
const Navbar = dynamic(() => import("@/components/SideBar"), { ssr: false })
import { socket } from '@/utils/socket'
import dynamic from 'next/dynamic'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {
    const params = useParams()
    const [open, setOpen] = useState(false)


    useEffect(() => {
        socket.emit("EmbedJoin", params.id)
    }, [])

    return (
        <div className="flex justify-center font-Archivo">
            <Mode widget={true} />
            <BubleChat />
            <div className='hidden'>
                {/* <Navbar open={open} setOpen={setOpen} /> */}
            </div>
        </div>
    )
}

export default page




