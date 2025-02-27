"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useProgress, Html } from "@react-three/drei";
import Char1 from "@/components/model3D/char1";
import Ground from "@/components/model3D/ground";
import Kapal from "@/components/model3D/Ship";
import Timer from "@/components/model2D/Timer";
import Rules from "@/components/model2D/Rules";
import Characther2D from "@/components/model2D/characther";
import { useTiktokConnection } from "@/hooks/UseTiktokConnection";

type Props = {
    widget: boolean;
};

const Loader: React.FC = () => {
    const { progress } = useProgress();
    return <Html center>{progress.toFixed(1)} % loaded</Html>;
};

const Mode2D: React.FC<{ widget: boolean }> = ({ widget }) => (
    <div className="flex h-screen justify-center">
        {!widget && (
            <>
                {/* <Timer /> */}
                <Rules />
            </>
        )}
        <Characther2D />
    </div>
);

const Mode3D: React.FC<{ widget: boolean }> = ({ widget }) => (
    <Canvas gl={{ antialias: true }} camera={{ position: [0, 1.5, 5], fov: 65 }} dpr={[1, 4]} className="relative h-svh">
        <directionalLight position={[0, 80, 180]} intensity={7} />
        <Suspense fallback={<Loader />}>
            {!widget && (
                <>
                    <Kapal />
                    <Ground />
                </>
            )}
            <Char1 />
        </Suspense>
    </Canvas>
);

const Mode: React.FC<Props> = ({ widget }) => {
    const { version } = useTiktokConnection();
    return (
        <>
            {
                version === "2d" ?
                    <Mode2D widget={widget} /> :
                    <Mode3D widget={widget} />
            }
        </>
    )
};

export default Mode;
