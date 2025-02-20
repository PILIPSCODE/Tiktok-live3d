// "use client";
// import { useParams } from 'next/navigation'
// import { socket } from '@/utils/socket'
// import dynamic from "next/dynamic"
// import Toast from "@/components/Toast";
// import { useEffect, useState } from "react";
// import Gifinteraction from "@/components/Gifinteraction";
// const Scene = dynamic(() => import("@/components/Mode"), { ssr: false })
// import BubleChat from "@/components/BubleChat";
// import { useCharacter } from '@/hooks/useCharacter';
// import { useInteraction2d } from '@/hooks/useInteraction2d';

// const RequestMusic = dynamic(() => import("@/components/RequsetMusic"), { ssr: false })
// const Navbar = dynamic(() => import("@/components/SideBar"), { ssr: false })

// const Connection = dynamic(() => import("@/components/ConectionStatus"), { ssr: false })


// export default function Home() {
//     const params = useParams();
//     const { setVoiceSettings } = useCharacter()
//     const { onchat } = useInteraction2d()

//     useEffect(() => {
//         socket.emit("EmbedJoin", params.username)
//     }, [])
//     useEffect(() => {
//         setVoiceSettings({ voice: "Microsoft Jajang Online (Natural) - Sundanese (Indonesia)", rate: "1.5", pitch: "1", volume: "1" })
//     }, [onchat])
//     const [open, setOpen] = useState(false)

//     return (
//         <main className="w-screen  overflow-x-hidden">

//             <div className="h-screen flex items-center font-Archivo relative ">
//                 <section className={`h-screen  relative ${open ? "w-96 max-xl:w-0" : "w-screen"} flex justify-center items-center  duration-500 flex-grow`}>
//                     <Toast />
//                     <Scene widget={true} />
//                     <Gifinteraction />
//                     <BubleChat />
//                     <div className='hidden'>
//                         <Navbar open={open} setOpen={setOpen} />
//                     </div>
//                     <Connection />
//                 </section>
//             </div>
//         </main>
//     )
// }

"use client"

import { useEffect, useState } from "react";

export default function VoiceDebugger() {
    const [voices, setVoices] = useState<string[]>([]);

    useEffect(() => {
        setTimeout(() => {
            const availableVoices = speechSynthesis.getVoices().map(voice => `${voice.name} (${voice.lang})`);
            setVoices(availableVoices);
        }, 3000); // Delay untuk memastikan voice list sudah dimuat
    }, []);

    return (
        <div className="absolute top-5 left-5 bg-black text-white p-4 rounded-lg z-50">
            <h2 className="text-lg font-bold">Available Voices:</h2>
            <ul>
                {voices.length > 0 ? voices.map((voice, index) => (
                    <li key={index}>{voice}</li>
                )) : <li>Loading voices...</li>}
            </ul>
        </div>
    );
}