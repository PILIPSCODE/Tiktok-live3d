import React from 'react'
import Image from "next/image"
import { FaSignOutAlt } from 'react-icons/fa'
const Profile = () => {
    return (
        <div className='p-5'>
            <div className='flex gap-2 items-center'>
                <div className='w-14 h-14 relative '>
                    <Image src="/imgChar/PilBot.png" className='rounded-full' alt="Profile" fill />
                </div>
                <div className='text-sm flex-grow'>
                    <h3>Name</h3>
                    <h3>Gmail</h3>
                </div>
                <button
                    className="bg-red-500 text-white flex justify-center items-center gap-2 p-2 rounded-md mt-1"
                >
                    <p className='md:hidden max-md:text-sm'>SignOut</p>
                    <FaSignOutAlt />
                </button>
            </div>
        </div>
    )
}

export default Profile