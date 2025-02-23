"use client";
import { useCharacter } from "@/hooks/useCharacter";
import React, { useCallback, useRef, useEffect } from "react";

const ColorWheel = () => {
    const { color, setColor } = useCharacter();
    const colorRef = useRef(color); // Simpan warna di useRef agar tidak memicu re-render

    useEffect(() => {
        colorRef.current = color;
    }, [color]);

    // Menggunakan requestAnimationFrame agar smooth tanpa lag
    const handleColorChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const newColor = event.target.value;
        colorRef.current = newColor; // Update warna tanpa re-render
        requestAnimationFrame(() => {
            setColor(newColor); // Update state setelah frame selesai
        });
    }, [setColor]);

    return (
        <div className="">
            <input
                type="color"
                defaultValue={colorRef.current} // Gunakan defaultValue untuk menghindari re-render
                onChange={handleColorChange}
                className="w-20 h-10 cursor-pointer"
            />
        </div>
    );
};

export default ColorWheel;
