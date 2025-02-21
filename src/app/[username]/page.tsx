"use client"
import BubleChat from '@/components/BubleChat'
import Mode from '@/components/Mode'
import Navbar from '@/components/SideBar'
import { socket } from '@/utils/socket'
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