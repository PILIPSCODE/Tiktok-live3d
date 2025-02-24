import React, { useState, useRef } from "react";
import Image from "next/image";

interface Item {
    [key: string]: any;
}

interface ItemSelectorProps {
    items: Item[];
    defaults: string;
    imageKey: string;
    nameKey: string;
    onClick: (item: Item) => void;
}

const ItemSelector: React.FC<ItemSelectorProps> = ({ items, defaults, imageKey, nameKey, onClick }) => {
    const [activeItem, setActiveItem] = useState<string>("");
    const activeItemRef = useRef<string | null>(null);

    const handleClick = (item: Item) => {
        const newItem = activeItem === item[nameKey] ? "" : item[nameKey];
        setActiveItem(newItem);
        activeItemRef.current = newItem;
        onClick(item);
    };

    return (
        <div className="grid grid-cols-3 max-[341px]:grid-cols-2 sm:grid-cols-5 2xl:grid-cols-6 gap-4 max-h-[500px] overflow-y-auto">
            {items.map((e, index) => (
                <div key={index}>
                    <div className='h-20 w-20 relative bg-white shadow-lg rounded-lg' onClick={() => handleClick(e)}>
                        <Image sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" fill alt='img-char' className={`${defaults === `${e[nameKey]}` ? " blur-sm" : ""} duration-300 rounded-lg object-cover`} src={e[imageKey]} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ItemSelector;
