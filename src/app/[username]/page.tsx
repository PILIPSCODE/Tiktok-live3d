// "use client"
// import BubleChat from '@/components/BubleChat'
// import Mode from '@/components/Mode'
// const Navbar = dynamic(() => import("@/components/SideBar"), { ssr: false })
// import { socket } from '@/utils/socket'
// import dynamic from 'next/dynamic'
// import { useParams } from 'next/navigation'
// import React, { useEffect, useState } from 'react'

// const page = () => {
//     const params = useParams()
//     const [open, setOpen] = useState(false)

//     useEffect(() => {
//         socket.emit("EmbedJoin", params.username)
//     }, [])

//     return (
//         <div className="flex justify-center font-Archivo">
//             <Mode widget={true} />
//             <BubleChat />
//             <div className='hidden'>
//                 <Navbar open={open} setOpen={setOpen} />
//             </div>
//         </div>
//     )
// }

// export default page



"use client"

import { useEffect, useState } from "react";

export default function VoiceDebugger() {
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);


    useEffect(() => {
        setTimeout(() => {
            const loadVoices = () => setVoices(speechSynthesis.getVoices());
            loadVoices();
        }, 3000); // Delay untuk memastikan voice list sudah dimuat
        if (typeof window !== "undefined" && speechSynthesis) {
            const loadVoices = () => setVoices(speechSynthesis.getVoices());
            loadVoices();

            speechSynthesis.onvoiceschanged = loadVoices;
        }
    }, []);

    return (
        <div className="absolute top-5 left-5 bg-black text-white p-4 rounded-lg z-50">
            <h2 className="text-lg font-bold">Available Voices:</h2>
            <ul>
                {voices.length > 0 ? voices.map((voicess, index) => (
                    <li key={index}>{voicess.voiceURI}</li>
                )) : <li>Loading voices...</li>}
            </ul>
        </div>
    );


}