"use client"
import { createContext, useContext } from "react";

export const TiktokConnectionContext = createContext<any>(null);

export const useTiktokConnection = () => {
    const context = useContext(TiktokConnectionContext);
    if (!context) throw new Error('useTiktok must be used within a TiktokProvider');
    return context;
};