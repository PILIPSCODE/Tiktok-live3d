"use client";
import { ResponseAi } from "../../interface";
import { socket } from "../socket";
import React, { createContext, useContext, useState, useEffect } from 'react';


const TiktokContext = createContext<any>(null);
const AnimationContext = createContext<any>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [Toast, SetToast] = useState({text:"",uniqueId:""})

    const [UserName, SetUserName] = useState("")
    const [ChatEnd, SetChatEnd] = useState(false)

    const [isConnected, setIsConnected] = useState(false);
    const [mode,SetMode] = useState<string>("");
    const [MainChar,SetMainChar] = useState<string>("");
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
            socket.io.engine.on("upgrade", (transport) => {
                setTransport(transport.name);
              });
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        function handleChatResponse(res:ResponseAi) {
            SetAiResponse((prevResponses) => [...prevResponses, res]);
        }
        function handleShare(e:any) {
            if(Toast.text == "" ){
                SetAnimation("BackFlip")
            }
            SetToast({text:"Share",uniqueId:e.uniqueId})
            const audio = new Audio("/music/FollowandShare.mp3");
            audio.play();
        }
        function handleFollow(e:any) {
            if(Toast.text == "" ){
                SetAnimation("BackFlip")
            }
            SetToast({text:"Follow",uniqueId:e.uniqueId})
            const audio = new Audio("/music/FollowandShare.mp3");
            audio.play();
        }
        function handleJoin() {
            setJoin("");
        }

        function handleGift() {
            setGift("");
        }


        socket.on("chat response", handleChatResponse);
        socket.on("gift", handleGift);
        socket.on("connection", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("share", handleShare);
        socket.on("follow", handleFollow);
        socket.on("join", handleJoin);

        return () => {
            socket.off("chat response", handleChatResponse); 
            socket.off("gift", handleGift);
            socket.off("share", handleShare); 
            socket.off("follow", handleFollow); 
            socket.off("join", handleJoin); 
            socket.off("connect", onConnect);
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
        };
    }, []);
    // State untuk User

    useEffect(() => {
        socket.emit("username",UserName)
    },[UserName])
    useEffect(() => {
        socket.emit("callback",ChatEnd)
    },[ChatEnd])

    return (
        <TiktokContext.Provider value={{ SetUserName,SetChatEnd,Gift,Animation,Share,Join,Toast,SetToast, Follow, isConnected, Airesponse, SetAnimation}}>
            {children}
        </TiktokContext.Provider>
    );
};

export const useTiktok = () => {
    const context = useContext(TiktokContext);
    if (!context) throw new Error('useTiktok must be used within a TiktokProvider');
    return context;
  };
  