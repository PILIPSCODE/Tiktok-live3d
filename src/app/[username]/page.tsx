"use client";
import { useParams } from 'next/navigation'
import { socket } from '@/utils/socket'
import dynamic from "next/dynamic"
import Toast from "@/components/Toast";
import { useEffect, useState } from "react";
import Gifinteraction from "@/components/Gifinteraction";
const Scene = dynamic(() => import("@/components/Mode"), { ssr: false })
import BubleChat from "@/components/BubleChat";
import { useCharacter } from '@/hooks/useCharacter';
import { useInteraction2d } from '@/hooks/useInteraction2d';
import { useRouter } from 'next/router';

const RequestMusic = dynamic(() => import("@/components/RequsetMusic"), { ssr: false })
const Navbar = dynamic(() => import("@/components/SideBar"), { ssr: false })

const Connection = dynamic(() => import("@/components/ConectionStatus"), { ssr: false })


export default function Home() {
    const params = useParams();
    const { setVoiceSettings } = useCharacter()
    const { onchat } = useInteraction2d()
    const router = useRouter()

    useEffect(() => {
        socket.emit("EmbedJoin", params.username)
    }, [])
    useEffect(() => {
        setVoiceSettings({ voice: "Microsoft Jajang Online (Natural) - Sundanese (Indonesia)", rate: "1.5", pitch: "1", volume: "1" })
    }, [onchat])
    const [open, setOpen] = useState(false)

    return (
        <main className="w-screen  overflow-x-hidden">

            <div className="h-screen flex items-center font-Archivo relative ">
                <section className={`h-screen  relative ${open ? "w-96 max-xl:w-0" : "w-screen"} flex justify-center items-center  duration-500 flex-grow`}>
                    <Toast />
                    <Scene widget={true} />
                    <Gifinteraction />
                    <BubleChat />
                    <div className='hidden'>
                        <Navbar open={open} setOpen={setOpen} />
                    </div>
                    <Connection />
                </section>
            </div>
        </main>
    )
}