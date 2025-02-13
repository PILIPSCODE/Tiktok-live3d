import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { useInteraction2d } from '@/hooks/useInteraction2d';
import { useTiktokConnection } from '@/hooks/UseTiktokConnection';
import { useInteraction } from '@/hooks/useInteraction';

const Timer = () => {
    const { expresion, setExpresion } = useInteraction2d();
    const { Share, Gift } = useInteraction();
    const { SetChatEnd } = useTiktokConnection();

    const [remainingTime, setRemainingTime] = useState(2400);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);



    useEffect(() => {
        const startCountDown = () => {
            if (intervalRef.current) clearInterval(intervalRef.current);

            intervalRef.current = setInterval(() => {
                setRemainingTime((prev) => {
                    if (prev <= 1000) {
                        clearInterval(intervalRef.current!);
                        setExpresion("sleeping");
                        SetChatEnd(false)
                        return 0;
                    }
                    return prev - 1000;
                });
            }, 1000);
        };

        startCountDown();

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
                        Share/Gift Untuk Membangunkan
                    </span>
                }
                <span className="text-black p-3 bg-white rounded-md">Follow Ganti Warna</span>
            </div>
        </div>
    );
};

export default Timer;
