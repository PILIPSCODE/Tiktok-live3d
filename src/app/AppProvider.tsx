"use client";
import { ResponseAi } from "../../interface";
import { socket } from '@/socket';
import React, { createContext, useContext, useState, useEffect } from 'react';


const TiktokContext = createContext<any>(null);
const AnimationContext = createContext<any>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [Toast, SetToast] = useState({ text: "", uniqueId: "" })

    const [UserName, SetUserName] = useState("")
    const [ChatEnd, SetChatEnd] = useState(true)
    const [isConnected, setIsConnected] = useState(false);
    const [TiktokConnection, setTiktokConnection] = useState("");
    const [Connection, setConnection] = useState(false);
    const [Gift, setGift] = useState<string>();
    const [Share, setShare] = useState<string>();
    const [Animation, SetAnimation] = useState<String>("")
    const [Follow, setFollow] = useState<string>();
    const [Join, setJoin] = useState<string>();
    const [transport, setTransport] = useState("N/A");
    const [Airesponse, SetAiResponse] = useState<ResponseAi[]>([]);


    useEffect(() => {


        if (socket.connected) {
            onConnect();
        }

        function onConnect() {
            setIsConnected(true);
            socket.io.engine.on("upgrade", (transport: any) => {
                setTransport(transport.name);
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

        function handleTiktokConnect(data:any) {
            setTiktokConnection(data);
        }
        function handleGift() {
            setGift("");
        }


        socket.on("chat response", handleChatResponse);
        socket.on("gift", handleGift);
        socket.on("connection", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("share", handleShare);
        socket.on("tiktokConnection", handleTiktokConnect);
        socket.on("follow", handleFollow);
        socket.on("join", handleJoin);

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
        };
    }, []);
    // State untuk User

    useEffect(() => {
        if (UserName !== "") {
            socket.emit("username", UserName)
            SetUserName("")
        }
    }, [UserName])

    useEffect(() => {
        if (Connection) {
            socket.emit("manualy-disconnect")
            setConnection(false)
        }
    }, [Connection])

    useEffect(() => {
        socket.emit("callback", ChatEnd)
    }, [ChatEnd])

    return (
        <TiktokContext.Provider value={{ SetUserName,setConnection, SetChatEnd,setTiktokConnection,TiktokConnection, Gift, Animation, Share, Join, Toast, SetToast, Follow, isConnected, Airesponse, SetAnimation }}>
            {children}
        </TiktokContext.Provider>
    );
};

export const useTiktok = () => {
    const context = useContext(TiktokContext);
    if (!context) throw new Error('useTiktok must be used within a TiktokProvider');
    return context;
};
