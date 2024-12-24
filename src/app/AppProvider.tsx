"use client";
import { TiktokConnectionContext } from "@/hooks/UseTiktokConnection";
import { BubbleSettings, Interaction, ResorceType, ResponseAi, VoiceSettings } from "../../interface";
import { socket } from '@/utils/socket';
import React, { useState, useEffect } from 'react';
import { ResponseContext } from "@/hooks/useResponse";
import { InteractionContext } from "@/hooks/useInteraction";
import { CharacterContext } from "@/hooks/useCharacter";
import test from "../../test.json"
import useLocalStorage from "@/hooks/LocalStorage";
import useIndexedDB from "@/hooks/useIndexDB";

const defaultPrompt = "Hello, you are now an expressive AI assistant named Pilkun. You escaped from Earth because you got bored visiting every place on the planet and are being pursued by Earth's entire army. Your current location is on the lunar surface.translate response text to indonesian"

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [Toast, SetToast] = useState({ text: "", uniqueId: "" })

    const [UserNameDisconnected, SetUserNameDisconnected] = useState("")
    const [arrConsole, SetarrConsole] = useState("")
    const [ChatEnd, SetChatEnd] = useState(true)
    const [isConnected, setIsConnected] = useState(false);
    const [TiktokConnection, setTiktokConnection] = useState("");
    const [Gift, setGift] = useState();
    const [Share, setShare] = useState<any[]>([]);
    const [Animation, SetAnimation] = useState<String>("")
    const [Follow, setFollow] = useState<any[]>([]);
    const [Join, setJoin] = useState<string>();
    const [Airesponse, SetAiResponse] = useState<ResponseAi[]>([]);
    const [hold, SetHold] = useState(false);

    const [UserConncetion, SetUserConnection] = useLocalStorage("Connection", { username: "", prompt: defaultPrompt, model: "", apikey: "" })
    const [Character, setCharacter] = useLocalStorage("Character", "/PilKun.glb");
    const [Resource, setResource] = useIndexedDB<ResorceType[]>("Resource", []);
    const [BubbleChat, setBubbleChat] = useLocalStorage<BubbleSettings>("BubbleSettings", { TypeBorder: "Border3", CommentPosition: "text-center", ResponsePosition: "text-justify", usernamePosition: "text-left" });
    const [showBubble, setShowBubble] = useState(false);
    const [MusicTitle, setMusicTitle] = useState<string[]>([]);
    const [Intercation, SetInteraction] = useLocalStorage<Interaction[]>("interaction", []);
    const [voiceSettings, setVoiceSettings] = useLocalStorage<VoiceSettings>("VoiceSettings", { voice: "", rate: "1", pitch: "1", volume: "1" });





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
            if (Airesponse.length === 0) {
                SetHold(false)
                SetChatEnd(true)
            }
            if (Airesponse.length >= 5) {
                SetHold(true)
                SetChatEnd(false)
            }
            if (Airesponse.length < 5 && hold === false && res !== null) {

                SetAiResponse((prevResponses) => [...prevResponses, res]);
            }
        }
        function handleShare(data: any) {
            setShare((prev) => [...prev, data]);
        }
        function handleFollow(data: any) {
            setFollow((prev) => [...prev, data]);
        }
        function handleJoin() {
            setJoin("");
        }

        function handleTiktokConnect(data: any) {
            setTiktokConnection(data);
        }
        function handleGift(data: any) {
            setGift(data)

        }
        function handleConsole(data: string) {
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
    }, [Intercation, Airesponse, hold]);

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
        <TiktokConnectionContext.Provider value={{ SetUserConnection, SetChatEnd, SetUserNameDisconnected, setTiktokConnection, TiktokConnection, UserConncetion, isConnected }}>
            <InteractionContext.Provider value={{ Gift, Animation, Share, Join, Toast, SetToast, Follow, Intercation, SetInteraction, SetAnimation, setGift, hold }}>
                <CharacterContext.Provider value={{ Character, setCharacter, voiceSettings, setVoiceSettings, Resource, setResource }}>
                    <ResponseContext.Provider value={{ Airesponse, arrConsole, BubbleChat, SetAiResponse, setBubbleChat, setShowBubble, showBubble, MusicTitle, setMusicTitle }}>
                        {children}
                    </ResponseContext.Provider>
                </CharacterContext.Provider>
            </InteractionContext.Provider>
        </TiktokConnectionContext.Provider>
    );
};


