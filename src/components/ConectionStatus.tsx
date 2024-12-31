"use client"

import { useTiktokConnection } from "@/hooks/UseTiktokConnection";
import { useEffect, useRef } from "react";



export default function Connection() {
    const { isConnected } = useTiktokConnection();
    const audioRef = useRef<HTMLAudioElement | null>(null);


    useEffect(() => {
        audioRef.current = new Audio("/music/sound.mp3");
        audioRef.current.loop = true;
        audioRef.current.volume = 0.5;

        audioRef.current.addEventListener('error', (e) => {
            console.error("Kesalahan memuat audio:", e);
        });
    }, []);


    const handlePlayAudio = async () => {
        if (audioRef.current) {
            try {
                await audioRef.current.play();
            } catch (error) {
                console.error("Audio tidak bisa diputar:", error);
            }
        }
    };

    return (
        <div onClick={handlePlayAudio} className="absolute left-2 bottom-2">
            {
                isConnected ?
                    <div className="h-5 w-5 rounded-full bg-green-500"></div>
                    :
                    <div className="h-5 w-5 rounded-full bg-red-500"></div>
            }
        </div>
    );
}