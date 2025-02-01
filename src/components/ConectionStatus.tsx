"use client"

import { useMusic } from "@/hooks/useMusic";
import { useTiktokConnection } from "@/hooks/UseTiktokConnection";
import { useEffect, useRef } from "react";



export default function Connection() {
    const { isConnected } = useTiktokConnection();
    const { QuequeMusic } = useMusic()
    const audioRef = useRef<HTMLAudioElement | null>(null);


    useEffect(() => {
        audioRef.current = new Audio("/music/sound.mp3");
        audioRef.current.loop = true;
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.src = "";
            }
        };
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            if (QuequeMusic.length > 0) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
                console.log("Audio stopped");
            } else {
                audioRef.current.play().catch(err => console.error("Playback error:", err));
                console.log("Audio playing");
            }
        }
    }, [QuequeMusic]);



    return (
        <div className="absolute left-2 bottom-2">
            {
                isConnected ?
                    <div className="h-5 w-5 rounded-full bg-green-500"></div>
                    :
                    <div className="h-5 w-5 rounded-full bg-red-500"></div>
            }
        </div>
    );
}