"use client";
import dynamic from "next/dynamic"
import Toast from "@/components/Toast";
import { useEffect, useState } from "react";
import Gifinteraction from "@/components/Gifinteraction";
import VersionChanger from "./versionChanger";

const RequestMusic = dynamic(() => import("@/components/RequsetMusic"), { ssr: false })
const Connection = dynamic(() => import("@/components/ConectionStatus"), { ssr: false })
const BubleChat = dynamic(() => import("@/components/BubleChat"), { ssr: false })
const Navbar = dynamic(() => import("@/components/SideBar"), { ssr: false })


export default function Home() {
  const [open, setOpen] = useState(false)

  const [showScene, setShowScene] = useState(true);


  useEffect(() => {
    if (open) {
      setShowScene(false)
      const timer = setTimeout(() => {
        setShowScene(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setShowScene(false)
      const timer = setTimeout(() => {
        setShowScene(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [open]);


  return (
    <main className="w-screen  overflow-x-hidden">

      <div className="h-screen flex items-center font-Archivo relative ">
        <section className={`h-screen  relative ${open ? "w-96 max-xl:w-0" : "w-screen"} flex justify-center items-center  duration-500 flex-grow`}>
          <Toast />
          <VersionChanger setShowScene={setShowScene} showScene={showScene} />
          <div className="bottom-16 z-10 absolute max-w-80">
            <RequestMusic in="display" />
          </div>
          <Gifinteraction />
          <BubleChat />
          <Connection />
        </section>
        <Navbar open={open} setOpen={setOpen} />
      </div>
    </main>
  )
}