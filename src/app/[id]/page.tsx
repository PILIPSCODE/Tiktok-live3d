// "use client"
// import BubleChat from '@/components/BubleChat'
// import Mode from '@/components/Mode'
// import { useCharacter } from '@/hooks/useCharacter'
// const Navbar = dynamic(() => import("@/components/SideBar"), { ssr: false })
// import { socket } from '@/utils/socket'
// import dynamic from 'next/dynamic'
// import { useParams } from 'next/navigation'
// import React, { useEffect, useState } from 'react'

// const page = () => {
//     const params = useParams()
//     const [open, setOpen] = useState(false)
//     const { setVoiceSettings } = useCharacter()


//     useEffect(() => {
//         socket.emit("EmbedJoin", params.username)
//         setVoiceSettings({ voice: "", rate: "1.6", pitch: "1", volume: "0" })
//     }, [])

//     return (
//         <div className="flex justify-center font-Archivo">
//             <Mode widget={true} />
//             <BubleChat />
//             <div className='hidden'>
//                 {/* <Navbar open={open} setOpen={setOpen} /> */}
//             </div>
//         </div>
//     )
// }

// export default page




import Image from 'next/image'
import React from 'react'

const page = () => {
    return (
        <div className='h-screen w-screen text-4xl flex justify-center items-center font-Archivo'>Comming Soon
            <Image alt="" src={"/hairstylemen/test.svg"} className='text-green-200' width={100} height={100} />
        </div>
    )
}

export default page