"use client";
import { useEffect } from "react";
import { socket } from "@/utils/socket";
import { useInteraction } from "@/hooks/useInteraction";
import { useInteraction2d } from "@/hooks/useInteraction2d";
import { ResponseAi } from "../../interface";
import { FrameCommentDetector } from "@/utils/framerDetect";
import { useTiktokConnection } from "@/hooks/UseTiktokConnection";
import { useResponse } from "@/hooks/useResponse";



const frammerDetection = new FrameCommentDetector(0, 1, 10000, 10000)
frammerDetection.monitor()


export const ResponseOrchestrator = () => {
    const { SetChatEnd, TiktokConnection } = useTiktokConnection();
    const { SetHold, hold, Intercation, checkbox, DefaultSpeak } = useInteraction();
    const { Airesponse, SetAiResponse, SetarrConsole } = useResponse();
    const { expresion } = useInteraction2d();


    useEffect(() => {
        function handleChatResponse(res: ResponseAi) {
            if (res.comment !== "") {
                frammerDetection.addComment()
            }
            if (Airesponse.length <= 1 && hold === false && res !== null) {
                SetChatEnd(false)
                SetHold(true)
                SetAiResponse((prevResponses: any) => [...prevResponses, res]);
            }
        }


        function handleConsole(data: string) {
            SetarrConsole(data);
        }

        socket.on("chat response", handleChatResponse);
        socket.on("console", handleConsole);

        return () => {
            socket.off("chat response", handleChatResponse);
            socket.off("console", handleConsole);

        };
    }, [Intercation, Airesponse, hold]);


    useEffect(() => {
        if (!checkbox.current?.checked || TiktokConnection !== "Connected" || expresion === "sleeping") return;

        const handleStateChange = (newState: string) => {
            if (newState === "active") return
            const random = Math.floor(Math.random() * DefaultSpeak.length);
            SetChatEnd(false)
            SetHold(true)
            SetAiResponse((prev: any) => [...prev, DefaultSpeak[random]])
        }

        frammerDetection.on("stateChange", handleStateChange);

        return () => {
            frammerDetection.off("stateChange", handleStateChange);
        };

    }, [DefaultSpeak, checkbox.current?.checked, TiktokConnection, expresion]);


    return null;
};
