import React, { Dispatch, SetStateAction, useEffect } from 'react'
import dynamic from "next/dynamic"
import { useTiktokConnection } from '@/hooks/UseTiktokConnection'
const Scene = dynamic(() => import("@/components/Mode"), { ssr: false })

type props = {
    showScene: boolean,
    setShowScene: Dispatch<SetStateAction<boolean>>
}
const VersionChanger = (props: props) => {
    const { version } = useTiktokConnection()

    useEffect(() => {
        if (version === "2d") {
            props.setShowScene(false)
            const timer = setTimeout(() => {
                props.setShowScene(true);
            }, 1000);
            return () => clearTimeout(timer);
        } else {
            props.setShowScene(false)
            const timer = setTimeout(() => {
                props.setShowScene(true);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [version]);
    return props.showScene ? version === "2d" ? <Scene widget={false} /> : <Scene widget={false} /> : "Loading..."
}

export default VersionChanger