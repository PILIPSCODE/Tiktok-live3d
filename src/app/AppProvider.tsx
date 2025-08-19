"use client";
import React from "react";
import { TiktokProvider } from "@/providers/TiktokProvider";
import { InteractionProvider } from "@/providers/InteractionProvider";
import { Interaction2dProvider } from "@/providers/Interaction2DProvider";
import { CharacterProvider } from "@/providers/CharactherProvider";
import { ResponseProvider } from "@/providers/ResponseProvider";
import { MusicProvider } from "@/providers/MusicProvider";
import { InteractionOrchestrator } from "@/orchestrators/InteractionOrchestrator";
import { MusicOrchestrator } from "@/orchestrators/MusicOrchestrator";
import { ResponseOrchestrator } from "@/orchestrators/ResponseOrchestrator";
import { TiktokOrchestrator } from "@/orchestrators/TiktokOrchestrator";


export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <ResponseProvider>
            <TiktokProvider>
                <InteractionProvider>
                    <Interaction2dProvider>
                        <CharacterProvider>
                            <MusicProvider>
                                {children}
                                <InteractionOrchestrator />
                                <MusicOrchestrator />
                                <ResponseOrchestrator />
                                <TiktokOrchestrator />
                            </MusicProvider>
                        </CharacterProvider>
                    </Interaction2dProvider>
                </InteractionProvider>
            </TiktokProvider>
        </ResponseProvider>
    );
};







// "use client";
// import { TiktokConnectionContext } from "@/hooks/UseTiktokConnection";
// import { BubbleSettings, commandInteraction, Interaction, Interaction2d, MusicType, ReqMusic, ResorceType, ResponseAi, setAnimation, VoiceSettings } from "../../interface";
// import { socket } from '@/utils/socket';
// import React, { useState, useEffect, useRef } from 'react';
// import { ResponseContext } from "@/hooks/useResponse";
// import { InteractionContext } from "@/hooks/useInteraction";
// import { CharacterContext } from "@/hooks/useCharacter";
// import { MusicContext } from "@/hooks/useMusic";
// import useLocalStorage from "@/hooks/LocalStorage";
// import useIndexedDB from "@/hooks/useIndexDB";
// import { FrameCommentDetector } from "@/utils/framerDetect";
// import { InteractionContext2d } from "@/hooks/useInteraction2d";



// const defaultPrompt = "Hello, you are now an expressive AI assistant named Pilkun. You escaped from Earth because you got bored visiting every place on the planet and are being pursued by Earth's entire army. Your current location is on the lunar surface.translate response text to indonesian"
// const frammerDetection = new FrameCommentDetector(0, 1, 30000, 30000)
// frammerDetection.monitor()

// export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

//     // TIktok Connection
//     const [UserNameDisconnected, SetUserNameDisconnected] = useState("")
//     const [TiktokConnection, setTiktokConnection] = useState("");
//     const [inputUser, setInputUser] = useState("")
//     const [isConnected, setIsConnected] = useState(false);
//     const [ChatEnd, SetChatEnd] = useState(true)
//     const [version, setVersion] = useLocalStorage("version", "2d");
//     const [UserConncetion, SetUserConnection] = useLocalStorage("Connection", { username: "", prompt: defaultPrompt, model: "", apikey: "" })

//     // Interaction
//     const [Toast, SetToast] = useState({ text: "", uniqueId: "" })
//     const [arrConsole, SetarrConsole] = useState("")
//     const [Animation, SetAnimation] = useState<setAnimation>({ animation: "Idle", playOn: "" })
//     const [Join, setJoin] = useState<string>();
//     const [Gift, setGift] = useState();
//     const [Share, setShare] = useState();
//     const [Follow, setFollow] = useState();
//     const [hold, SetHold] = useState(false);
//     const [isGiftAnimation, setIsGiftAnimation] = useState(false);
//     const [Intercation, SetInteraction] = useLocalStorage<Interaction[]>("interaction", []);
//     const [DefaultSpeak, SetDefaultSpeak] = useLocalStorage<ResponseAi[]>("DefaultSpeak", []);
//     const checkbox = useRef<HTMLInputElement>(null)
//     const [prevAnimation, setPrevAnimation] = useState<setAnimation>({ animation: "Idle", playOn: "" })
//     const prevAnimationRef = useRef(prevAnimation);

//     // Interaction2d
//     const [Intercation2d, SetInteraction2d] = useLocalStorage<Interaction2d[]>("interaction2d", []);
//     const [gifInteraction, SetGifInteraction] = useState("")
//     const [onchat, setOnchat] = useState("")
//     const [isSpeak, SetIsSpeak] = useState(false)
//     const [expresion, setExpresion] = useLocalStorage("expression", "quiet")


//     // Response
//     const [BubbleChat, setBubbleChat] = useLocalStorage<BubbleSettings>("BubbleSettings", { TypeBorder: "Border3", CommentPosition: "text-center", ResponsePosition: "text-justify", usernamePosition: "text-left", TextSpeed: "5" });
//     const [Airesponse, SetAiResponse] = useState<ResponseAi[]>([]);
//     const [showBubble, setShowBubble] = useState(false);

//     // Music
//     const [QuequeMusic, setQuequeMusic] = useState<MusicType[]>([]);
//     const [MusicTitle, setMusicTitle] = useState<ReqMusic[]>([]);
//     const [GiftReqMusic, setGiftReqMusic] = useLocalStorage<string>("GiftReqMusic", "");
//     const checkboxMusic = useRef<HTMLInputElement>(null)
//     const [isPlay, setIsPlay] = useState(false);
//     const [skip, setSkip] = useState("");

//     // Character

//     // 3d
//     const [Resource, setResource] = useIndexedDB<ResorceType[]>("Resource", []);
//     const [Character, setCharacter] = useLocalStorage("Character", "/PilKun.glb");
//     const [voiceSettings, setVoiceSettings] = useLocalStorage<VoiceSettings>("VoiceSettings", { voice: "", rate: "1", pitch: "1", volume: "1" });

//     // 2d
//     const [hairStyle, setHairStyle] = useLocalStorage("hairStyle2d", {
//         position: "",
//         hairImg: "/",
//         scale: ""
//     });
//     const [color, setColor] = useLocalStorage("color2d", "");
//     const [ColorInteraction, setColorInteraction] = useLocalStorage("randomColorInteraction", "");
//     const [ExpressionInteraction, setExpressionInteraction] = useLocalStorage<commandInteraction[]>("commandExpressionInteraction", []);



//     useEffect(() => {


//         function handleChat(data: any) {
//             if (data.comment?.includes("!play")) {
//                 const Title = data.comment.replace("!play", " ")
//                 setMusicTitle((prev: any) =>
//                     prev.map((item: ReqMusic, i: number) =>
//                         item.uniqueId === data.uniqueId && item.Title === ''
//                             ? { ...item, Title: `Processing ${Title}` }
//                             : item
//                     )
//                 );
//             }
//             setOnchat(data.comment);
//         }



//         function handleChatResponse(res: ResponseAi) {
//             if (res.comment !== "") {
//                 frammerDetection.addComment()
//             }
//             if (Airesponse.length <= 1 && hold === false && res !== null) {
//                 SetChatEnd(false)
//                 SetHold(true)
//                 SetAiResponse((prevResponses) => [...prevResponses, res]);
//             }
//         }




//         function handleConsole(data: string) {
//             SetarrConsole(data);
//         }


//         function handleShare(data: any) {
//             setShare(data)

//         }
//         function handleFollow(data: any) {
//             setFollow(data)
//         }

//         function handleGift(data: any) {
//             setGift(data)
//             if (data.giftName === GiftReqMusic) {
//                 setMusicTitle((prev) => [...prev, { uniqueId: data.uniqueId, Title: "", img: data.profilePictureUrl }]);
//             }

//         }

//         function handleJoin() {
//             setJoin("");
//         }

//         if (socket.connected) {
//             onConnect();
//         }

//         function onConnect() {
//             setIsConnected(true);
//             socket.io.engine.on("upgrade", (transport: any) => {
//             });
//         }

//         function onDisconnect() {
//             setIsConnected(false);
//         }

//         function handleTiktokConnect(data: any) {
//             setTiktokConnection(data);
//         }


//         socket.on("chat response", handleChatResponse);
//         socket.on("chat", handleChat);
//         socket.on("console", handleConsole);


//         socket.on("gift", handleGift);
//         socket.on("share", handleShare);
//         socket.on("follow", handleFollow);
//         socket.on("join", handleJoin);

//         socket.on("connection", onConnect);
//         socket.on("disconnect", onDisconnect);
//         socket.on("tiktokConnection", handleTiktokConnect);


//         return () => {
//             socket.off("chat response", handleChatResponse);
//             socket.off("chat", handleChat);
//             socket.off("console", handleConsole);

//             socket.off("gift", handleGift);
//             socket.off("share", handleShare);
//             socket.off("follow", handleFollow);
//             socket.off("join", handleJoin);

//             socket.off("connect", onConnect);
//             socket.off("tiktokConnection", handleTiktokConnect);
//             socket.off("disconnect", onDisconnect);

//         };
//     }, [Intercation, Airesponse, hold]);

//     // Tiktok Provider

//     useEffect(() => {
//         if (UserConncetion.username !== "") {
//             socket.emit("username", UserConncetion)
//             SetUserConnection({ username: "", prompt: UserConncetion.prompt, model: UserConncetion.model, apikey: UserConncetion.apikey })
//         }
//     }, [UserConncetion.username])

//     useEffect(() => {
//         if (UserNameDisconnected === "") return
//         socket.emit("manualy-disconnect", UserNameDisconnected)
//         SetUserNameDisconnected("")
//     }, [UserNameDisconnected])

//     useEffect(() => {
//         socket.emit("callback", ChatEnd)
//     }, [ChatEnd])

//     useEffect(() => {
//         if (!checkbox.current?.checked || TiktokConnection !== "Connected" || expresion === "sleeping") return;

//         const handleStateChange = (newState: string) => {
//             if (newState === "active") return
//             const random = Math.floor(Math.random() * DefaultSpeak.length);
//             SetChatEnd(false)
//             SetHold(true)
//             SetAiResponse((prev: any) => [...prev, DefaultSpeak[random]])
//         }

//         frammerDetection.on("stateChange", handleStateChange);

//         return () => {
//             frammerDetection.off("stateChange", handleStateChange);
//         };

//     }, [DefaultSpeak, checkbox.current?.checked, TiktokConnection, expresion]);



//     return (
//         <TiktokConnectionContext.Provider value={{ SetUserConnection, SetChatEnd, SetUserNameDisconnected, setTiktokConnection, TiktokConnection, UserConncetion, isConnected, setVersion, version, inputUser, setInputUser }}>
//             <InteractionContext.Provider value={{ Gift, setShare, setFollow, Animation, Share, Join, Toast, SetToast, Follow, Intercation, SetInteraction, SetAnimation, setGift, hold, SetHold, isGiftAnimation, setIsGiftAnimation, DefaultSpeak, SetDefaultSpeak, checkbox, prevAnimation, prevAnimationRef, setPrevAnimation }}>
//                 <InteractionContext2d.Provider value={{ version, Intercation2d, SetInteraction2d, gifInteraction, SetGifInteraction, isSpeak, SetIsSpeak, onchat, expresion, setExpresion }}>
//                     <CharacterContext.Provider value={{ Character, setCharacter, voiceSettings, setVoiceSettings, Resource, setResource, hairStyle, setHairStyle, color, setColor, ExpressionInteraction, ColorInteraction, setExpressionInteraction, setColorInteraction }}>
//                         <ResponseContext.Provider value={{ Airesponse, arrConsole, BubbleChat, SetAiResponse, setBubbleChat, setShowBubble, showBubble }}>
//                             <MusicContext.Provider value={{ setSkip, skip, setIsPlay, isPlay, QuequeMusic, setQuequeMusic, MusicTitle, setMusicTitle, checkboxMusic, GiftReqMusic, setGiftReqMusic }}>
//                                 {children}
//                             </MusicContext.Provider>
//                         </ResponseContext.Provider>
//                     </CharacterContext.Provider>
//                 </InteractionContext2d.Provider>
//             </InteractionContext.Provider>
//         </TiktokConnectionContext.Provider>
//     );
// };


