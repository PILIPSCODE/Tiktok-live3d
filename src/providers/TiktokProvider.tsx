
import React, { useState } from "react";
import useLocalStorage from "@/hooks/LocalStorage";
import { TiktokConnectionContext } from "@/hooks/UseTiktokConnection";


const defaultPrompt = "Hello, you are now an expressive AI assistant named Pilkun. You escaped from Earth because you got bored visiting every place on the planet and are being pursued by Earth's entire army. Your current location is on the lunar surface.translate response text to indonesian"
export const TiktokProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // State TikTok
    const [isConnected, setIsConnected] = useState(false);
    const [TiktokConnection, setTiktokConnection] = useState("");
    const [inputUser, setInputUser] = useState("");
    const [ChatEnd, SetChatEnd] = useState(true)
    const [UserNameDisconnected, setUserNameDisconnected] = useState("");

    // Simpan di localstorage biar persistent
    const [version, setVersion] = useLocalStorage("version", "2d");
    const [UserConncetion, setUserConnection] = useLocalStorage("Connection", {
        username: "",
        prompt: defaultPrompt,
        model: "",
        apikey: "",
    });



    return (
        <TiktokConnectionContext.Provider
            value={{
                SetUserConnection: setUserConnection,
                SetUserNameDisconnected: setUserNameDisconnected,
                setTiktokConnection,
                setVersion,
                setIsConnected,
                SetChatEnd,
                setInputUser,
                ChatEnd,
                UserNameDisconnected,
                TiktokConnection,
                UserConncetion,
                isConnected,
                version,
                inputUser,
            }}
        >
            {children}
        </TiktokConnectionContext.Provider>
    );
};
