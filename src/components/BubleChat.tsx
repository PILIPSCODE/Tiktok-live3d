"use client"
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ReactTyped } from 'react-typed'
import { ResponseAi, VoiceSettings } from '../../interface';
import { useTiktokConnection } from '@/hooks/UseTiktokConnection';
import { useInteraction } from '@/hooks/useInteraction';
import { useResponse } from '@/hooks/useResponse';
import { useCharacter } from '@/hooks/useCharacter';

export default function BubleChat() {
    const { SetChatEnd } = useTiktokConnection();
    const { SetAnimation, Animation, hold, SetHold } = useInteraction();
    const { Airesponse, showBubble, BubbleChat } = useResponse();
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const { voiceSettings } = useCharacter()
    const [voiceSettingsLocal, setvoiceSettingsLocal] = useState<VoiceSettings>({ voice: "", rate: "1", pitch: "1", volume: "1" })

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
        const msg = Airesponse.shift()
        if (msg) {
            setMessage(msg);
            speak(msg.response);
            if (Animation !== "Idle") return
            SetAnimation(msg.animation)
        }

    }

    const speak = (text: string) => {
        if (!synth.current) return

        isSpeaking.current = true;
        const utterance = new SpeechSynthesisUtterance(text.slice(0, 300));
        utterance.rate = Number(voiceSettingsLocal.rate);
        utterance.volume = Number(voiceSettingsLocal.volume);
        utterance.pitch = Number(voiceSettingsLocal.pitch);
        const TTS = voices.find(voice => voice.voiceURI === voiceSettingsLocal.voice);

        utterance.voice = TTS || null;

        utterance.onend = () => {
            isSpeaking.current = false;
            setMessage(data)

            handleMessage();

            if (Airesponse.length < 2) {
                SetChatEnd(true)
                SetHold(false)
            }
        };
        synth.current.speak(utterance);
    };

    useEffect(() => {
        setvoiceSettingsLocal(voiceSettings)

    }, [voiceSettings])


    useEffect(() => {

        if (typeof window !== "undefined") {
            synth.current = window.speechSynthesis;
        }
        if (isSpeaking.current || hold === false) {
            return
        }
        handleMessage();
        console.log("speech")

    }, [Airesponse, hold])

    useEffect(() => {
        if (typeof window !== "undefined" && speechSynthesis) {
            const loadVoices = () => setVoices(speechSynthesis.getVoices());
            loadVoices();

            speechSynthesis.onvoiceschanged = loadVoices;
        }
    }, [voiceSettingsLocal.voice, voiceSettingsLocal.rate, voiceSettingsLocal.volume, voiceSettingsLocal.pitch])

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
                        strings={[(message.response || "lorem ipsum dolor siamet constrectur, dolor siamet constrectur dolor, siamet constrectur dolor siamet constrectur, dolor siamet constrectur")]}
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