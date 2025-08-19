"use client";
import { useEffect } from "react";
import { useInteraction2d } from "@/hooks/useInteraction2d";
import { useResponse } from "@/hooks/useResponse";
import { socket } from "@/utils/socket";
import { useInteraction } from "@/hooks/useInteraction";
import { ReqMusic } from "../../interface";
import { useMusic } from "@/hooks/useMusic";





export const MusicOrchestrator = () => {
    const { setOnchat } = useInteraction2d();
    const { setMusicTitle } = useMusic();
    const { Airesponse } = useResponse();
    const { hold, Intercation } = useInteraction();


    useEffect(() => {


        function handleChat(data: any) {
            if (data.comment?.includes("!play")) {
                const Title = data.comment.replace("!play", " ")
                setMusicTitle((prev: any) =>
                    prev.map((item: ReqMusic, i: number) =>
                        item.uniqueId === data.uniqueId && item.Title === ''
                            ? { ...item, Title: `Processing ${Title}` }
                            : item
                    )
                );
            }
            setOnchat(data.comment);
        }


        socket.on("chat", handleChat);
        return () => {
            socket.off("chat", handleChat);
        };
    }, [Intercation, Airesponse, hold]);





    return null;
};
