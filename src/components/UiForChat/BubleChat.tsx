"use client"
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ReactTyped } from 'react-typed'
import { useInteraction, useResponse, useTiktokConnection } from "../../app/AppProvider";
import { ResponseAi } from '../../../interface';

export default function BubleChat() {
    const {SetChatEnd} = useTiktokConnection();
    const { SetAnimation, } = useInteraction();
    const { Airesponse, showBubble, BubbleChat} = useResponse();
    const data = {
        comment: "",
        prev: false,
        response: "",
        animation: "",
        user: "",
    }
    const [message, setMessage] = useState<ResponseAi>(data);

    const synth = useRef<SpeechSynthesis | null>(null);
    const isSpeaking = useRef<boolean>(false);

    const handleMessage = () => {
        if (isSpeaking.current) return;
        const msg = Airesponse.shift()
        if (msg) {
            setMessage(msg);
            speak(msg.response);
            SetAnimation(msg.animation)
        }

    }

    const speak = (text: string) => {
        if (isSpeaking.current || !synth.current) return;
        SetChatEnd(false)
        isSpeaking.current = true;

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "id-ID";
        utterance.rate = 1.5;
        utterance.volume = 1;
        utterance.pitch = 1;


        utterance.onend = () => {
            isSpeaking.current = false;
            setMessage(data)
            SetAnimation("Idle")
            setTimeout(() => {
                handleMessage()
            }, 3500)
            SetChatEnd(true)
        };
        synth.current.speak(utterance);
    };


    useEffect(() => {
        if (typeof window !== "undefined") {
            synth.current = window.speechSynthesis;
        }
        handleMessage();
    }, [Airesponse])

    if (message.response !== "" || showBubble)
        return (
            <div className='absolute  w-96 mx-auto rounded-lg   bg-black/60'>
                <div className='w-full h-10 -translate-y-5 top-0 relative'>
                    <Image fill src={`/border/${BubbleChat.TypeBorder}.png`} alt='Border' />
                </div>
                <div className={`p-4 w-full break-before-auto  ${BubbleChat.ResponsePosition}`}>
                    <h1 className={`text-white text-lg ${BubbleChat.CommentPosition} mb-4`}>{message.comment || "hello world"}</h1>
                    <h1 className={`text-orange-200 ${BubbleChat.usernamePosition}  mb-2`}>{message.user || "pilcotech"}</h1>
                    <ReactTyped
                        strings={["response: "+ (message.response || "lorem ipsum dolor siamet constrectur, dolor siamet constrectur dolor, siamet constrectur dolor siamet constrectur, dolor siamet constrectur")]}
                        typeSpeed={10}
                    >
                    </ReactTyped>
                </div>
                <div className='w-full h-10 rotate-180 translate-y-5 bottom-0 relative'>
                    <Image fill src={`/border/${BubbleChat.TypeBorder}.png`}  alt='Border' />
                </div>
            </div>
        )
    else {
        return <></>
    }
}