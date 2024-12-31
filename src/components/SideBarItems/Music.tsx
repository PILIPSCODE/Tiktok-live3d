"use client"
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import Input from '../Ui/input';
import Image from 'next/image';
import { useResponse } from '@/hooks/useResponse';
import { MusicType } from '../../../interface';


const port = process.env.NEXT_PUBLIC_IS_PRODUCTION === "production"
  ? process.env.NEXT_PUBLIC_BACKEND
  : "http://localhost:8000"

function Music() {
  const { MusicTitle, setMusicTitle } = useResponse();
  const [inputMusic, setinputMusic] = useState("");
  const [loading, setLoading] = useState(false);
  const [QuequeMusic, setQuequeMusic] = useState<MusicType[]>([]);
  const [currentTrack, setCurrentTrack] = useState<MusicType | null>(null);
  const [isPlay, setIsPlay] = useState(false);
  const [skip, setSkip] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const ReqMusic = async () => {
    setLoading(true);
    setMusicTitle((prev: any) => [...prev, inputMusic]);
  };

  useEffect(() => {
    if (currentTrack && !isPlay) {
      const audio = new Audio("data:audio/mp3;base64," + currentTrack.audio);
      audio.volume = 0.3;
      audioRef.current = audio;

      const handleEnded = () => {
        setIsPlay(false);
        setQuequeMusic((prev) => prev.slice(1));
        setCurrentTrack(null);
      };

      audio.play();
      setIsPlay(true);

      audio.addEventListener("ended", handleEnded);

      if (skip === currentTrack.title) {
        audio.pause();
        setIsPlay(false);
        setCurrentTrack(null);
        setQuequeMusic((prev) => prev.slice(1));
      }

      return () => {
        audio.removeEventListener("ended", handleEnded);
        audio.pause();
        audio.src = "";
        audioRef.current = null;
      };
    }
  }, [currentTrack, skip]);

  useEffect(() => {
    if (!isPlay && QuequeMusic.length > 0) {
      const nextTrack = QuequeMusic[0];
      setCurrentTrack(nextTrack);
    }
  }, [QuequeMusic, isPlay]);

  useEffect(() => {
    if (MusicTitle.length === 0) return;
    const Queque = MusicTitle.shift();
    const getMusic = async () => {
      try {
        const randomIP = generateRandomIP()
        const res = await axios.get(`${port}/reqMusic?title=${Queque}`, {
          headers: {
            'X-Forwarded-For': randomIP,
          },
        });
        const data = await res.data;
        if (data) {
          setinputMusic("")
          setQuequeMusic((prev) => [...prev, data]);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    getMusic();
  }, [MusicTitle]);

  return (
    <div className="p-4">
      <p className={`${loading ? "" : "hidden"}`}>Please Wait...</p>
      <div className={`flex w-full my-3 gap-4 overflow-x-scroll ${QuequeMusic.length === 0 ? "hidden" : ""}`}>
        {QuequeMusic.map((e, index) => (
          <div
            key={index}
            className={`flex flex-shrink-0 gap-2 w-96 my-2 bg-gray-400 relative p-2 rounded-md items-center`}
          >
            <div className="w-20 h-20 relative flex-shrink-0">
              <Image
                className="rounded-full object-fill"
                fill
                src={e.thumbnails || "/imgChar/PilKia.png"}
                alt="thumbnails"
              />
            </div>
            <p
              onClick={() => {
                setSkip(e.title);
                setIsPlay(false);
              }}
              className="absolute text-red-500 w-6 h-6 flex justify-center items-center  right-2 top-2 border border-red-500 rounded-full"
            >
              X
            </p>
            <p className="text-sm">{index === 0 ? "Playing" : "Waiting"} : {e.title}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Input
          Inputsize={"sm"}
          placeholder="Title || Creator"
          value={inputMusic}
          onChange={(e) => setinputMusic(e.target.value)}
          className="w-full"
        />
        <button
          className="bg-black text-white p-3 rounded-md transition-transform duration-300 transform hover:scale-105"
          onClick={ReqMusic}
        >
          Play
        </button>
      </div>
    </div>
  );
}

function generateRandomIP() {
  return Array.from({ length: 4 }, () => Math.floor(Math.random() * 256)).join('.');
}

export default Music;
