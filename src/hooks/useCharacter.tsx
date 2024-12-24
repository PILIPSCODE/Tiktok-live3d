"use client"
import { createContext, useContext } from "react";

export const CharacterContext = createContext<any>(null);

export const useCharacter = () => {
    const context = useContext(CharacterContext);
    if (!context) throw new Error('useCharacter must be used within a CharacterProvider');
    return context;
};