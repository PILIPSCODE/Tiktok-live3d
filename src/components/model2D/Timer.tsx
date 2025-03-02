import React, { useEffect, useState, useRef } from 'react';
import { useInteraction2d } from '@/hooks/useInteraction2d';
import { useInteraction } from '@/hooks/useInteraction';
import { useCharacter } from '@/hooks/useCharacter';

const Timer = () => {
    const { expresion, setExpresion } = useInteraction2d();
    const { Share, Gift } = useInteraction();
    const { setVoiceSettings, voiceSettings } = useCharacter();

    const [remainingTime, setRemainingTime] = useState(240000);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const startCountDown = () => {
            if (intervalRef.current) clearInterval(intervalRef.current);

            intervalRef.current = setInterval(() => {
                setRemainingTime((prev) => {
                    if (prev <= 1000) {
                        clearInterval(intervalRef.current!);
                        setExpresion("sleeping");
                        return 0;
                    }
                    return prev - 1000;
                });
            }, 1000);
        };


        startCountDown();

        if (Share || Gift) {
            setRemainingTime(240000)
            setExpresion("quiet");
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [Share, Gift]);

    return (
        <div className="absolute top-16 w-full z-50 text-center">
            <div id="displayTimer" className="gap-3 flex-col flex items-center my-5">
                {expresion !== "sleeping" ?
                    <span className="text-white bg-black rounded-md">
                        Tidur {`0${Math.floor(remainingTime / 60000)}:${String(Math.floor((remainingTime % 60000) / 1000)).padStart(2, '0')}`}
                    </span>
                    :
                    <span>
                        Tidur Dulu Coy !!
                    </span>
                }
            </div>
        </div>
    );
};

export default Timer;
