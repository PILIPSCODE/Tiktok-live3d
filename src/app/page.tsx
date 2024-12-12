"use client";
import dynamic from "next/dynamic"
import Connection from "../components/UiForChat/ConectionStatus"
import { AppProvider } from "./AppProvider";
import BubleChat from "@/components/UiForChat/BubleChat";
import Toast from "@/components/Toast";
import Navbar from "@/components/SideBar";
import { useState } from "react";


const Scene = dynamic(() => import("@/components/Scene"), { ssr: false })

export default function Home() {
  const [open, setOpen] = useState(false)



  return (
    <main className="w-screen overflow-x-hidden">
      <AppProvider>
        <div className="h-screen flex items-center font-Archivo">
        <section className={`h-screen  relative ${ open? "w-96 max-md:w-0":"w-screen"} flex justify-center items-center transition-all duration-300 flex-grow`}>
          <Toast />
          <Scene />
          <BubleChat />
          <Connection />
        </section>
          <Navbar open={open} setOpen={setOpen}/>
        </div>
      </AppProvider>

    </main>
  )
}