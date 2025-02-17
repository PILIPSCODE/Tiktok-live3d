"use client"
import { socket } from '@/utils/socket'
import dynamic from 'next/dynamic'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
const Scene = dynamic(() => import("@/components/Mode"), { ssr: false })



const page = () => {
    const params = useParams();



    useEffect(() => {
        socket.emit("EmbedJoin", params.username)
    }, [])
    return (
        <div className='h-screen flex justify-center font-Archivo'>
            <Scene widget={true} />
        </div>
    )
}

export default page