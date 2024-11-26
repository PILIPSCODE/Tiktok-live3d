"use client";
import dynamic from "next/dynamic"
import Connection from "../components/UiForChat/ConectionStatus"
import { AppProvider } from "./AppProvider";
import BubleChat from "@/components/UiForChat/BubleChat";
import Toast from "@/components/Toast";


const AvatarRenderer = dynamic(() => import("@/components/AvatarRender"), { ssr: false })

export default function Home() {



  return (
    <main className="h-screen flex justify-center items-center  ">
      <AppProvider>
        <Toast />
        <AvatarRenderer />
        <Connection />
        <BubleChat />
      </AppProvider>
    </main>
  )
}