import React from 'react'
import Timer from '../2dUi/Timer'
import Rules from '../2dUi/Rules'
import Characther2D from '../2dUi/characther'

const Scene = () => {
    return (
        <div className='flex h-screen justify-center'>
            <Timer />
            <Characther2D />
            <Rules />
        </div>
    )
}

export default Scene