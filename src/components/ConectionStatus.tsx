"use client"

import { useTiktokConnection } from "@/hooks/UseTiktokConnection";



export default function Connection() {
    const { isConnected} = useTiktokConnection();
    
    return (
        <div className="absolute left-2 bottom-2">
                {
                    isConnected ?
                        <div className="h-5 w-5 rounded-full bg-green-500"></div>
                        :
                        <div className="h-5 w-5 rounded-full bg-red-500"></div>
                }
        </div>
    );
}