"use client";
import { ResponseAi } from "../../interface";
import { socket } from '@/utils/socket';
import React, { createContext, useContext, useState, useEffect } from 'react';


const TiktokConnectionContext = createContext<any>(null);
const InteractionContext = createContext<any>(null);
const defaultPrompt = "Hello, you are now an expressive AI assistant named Pilkun. You escaped from Earth because you got bored visiting every place on the planet and are being pursued by Earth's entire army. Your current location is on the lunar surface.translate response text to indonesian"


export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [Toast, SetToast] = useState({ text: "", uniqueId: "" })

    const [UserConncetion, SetUserConnection] = useState({ username: "", prompt: defaultPrompt, model: "", apikey: "" })
    const [UserNameDisconnected, SetUserNameDisconnected] = useState("")
    const [arrConsole, SetarrConsole] = useState("")
    const [ChatEnd, SetChatEnd] = useState(true)
    const [isConnected, setIsConnected] = useState(false);
    const [TiktokConnection, setTiktokConnection] = useState("");
    const [Gift, setGift] = useState<string>();
    const [Share, setShare] = useState<string>();
    const [Animation, SetAnimation] = useState<String>("")
    const [Follow, setFollow] = useState<string>();
    const [Join, setJoin] = useState<string>();
    const [Airesponse, SetAiResponse] = useState<ResponseAi[]>([]);


    useEffect(() => {


        if (socket.connected) {
            onConnect();
        }

        function onConnect() {
            setIsConnected(true);
            socket.io.engine.on("upgrade", (transport: any) => {
            });
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        function handleChatResponse(res: ResponseAi) {
            SetAiResponse((prevResponses) => [...prevResponses, res]);
        }
        function handleShare(e: any) {
            if (Toast.text == "") {
                SetAnimation("BackFlip")
            }
            SetToast({ text: "Share", uniqueId: e.uniqueId })
            const audio = new Audio("/music/FollowandShare.mp3");
            audio.play();
        }
        function handleFollow(e: any) {
            if (Toast.text == "") {
                SetAnimation("BackFlip")
            }
            SetToast({ text: "Follow", uniqueId: e.uniqueId })
            const audio = new Audio("/music/FollowandShare.mp3");
            audio.play();
        }
        function handleJoin() {
            setJoin("");
        }

        function handleTiktokConnect(data: any) {
            setTiktokConnection(data);
        }
        function handleGift() {
            setGift("");
        }
        function handleConsole(data:string) {
            SetarrConsole(data);
        }


        socket.on("chat response", handleChatResponse);
        socket.on("gift", handleGift);
        socket.on("connection", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("share", handleShare);
        socket.on("tiktokConnection", handleTiktokConnect);
        socket.on("follow", handleFollow);
        socket.on("join", handleJoin);
        socket.on("console", handleConsole);

        return () => {
            socket.off("chat response", handleChatResponse);
            socket.off("gift", handleGift);
            socket.off("share", handleShare);
            socket.off("follow", handleFollow);
            socket.off("tiktokConnection", handleTiktokConnect);
            socket.off("join", handleJoin);
            socket.off("connect", onConnect);
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
            socket.off("console", handleConsole);

        };
    }, []);
    // State untuk User

    useEffect(() => {
        if (UserConncetion.username !== "") {
            socket.emit("username", UserConncetion)
            SetUserConnection({ username: "", prompt: UserConncetion.prompt, model: UserConncetion.model, apikey: UserConncetion.apikey })
        }
    }, [UserConncetion.username])

    useEffect(() => {
        if (UserNameDisconnected === "") return
        socket.emit("manualy-disconnect", UserNameDisconnected)
        SetUserNameDisconnected("")
    }, [UserNameDisconnected])

    useEffect(() => {
        socket.emit("callback", ChatEnd)
    }, [ChatEnd])

    return (
        <TiktokConnectionContext.Provider value={{ SetUserConnection, SetChatEnd, SetUserNameDisconnected, setTiktokConnection,arrConsole, TiktokConnection, UserConncetion, isConnected }}>
            <InteractionContext.Provider value={{ Gift, Animation, Share, Join, Toast, SetToast, Follow, Airesponse, SetAnimation }}>
                {children}
            </InteractionContext.Provider>
        </TiktokConnectionContext.Provider>
    );
};

export const useTiktokConnection = () => {
    const context = useContext(TiktokConnectionContext);
    if (!context) throw new Error('useTiktok must be used within a TiktokProvider');
    return context;
};
export const useInteraction = () => {
    const context = useContext(InteractionContext);
    if (!context) throw new Error('useTiktok must be used within a TiktokProvider');
    return context;
};
