"use client"
import BubleChat from '@/components/BubleChat'
import Mode from '@/components/Mode'
const Navbar = dynamic(() => import("@/components/SideBar"), { ssr: false })
import { socket } from '@/utils/socket'
import dynamic from 'next/dynamic'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {
    const params = useParams()
    const [open, setOpen] = useState(false)

    useEffect(() => {
        socket.emit("EmbedJoin", params.username)
    }, [])

    return (
        <div>
            <Mode widget={true} />
            <BubleChat />
            <div className='hidden'>
                <Navbar open={open} setOpen={setOpen} />
            </div>
        </div>
    )
}

export default page