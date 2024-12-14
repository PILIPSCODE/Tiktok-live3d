"use client"
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ReactTyped } from 'react-typed'
import { useCharacter, useInteraction, useResponse, useTiktokConnection } from "../../app/AppProvider";
import { ResponseAi } from '../../../interface';
import Voice from '../SideBarItems/Voice';

export default function BubleChat() {
    const { SetChatEnd } = useTiktokConnection();
    const { SetAnimation, } = useInteraction();
    const { Airesponse, showBubble, BubbleChat } = useResponse();
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const { voiceSettings } = useCharacter()

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

        console.log(voiceSettings)
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = Number(voiceSettings.rate);
        utterance.volume = Number(voiceSettings.volume);
        utterance.pitch = Number(voiceSettings.pitch);
        const TTS = voices.find(voice => voice.voiceURI === voiceSettings.voice);

        utterance.voice = TTS || null;


        utterance.onend = () => {
            isSpeaking.current = false;
            setMessage(data)
            SetAnimation("Idle")
            handleMessage()
            SetChatEnd(true)
        };
        synth.current.speak(utterance);
    };

 

    useEffect(() => {
        
        if (typeof window !== "undefined") {
            synth.current = window.speechSynthesis;
        }
        if (!isSpeaking.current){
            handleMessage();
        }
    }, [Airesponse])

    useEffect(() => {
        if (typeof window !== "undefined" && speechSynthesis) {
            const loadVoices = () => setVoices(speechSynthesis.getVoices());
            loadVoices();

            speechSynthesis.onvoiceschanged = loadVoices;
        }
    },[voiceSettings.voice, voiceSettings.rate, voiceSettings.volume, voiceSettings.pitch])

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
                        strings={["response: " + (message.response || "lorem ipsum dolor siamet constrectur, dolor siamet constrectur dolor, siamet constrectur dolor siamet constrectur, dolor siamet constrectur")]}
                        typeSpeed={10}
                    >
                    </ReactTyped>
                </div>
                <div className='w-full h-10 rotate-180 translate-y-5 bottom-0 relative'>
                    <Image fill src={`/border/${BubbleChat.TypeBorder}.png`} alt='Border' />
                </div>
            </div>
        )
    else {
        return <></>
    }
}