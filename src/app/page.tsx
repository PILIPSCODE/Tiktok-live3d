"use client";
import dynamic from "next/dynamic"
import Connection from "../components/UiForChat/ConectionStatus"
import { AppProvider } from "./AppProvider";
import BubleChat from "@/components/UiForChat/BubleChat";
import Toast from "@/components/Toast";

const Scene = dynamic(() => import("@/components/Scene"), { ssr: false })

export default function Home() {



  return (
    <AppProvider>
    <main className="h-screen flex justify-center items-center  ">
      <Toast/>
      <Scene />
      <Connection />
      <BubleChat/>
    </main>
    </AppProvider>
  )
}