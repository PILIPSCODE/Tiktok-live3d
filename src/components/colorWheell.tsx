"use client"
import { useCharacter } from '@/hooks/useCharacter';
import React, { useState } from 'react';

const ColorWheel = () => {
    const { color, setColor } = useCharacter();

    const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setColor(event.target.value);
    };

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <input
                type="color"
                value={color}
                onChange={handleColorChange}
                className="w-20 h-10 cursor-pointer"
            />
        </div>
    );
};

export default ColorWheel;

function getRandomColor() {
    const letters = '6789ABCD';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
}

function create3DGradient(color: string) {
    return `radial-gradient(circle at 50% 50%, 
            ${color} 0%, 
            ${shadeColor(color, -0.2)} 40%, 
            ${shadeColor(color, -0.4)} 70%, 
            ${shadeColor(color, -0.6)} 85%, 
            ${shadeColor(color, -0.8)} 100%)`;
}

function shadeColor(color: string, percent: number) {
    const num = parseInt(color.slice(1), 16);
    const amt = Math.round(2.55 * percent * 100);
    const R = Math.min(255, Math.max(0, (num >> 16) + amt));
    const G = Math.min(255, Math.max(0, (num >> 8 & 0x00FF) + amt));
    const B = Math.min(255, Math.max(0, (num & 0x0000FF) + amt));

    return `#${(0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1).toUpperCase()}`;
}
