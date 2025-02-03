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
    const { SetChatEnd } = useTiktokConnection();
    const { SetAnimation, Animation, hold, SetHold, prevAnimationRef } = useInteraction();
    const { Airesponse, showBubble, BubbleChat } = useResponse();
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const { voiceSettings } = useCharacter()
    const [voiceSettingsLocal, setvoiceSettingsLocal] = useState<VoiceSettings>({ voice: "", rate: "1", pitch: "1", volume: "1" })

    const [message, setMessage] = useState<ResponseAi>(data);

    const synth = useRef<SpeechSynthesis | null>(null);
    const isSpeaking = useRef<boolean>(false);


    const handleMessage = () => {
        const msg = Airesponse.shift()
        if (msg) {
            const splitedResponse: any[] = []
            const words = msg.response.split(" ");
            for (let i = 0; i < words.length; i += 28) {
                let part = words.slice(i, i + 28).join(" ");
                if (i + 28 < words.length) {
                    part += ",";
                }

                splitedResponse.push(part);
            }
            const callback = () => {
                const split = splitedResponse.shift()
                speak(split, splitedResponse.length, callback, msg);

            }

            callback();

            if (Animation.animation !== "Idle") return
            SetAnimation({ animation: msg.animation, playOn: "ChatResponse" })
        }

    }



    const speak = (text: string, length: number, callback: () => void, msg: ResponseAi) => {
        if (!synth.current) return
        SetChatEnd(false)
        isSpeaking.current = true;
        const utterance = new SpeechSynthesisUtterance(text.replace(emojiRegex, ''));
        utterance.rate = Number(voiceSettingsLocal.rate);
        utterance.volume = Number(voiceSettingsLocal.volume);
        utterance.pitch = Number(voiceSettingsLocal.pitch);
        setTimeout(() => {
            setMessage({ ...msg, response: text });
        }, 1000)

        const TTS = voices.find(voice => voice.voiceURI === voiceSettingsLocal.voice);

        utterance.voice = TTS || null;

        utterance.onend = () => {

            if (length <= 1) {
                isSpeaking.current = false;
                if (prevAnimationRef.current.animation === "Interaction" && prevAnimationRef.current.playOn !== "Idle") {
                    SetAnimation({ animation: "Idle", playOn: "ChatResponse" })
                }
                setMessage(data)
                SetChatEnd(true)
                SetHold(false)
            } else {
                callback()
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
            <div className='absolute  max-w-96 max-md:mx-2 mx-auto rounded-lg top-1/4   bg-black/60'>
                <div className='w-96'>
                    <div className='w-full h-10 -translate-y-5 top-0 relative'>
                        <Image fill src={`/border/${BubbleChat.TypeBorder}.png`} alt='Border' />
                    </div>
                    <div className={`p-4 w-full break-before-auto max-sm:text-base ${BubbleChat.ResponsePosition}`}>
                        <h1 className={`text-white text-lg ${BubbleChat.CommentPosition} mb-4`}>{message.comment || "hello world"}</h1>
                        <h1 className={`text-orange-200 ${BubbleChat.usernamePosition}  mb-2`}>{message.user || "pilcotech"}</h1>
                        <ReactTyped
                            typeSpeed={Number(50 - BubbleChat.TextSpeed * 10)}
                            strings={[(message.response || "lorem ipsum dolor siamet constrectur, dolor siamet constrectur dolor, siamet constrectur dolor siamet constrectur, dolor siamet constrectur")]}
                            className='max-sm:text-sm'
                        >
                        </ReactTyped>
                    </div>
                    <div className='w-full h-10 rotate-180 translate-y-5 bottom-0 relative'>
                        <Image fill src={`/border/${BubbleChat.TypeBorder}.png`} alt='Border' />
                    </div>
                </div>
            </div>
        )
    else {
        return <></>
    }
}