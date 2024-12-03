"use client"
import { useProgress, Html } from "@react-three/drei"
import { lazy, Suspense } from "react"
import { Canvas } from "@react-three/offscreen"

function Loader() {
    const { progress} = useProgress()

    return <div className="flex gap-3"><span>{progress.toFixed(1)} %</span><span> loaded</span></div>
}

const Scene = lazy(() => import("./Scene"));

const worker = new Worker(new URL("./worker.tsx", import.meta.url), {
    type: "module",
});

export default function AvatarRenderer() {
    return (
        // <Suspense fallback={<Loader />}>
  
            <Canvas
                worker={worker}
                fallback={<Scene/>}
                gl={{ antialias: true }}
                camera={{ position: [0, -1, 0], fov: 65 }}
                dpr={[1, 4]}
                className="relative h-svh"
                />
        // </Suspense>
    )
}

