"use client"
import { createContext, useContext } from "react";

export const ResponseContext = createContext<any>(null);

export const useResponse = () => {
    const context = useContext(ResponseContext);
    if (!context) throw new Error('useResponse must be used within a ResponseProvider');
    return context;
};