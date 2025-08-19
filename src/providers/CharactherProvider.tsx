import React from "react";
import { CharacterContext } from "@/hooks/useCharacter";
import { VoiceSettings, ResorceType, commandInteraction } from "../../interface";
import useLocalStorage from "@/hooks/LocalStorage";
import useIndexedDB from "@/hooks/useIndexDB";

export const CharacterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // 3D
    const [Resource, setResource] = useIndexedDB<ResorceType[]>("Resource", []);
    const [Character, setCharacter] = useLocalStorage("Character", "/PilKun.glb");
    const [voiceSettings, setVoiceSettings] = useLocalStorage<VoiceSettings>("VoiceSettings", {
        voice: "",
        rate: "1",
        pitch: "1",
        volume: "1",
    });

    // 2D
    const [hairStyle, setHairStyle] = useLocalStorage("hairStyle2d", {
        position: "",
        hairImg: "/",
        scale: "",
    });
    const [color, setColor] = useLocalStorage("color2d", "");
    const [ColorInteraction, setColorInteraction] = useLocalStorage("randomColorInteraction", "");
    const [ExpressionInteraction, setExpressionInteraction] = useLocalStorage<commandInteraction[]>(
        "commandExpressionInteraction",
        []
    );

    return (
        <CharacterContext.Provider
            value={{
                Character,
                setCharacter,
                voiceSettings,
                setVoiceSettings,
                Resource,
                setResource,
                hairStyle,
                setHairStyle,
                color,
                setColor,
                ExpressionInteraction,
                ColorInteraction,
                setExpressionInteraction,
                setColorInteraction,
            }}
        >
            {children}
        </CharacterContext.Provider>
    );
};
