"use client"
import { createContext, useContext } from "react";

export const InteractionContext = createContext<any>(null);

export const useInteraction = () => {
    const context = useContext(InteractionContext);
    if (!context) throw new Error('useInteraction must be used within a InteractionProvider');
    return context;
};