"use client"
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import Input from '../Ui/input';
import { MusicType, ReqMusic } from '../../../interface';
import CustomSelect from '../Ui/select';
import GiftList from "../../../gift.json"
import { useMusic } from '@/hooks/useMusic';
import RequsetMusic from '../RequsetMusic';


const port = process.env.NEXT_PUBLIC_IS_PRODUCTION === "production"
  ? process.env.NEXT_PUBLIC_BACKEND
  : "http://localhost:8000"

function Music() {
  const { QuequeMusic, setQuequeMusic, MusicTitle, setMusicTitle, isPlay, setIsPlay, skip, GiftReqMusic, checkboxMusic, setGiftReqMusic } = useMusic();
  const [inputMusic, setinputMusic] = useState("");
  const [giftReq, setGiftReq] = useState<string | null>(null);
  const [musicVolume, setMusicVolume] = useState("0.5");

  const [loading, setLoading] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<MusicType | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const ReqMusic = async () => {
    setLoading(true)
    if (inputMusic !== "") {
      setMusicTitle((prev: ReqMusic[]) => [...prev, { uniqueId: "Creator", Title: `Processing ${inputMusic}`, img: "/imgChar/PilBot.png" }]);
    }
  };


  useEffect(() => {
    if (GiftReqMusic) {
      setGiftReq(GiftReqMusic);
    }
  }, [GiftReqMusic]);



  useEffect(() => {
    if (currentTrack && !isPlay) {
      const audio = new Audio("data:audio/mp3;base64," + currentTrack.audio);
      audio.volume = Number(musicVolume);
      audioRef.current = audio;

      const handleEnded = () => {
        setIsPlay(false);
        setQuequeMusic((prev: any) => prev.slice(1));
        setCurrentTrack(null);
      };

      audio.play();
      setIsPlay(true);

      audio.addEventListener("ended", handleEnded);

      if (skip === currentTrack.title) {
        audio.pause();
        setIsPlay(false);
        setCurrentTrack(null);
        setQuequeMusic((prev: any) => prev.slice(1));
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
    if (audioRef.current) {
      audioRef.current.volume = Number(musicVolume);
    }
  }, [musicVolume])

  useEffect(() => {
    if (!isPlay && QuequeMusic.length > 0) {
      const nextTrack = QuequeMusic[0];
      setCurrentTrack(nextTrack);
    }
  }, [QuequeMusic, isPlay]);

  useEffect(() => {
    if (MusicTitle.length === 0) return;
    const index = MusicTitle.findIndex((e: any) => e.Title !== "");
    if (index !== -1) {
      const Queque = MusicTitle[index];
      const Title = Queque.Title.replace("Processing", " ")
      const getMusic = async () => {
        try {
          const res = await axios.get(`${port}/reqMusic?title=${Title}`);
          const data = await res.data;

          if (data) {
            setMusicTitle((prev: ReqMusic[]) => [...prev.slice(0, index), ...prev.slice(index + 1)]);
            setQuequeMusic((prev: ReqMusic[]) => [...prev, { audio: data.audio, title: data.title, thumbnails: data.thumbnails, uniqueId: Queque.uniqueId }]);
            setinputMusic("")
            setLoading(false);
          }
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
      };
      getMusic();
    }

  }, [MusicTitle]);

  return (
    <div className="p-4">
      <p className={`${loading ? "" : "hidden"}`}>Please Wait...</p>
      <RequsetMusic in='sidebar' />
      <div className='text-sm my-2'>
        <h1>Volume</h1>
        <div className='flex gap-2 items-center'>
          <input defaultValue={musicVolume} onChange={(e) => setMusicVolume(e.target.value)} type="range" min={0} max="1" className="range" step="0.1" />
          <p>{musicVolume}</p>
        </div>
      </div>
      <div className="flex gap-2 mt-3">
        <Input
          Inputsize={"sm"}
          placeholder="Title || Author"
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
      <div className='flex p-2 gap-2 items-center my-3 text-base'>
        <p>Req Musiq</p>
        <input type="checkbox" ref={checkboxMusic} className="toggle toggle-info" />
      </div>
      <div className={`flex max-md:flex-col max-md:items-stretch gap-2 my-1  items-start rounded-md ${checkboxMusic.current?.checked ? "" : "hidden"}`}>
        <CustomSelect
          placeholder="OnGift"
          options={GiftList}
          className="text-xs"
          defaultValue={giftReq || ""}
          displayKey="name"
          onSelect={(selectOption) => { setGiftReqMusic(selectOption.name) }}
        />
      </div>
    </div>
  );
}


export default Music;
