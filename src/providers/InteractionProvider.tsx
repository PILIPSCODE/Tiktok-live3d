import React, { useState, useRef } from "react";
import { InteractionContext } from "@/hooks/useInteraction";
import useLocalStorage from "@/hooks/LocalStorage";
import { setAnimation, Interaction, ResponseAi } from "../../interface";

export const InteractionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [Toast, SetToast] = useState({ text: "", uniqueId: "" })
    const [Animation, SetAnimation] = useState<setAnimation[]>([]);
    const [Join, setJoin] = useState<string>();
    const [Gift, setGift] = useState<any>();
    const [Share, setShare] = useState<any>();
    const [Follow, setFollow] = useState<any>();
    const [hold, SetHold] = useState(false);
    const [isGiftAnimation, setIsGiftAnimation] = useState(false);
    const [Intercation, SetInteraction] = useLocalStorage<Interaction[]>("interaction", []);
    const [DefaultSpeak, SetDefaultSpeak] = useLocalStorage<ResponseAi[]>("DefaultSpeak", []);
    const [checkbox, setCheckbox] = useState(false)

    const safeRemoveAndSet = (newAnim: setAnimation) => {
        SetAnimation((prev) => {
            const hasInteraction = prev.some(anim => anim.playOn === "Interaction")

            if (hasInteraction && (newAnim.playOn === "ChatResponse" || newAnim.playOn === "IdleSpeak")) {
                return prev
            }

            if (hasInteraction && newAnim.playOn === "IdleInteraction") {
                return [newAnim]
            }

            const rest = prev.slice(1)
            return [...rest, newAnim]
        })
    }



    return (
        <InteractionContext.Provider
            value={{
                Gift,
                setShare,
                setFollow,
                Animation,
                Share,
                Join,
                Toast,
                SetToast,
                safeRemoveAndSet,
                setJoin,
                Follow,
                Intercation,
                SetInteraction,
                SetAnimation,
                setGift,
                hold,
                SetHold,
                isGiftAnimation,
                setIsGiftAnimation,
                DefaultSpeak,
                SetDefaultSpeak,
                checkbox,
                setCheckbox
            }}
        >
            {children}
        </InteractionContext.Provider>
    );
};
