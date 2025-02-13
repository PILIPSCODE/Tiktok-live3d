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

    const getYouTubeCookies = () => {
        const cookies = document.cookie
            .split("; ")
            .filter((cookie) =>
                cookie.startsWith("LOGIN_INFO") ||
                cookie.startsWith("PREF") ||
                cookie.startsWith("VISITOR_INFO1_LIVE") ||
                cookie.startsWith("YSC")
            )
            .map((cookie) => cookie.replace("=", "\t"))
            .join("\n");

        console.log(cookies)
    };

    useEffect(() => {
        if (audioRef.current) {
            if (QuequeMusic.length > 0) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            } else {
                audioRef.current.play().catch(err => console.error("Playback error:", err));
            }
        }
    }, [QuequeMusic]);





    return (
        <div onClick={getYouTubeCookies} className="absolute left-2 bottom-2">
            {
                isConnected ?
                    <div className="h-5 w-5 rounded-full bg-green-500"></div>
                    :
                    <div className="h-5 w-5 rounded-full bg-red-500"></div>
            }
        </div>
    );
}