"use client";
import { useParams } from 'next/navigation'
import { socket } from '@/utils/socket'
import dynamic from "next/dynamic"
import Toast from "@/components/Toast";
import { useEffect, useState } from "react";
import Gifinteraction from "@/components/Gifinteraction";
import { useTiktokConnection } from "@/hooks/UseTiktokConnection";
const Scene = dynamic(() => import("@/components/Mode"), { ssr: false })
import BubleChat from "@/components/BubleChat";

const RequestMusic = dynamic(() => import("@/components/RequsetMusic"), { ssr: false })
const Connection = dynamic(() => import("@/components/ConectionStatus"), { ssr: false })
const Navbar = dynamic(() => import("@/components/SideBar"), { ssr: false })


export default function Home() {
    const params = useParams();

    useEffect(() => {
        socket.emit("EmbedJoin", params.username)
    }, [])
    const [open, setOpen] = useState(false)

    return (
        <main className="w-screen  overflow-x-hidden">

            <div className="h-screen flex items-center font-Archivo relative ">
                <section className={`h-screen  relative ${open ? "w-96 max-xl:w-0" : "w-screen"} flex justify-center items-center  duration-500 flex-grow`}>
                    <Toast />
                    <Scene widget={true} />
                    <div className="bottom-16 z-10 absolute max-w-80">
                        <RequestMusic in="display" />
                    </div>
                    <Gifinteraction />
                    <BubleChat />
                    <Connection />
                </section>
            </div>
        </main>
    )
}