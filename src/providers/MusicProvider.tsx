
import React, { useState, useRef } from "react";
import { MusicContext } from "@/hooks/useMusic";
import { MusicType, ReqMusic } from "../../interface";
import useLocalStorage from "@/hooks/LocalStorage";



export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [QuequeMusic, setQuequeMusic] = useState<MusicType[]>([]);
    const [MusicTitle, setMusicTitle] = useState<ReqMusic[]>([]);
    const [GiftReqMusic, setGiftReqMusic] = useLocalStorage<string>("GiftReqMusic", "");
    const checkboxMusic = useRef<HTMLInputElement>(null);
    const [isPlay, setIsPlay] = useState(false);
    const [skip, setSkip] = useState("");




    return (
        <MusicContext.Provider
            value={{
                setSkip,
                skip,
                setIsPlay,
                isPlay,
                QuequeMusic,
                setQuequeMusic,
                MusicTitle,
                setMusicTitle,
                checkboxMusic,
                GiftReqMusic,
                setGiftReqMusic,
            }}
        >
            {children}
        </MusicContext.Provider>
    );
};
