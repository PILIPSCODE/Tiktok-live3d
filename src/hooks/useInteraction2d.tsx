"use client"
import { createContext, useContext } from "react";

export const InteractionContext2d = createContext<any>(null);

export const useInteraction2d = () => {
    const context = useContext(InteractionContext2d);
    if (!context) throw new Error('useInteraction must be used within a InteractionProvider');
    return context;
};