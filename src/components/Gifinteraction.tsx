import { useInteraction2d } from '@/hooks/useInteraction2d';
import Image from 'next/image';
import React, { useRef } from 'react'


const Gifinteraction = () => {
    const { gifInteraction } = useInteraction2d()

    return (
        <div className='absolute w-screen h-screen  z-50'>
            {gifInteraction !== "" ?
                <Image alt='oke' unoptimized={true} fill className='object-contain' src={`data:image/gif;base64,${gifInteraction}`} />
                :
                <></>
            }
        </div>
    )
}

export default Gifinteraction