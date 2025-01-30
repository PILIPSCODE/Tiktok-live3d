"use client"
import { createContext, useContext } from "react";

export const MusicContext = createContext<any>(null);

export const useMusic = () => {
    const context = useContext(MusicContext);
    if (!context) throw new Error('useMusic must be used within a MusicProvider');
    return context;
};