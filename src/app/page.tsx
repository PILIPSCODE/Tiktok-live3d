"use client";
import dynamic from "next/dynamic"
import Toast from "@/components/Toast";
import { useEffect, useState } from "react";
import Gifinteraction from "@/components/Gifinteraction";
import { useTiktokConnection } from "@/hooks/UseTiktokConnection";


const RequestMusic = dynamic(() => import("@/components/RequsetMusic"), { ssr: false })
const Connection = dynamic(() => import("@/components/ConectionStatus"), { ssr: false })
const Navbar = dynamic(() => import("@/components/SideBar"), { ssr: false })


export default function Home() {
  const [open, setOpen] = useState(false)
  const { inputUser } = useTiktokConnection()

  return (
    <main className="w-screen  overflow-x-hidden">

      {/* <div className="h-screen flex items-center font-Archivo relative ">
        <section className={`h-screen  relative ${open ? "w-96 max-xl:w-0" : "w-screen"} flex justify-center items-center  duration-500 flex-grow`}>
          <Toast />
          <iframe src={`/${inputUser || "default"}`} className="w-full h-full rounded-lg shadow-lg" />
          <div className="bottom-16 z-10 absolute max-w-80">
            <RequestMusic in="display" />
          </div>
          <Gifinteraction />
          <Connection />
        </section>
        <Navbar open={open} setOpen={setOpen} />
      </div> */}
    </main>
  )
}