import React from 'react'
import Marquee from 'react-fast-marquee'

const Rules = () => {
    return (
        <div className="flex flex-col w-full absolute bottom-7  z-50 p-3 text-md rounded-md">
            <Marquee className='overflow-hidden mb-3'>
                Perintah Comment untuk Ai.
                <span className="bg-red-500 mx-2 p-1">1. <strong>pilkun_jelek</strong>: Ekspresi Menjadi Jutek</span>
                <span className="bg-blue-500 mx-2 p-1">2. emote_nangis: Ekspresi menjadi Sedih</span>
                <span className="bg-yellow-500 text-black mx-2 p-1">3. emote_ngakak: Ekspresi menjadi ngakak</span>
                <span className="bg-red-500 mx-2 p-1">4. emote_love: Ekspresi menjadi love</span>
                <span className="bg-yellow-500 mx-2 p-1 text-black">5. <strong>pilkun_ganteng</strong>: Ekspresi menjadi Senyum</span>
            </Marquee>

            <div className=" p-3 border-2 text-center">
                Halo halo Apa Kabar Semuanya!!
            </div>
            <div className=" p-3 border-2">
                <h1>Cara Bertanya!!</h1>
                <ul>
                    <li>1. Jangan Lupa Pake Tanda tanya ?</li>
                    <li>2. Jangan Spam, Ga bakal kebaca</li>
                </ul>
            </div>
        </div>
    )
}

export default Rules