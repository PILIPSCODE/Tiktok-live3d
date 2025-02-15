import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import dummycommand from "../../../dumycommand.json"
import { useInteraction2d } from '@/hooks/useInteraction2d'
import { useInteraction } from '@/hooks/useInteraction'

const Characther2D = () => {
    const { gifInteraction, isSpeak, onchat, expresion, setExpresion } = useInteraction2d()
    const { Follow } = useInteraction()
    const [warna, setWarna] = useState('');
    let randomColor = create3DGradient(warna)

    useEffect(() => {
        dummycommand.map((e) => {
            if (onchat.includes(e.command)) {
                setExpresion(e.expresion)
            }
        })

    }, [onchat])



    useEffect(() => {
        if (Follow) {
            let newColor = getRandomColor();
            setWarna(newColor);
        }
    }, [Follow]);

    if (gifInteraction === "")
        return (
            <div className='w-full h-full flex justify-center  items-center'>
                <div style={{ background: randomColor }} className={`emoji-container ${expresion}  z-10  mb-20 block relative`} id="emoji1">
                    {/* <!-- <img src="pics/pita.webp" alt="pita" class="w-16 -rotate-30 absolute h-16 right-0 top-0 z-20"> --> */}
                    <div className="eyes">
                        <div className="eye eye1 bg-black"></div>
                        <div className="eye eye2 bg-black"></div>
                    </div>
                    <div className={`mouth ${isSpeak ? "talking" : ""}`}>
                        <div className="mouth-shape"></div>
                    </div>
                    <div className="zzz bg-white hidden">Zzz</div>
                </div>
                <div className="hand-container  -translate-y-10 z-0">
                    <div style={{ background: randomColor }} className="hand hand-left "></div>
                    <div className='w-32 h-32 opacity-0'>

                    </div>
                    <div style={{ background: randomColor }} className="hand hand-right"></div>
                </div>
            </div>
        )
}

export default Characther2D


function getRandomColor() {
    const letters = '6789ABCD'; // Use only lighter colors
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
}

function create3DGradient(color: any) {
    return `radial-gradient(circle at 50% 50%, 
            ${color} 0%, 
            ${shadeColor(color, -0.2)} 40%, 
            ${shadeColor(color, -0.4)} 70%, 
            ${shadeColor(color, -0.6)} 85%, 
            ${shadeColor(color, -0.8)} 100%)`;
}

function shadeColor(color: any, percent: any) {
    const num = parseInt(color.slice(1), 16),
        amt = Math.round(2.55 * percent * 100),
        R = (num >> 16) + amt,
        G = (num >> 8 & 0x00FF) + amt,
        B = (num & 0x0000FF) + amt;

    return `#${(0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 1 ? 0 : B) : 255)
    ).toString(16).slice(1).toUpperCase()}`;
}
