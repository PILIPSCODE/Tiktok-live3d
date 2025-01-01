"use client"
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ReactTyped } from 'react-typed'
import { ResponseAi, VoiceSettings } from '../../interface';
import { useTiktokConnection } from '@/hooks/UseTiktokConnection';
import { useInteraction } from '@/hooks/useInteraction';
import { useResponse } from '@/hooks/useResponse';
import { useCharacter } from '@/hooks/useCharacter';


const data = {
    comment: "",
    prev: false,
    response: "",
    animation: "",
    user: "",
}
const emojiRegex = /[\uD800-\uDBFF][\uDC00-\uDFFF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F\uDE80-\uDEFF]|[\u2600-\u27BF]/g;
export default function BubleChat() {
    const { SetChatEnd, TiktokConnection } = useTiktokConnection();
    const { SetAnimation, Animation, hold, SetHold, Intercation, isGiftAnimation, checkbox, DefaultSpeak } = useInteraction();
    const { Airesponse, showBubble, BubbleChat } = useResponse();
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const { voiceSettings } = useCharacter()
    const [voiceSettingsLocal, setvoiceSettingsLocal] = useState<VoiceSettings>({ voice: "", rate: "1", pitch: "1", volume: "1" })

    const [message, setMessage] = useState<ResponseAi>(data);

    const synth = useRef<SpeechSynthesis | null>(null);
    const isSpeaking = useRef<boolean>(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);


    const handleMessage = () => {
        const msg = Airesponse.shift()
        if (msg) {
            if (msg.comment !== "") {
                setMessage(msg);
            }
            speak(msg.response, msg.animation, msg.comment);
            if (Animation !== "Idle") return
            SetAnimation(msg.animation)
        }

    }



    const speak = (text: string, animation: string, comment: string) => {
        if (!synth.current) return

        isSpeaking.current = true;
        const utterance = new SpeechSynthesisUtterance(text.slice(0, 300).replace(emojiRegex, ''));
        utterance.rate = Number(voiceSettingsLocal.rate);
        utterance.volume = Number(voiceSettingsLocal.volume);
        utterance.pitch = Number(voiceSettingsLocal.pitch);
        const TTS = voices.find(voice => voice.voiceURI === voiceSettingsLocal.voice);

        utterance.voice = TTS || null;

        utterance.onend = () => {
            isSpeaking.current = false;
            setMessage(data)
            if (comment !== "") {
                handleMessage();
            }

            if (Intercation.length === 0 && isGiftAnimation === false) {
                SetAnimation("Idle");
            }
            Intercation.map((e: any) => {
                if (animation !== e.animation && isGiftAnimation === false) {
                    SetAnimation("Idle");
                }
            })


            if (Airesponse.length <= 1) {
                SetChatEnd(true)
                SetHold(false)
            }
        };
        synth.current.speak(utterance);
    };



    useEffect(() => {
        if (!checkbox.current?.checked || Airesponse.length > 1 || TiktokConnection !== "Connected") return;

        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        const interval = setInterval(() => {
            const random = Math.round(Math.random() * (DefaultSpeak.length - 1));
            speak(DefaultSpeak[random].response, DefaultSpeak[random].animation, DefaultSpeak[random].comment,);
            SetAnimation(DefaultSpeak[random].animation)

        }, 14000);

        intervalRef.current = interval;

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [DefaultSpeak, checkbox.current?.checked, Airesponse, voiceSettingsLocal, TiktokConnection]);

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
        console.log(Airesponse.length)

        handleMessage();

    }, [Airesponse, hold])


    useEffect(() => {
        if (typeof window !== "undefined" && speechSynthesis) {
            const loadVoices = () => setVoices(speechSynthesis.getVoices());
            loadVoices();

            speechSynthesis.onvoiceschanged = loadVoices;
        }
    }, [voiceSettingsLocal.voice, voiceSettingsLocal.rate, voiceSettingsLocal.volume, voiceSettingsLocal.pitch])

    if (message.comment !== "" || showBubble)
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