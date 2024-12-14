"use client"

import { useEffect, useRef } from "react";
import {  useTiktokConnection } from "../../app/AppProvider";


export default function Connection() {
    const { isConnected} = useTiktokConnection();
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
          await audioRef.current.play(); // Mencoba memutar audio
        } catch (error) {
          console.error("Audio tidak bisa diputar:", error); // Menangani kesalahan
        }
      }
    };
  
    return (
        <div  onClick={() => {handlePlayAudio() }}  className="absolute left-2 bottom-8">
                {
                    isConnected ?
                        <div className="h-5 w-5 rounded-full bg-green-500"></div>
                        :
                        <div className="h-5 w-5 rounded-full bg-red-500"></div>
                }
        </div>
    );
}