"use client";
import dynamic from "next/dynamic"
import Connection from "../components/ConectionStatus"
import { AppProvider } from "./AppProvider";
import BubleChat from "@/components/BubleChat";

import Toast from "@/components/Toast";
import Navbar from "@/components/SideBar";
import RequestMusic from "@/components/RequsetMusic";
import { useEffect, useState } from "react";


const Scene = dynamic(() => import("@/components/Scene"), { ssr: false })

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
    <main className="w-screen overflow-x-hidden">
      <AppProvider>
        <div className="h-screen flex items-center font-Archivo">
          <section className={`h-screen  relative ${open ? "w-96 max-xl:w-0" : "w-screen"} flex justify-center items-center  duration-500 flex-grow`}>
            <Toast />
            {showScene ? <Scene /> : "Loading..."}
            <div className="bottom-16 z-10 absolute max-w-80">
              <RequestMusic in="display" />
            </div>
            <BubleChat />
            <Connection />
          </section>
          <Navbar open={open} setOpen={setOpen} />
        </div>
      </AppProvider>

    </main>
  )
}