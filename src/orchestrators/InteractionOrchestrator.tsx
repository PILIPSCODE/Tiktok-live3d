"use client";
import { useEffect } from "react";
import { useMusic } from "@/hooks/useMusic";
import { socket } from "@/utils/socket";

import { useInteraction } from "@/hooks/useInteraction";


export const InteractionOrchestrator = () => {
    const { setShare, setFollow, setGift, setJoin, Intercation } = useInteraction();

    const { GiftReqMusic, setMusicTitle } = useMusic();


    useEffect(() => {

        function handleShare(data: any) {
            setShare(data)

        }
        function handleFollow(data: any) {
            setFollow(data)
        }

        function handleGift(data: any) {
            setGift(data)
            if (data.giftName === GiftReqMusic) {
                setMusicTitle((prev: any) => [...prev, { uniqueId: data.uniqueId, Title: "", img: data.profilePictureUrl }]);
            }

        }

        function handleJoin() {
            setJoin("");
        }


        socket.on("gift", handleGift);
        socket.on("share", handleShare);
        socket.on("follow", handleFollow);
        socket.on("join", handleJoin);


        return () => {
            socket.off("gift", handleGift);
            socket.off("share", handleShare);
            socket.off("follow", handleFollow);
            socket.off("join", handleJoin);
        };
    }, [Intercation]);



    return null;
};
