"use client";
import { useEffect } from "react";
import { useResponse } from "@/hooks/useResponse";
import { socket } from "@/utils/socket";
import { useInteraction } from "@/hooks/useInteraction";
import { useTiktokConnection } from "@/hooks/UseTiktokConnection";




export const TiktokOrchestrator = () => {
    const { Airesponse } = useResponse();
    const { hold, Intercation } = useInteraction();
    const { setIsConnected, setTiktokConnection, UserConncetion, SetUserConnection, UserNameDisconnected, SetUserNameDisconnected, ChatEnd } = useTiktokConnection();

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

        function handleTiktokConnect(data: any) {
            setTiktokConnection(data);
        }


        socket.on("connection", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("tiktokConnection", handleTiktokConnect);


        return () => {
            socket.off("tiktokConnection", handleTiktokConnect);
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);

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





    return null;
};
