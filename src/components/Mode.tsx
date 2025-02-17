"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useProgress, Html } from "@react-three/drei";
import dynamic from "next/dynamic";
import Char1 from "@/components/model/char1";
import Ground from "@/components/model/ground";
import Kapal from "@/components/model/Ship";
import Timer from "@/components/2dUi/Timer";
import Rules from "@/components/2dUi/Rules";
import Characther2D from "@/components/2dUi/characther";
import { useTiktokConnection } from "@/hooks/UseTiktokConnection";

const BubleChat = dynamic(() => import("@/components/BubleChat"), { ssr: false });

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
                <Timer />
                <Rules />
            </>
        )}
        <Timer />
        <Rules />
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
            <OrbitControls />
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
            <BubleChat />
        </>
    )
};

export default Mode;
