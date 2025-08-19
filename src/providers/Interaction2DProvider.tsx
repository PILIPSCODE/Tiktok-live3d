import React, { useState } from "react";
import { InteractionContext2d } from "@/hooks/useInteraction2d";
import useLocalStorage from "@/hooks/LocalStorage";
import { Interaction2d } from "../../interface";

export const Interaction2dProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [Intercation2d, SetInteraction2d] = useLocalStorage<Interaction2d[]>("interaction2d", []);
    const [gifInteraction, SetGifInteraction] = useState("");
    const [onchat, setOnchat] = useState("");
    const [isSpeak, SetIsSpeak] = useState(false);
    const [expresion, setExpresion] = useLocalStorage("expression", "quiet");

    return (
        <InteractionContext2d.Provider
            value={{ version: "2d", Intercation2d, SetInteraction2d, setOnchat, gifInteraction, SetGifInteraction, isSpeak, SetIsSpeak, onchat, expresion, setExpresion }}
        >
            {children}
        </InteractionContext2d.Provider>
    );
};
