import React from 'react'
import Image from 'next/image'

const BarGift = () => {
    return (

        <div className="z-40 h-screen absolute -translate-y-16 right-2 text-sm text-white justify-center flex flex-col items-end">
            <div className="flex items-center justify-between gap-2">
                <h1>Lompat 1</h1>
                <Image height={40} width={40} src="https://storage.streamdps.com/iblock/f59/f5902abbd13178017285a308606fd0dd/cf6a40558018965a8171cf5a575dd9de.png" alt="" />
            </div>
            <div className="flex items-center justify-between gap-2">
                <h1>Lompat 2</h1>
                <Image height={40} width={40} src="https://storage.streamdps.com/iblock/50f/50f8e7cf26128a6e10d0b792019c1303/94aa2d574cfe6e3893c087cfb5a5efcd.png" alt="" />
            </div>
            <div className="flex items-center justify-between gap-2">
                <h1>Gaje</h1>
                <Image height={40} width={40} src="https://storage.streamdps.com/iblock/f34/f34b75494926337d0bede7003aee0af9/1cb25dfee5bac6dc49b19222ed6967f7.webp" alt="" />
            </div>
            <div className="flex items-center justify-between gap-2">
                <h1>Joget Ubur2</h1>
                <Image height={40} width={40} src="https://storage.streamdps.com/iblock/688/688f0c350f9cd9751cb02659f4ab105e/2b2d66c2f9767fc8332ee1b5ba0c1057.png" alt="" />
            </div>
            <div className="flex items-center justify-between gap-2">
                <h1>Berjoget</h1>
                <Image height={40} width={40} src="https://storage.streamdps.com/iblock/ae6/ae65a581d82f828e9e3834cd8444986a/9a1acf1d35f2cbef7a4c3929f9587567.png" alt="" />
            </div>
            <div className="flex items-center justify-between gap-2">
                <h1>Berjoget Sayonara</h1>
                <Image height={40} width={40} src="https://storage.streamdps.com/iblock/ceb/cebb5d5f7004d6ccf9336ae20281be88/5061b1767c2325fe6704eb08d97c5cb8.png" alt="" />
            </div>
        </div>

    )
}

export default BarGift