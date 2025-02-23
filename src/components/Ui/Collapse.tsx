import { useState, useRef, useEffect } from "react";

type NavItem = {
    value: string;
    icons?: JSX.Element;
    JSX?: JSX.Element;
};

type Props = {
    items: NavItem[];
    style: string;
    onItemClick?: (item: NavItem) => void;
};

const SidebarMenu: React.FC<Props> = ({ items, onItemClick, style }) => {
    const [activeItem, setActiveItem] = useState<string>("");
    const activeItemRef = useRef<string | null>(null);
    const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

    const handleClick = (item: NavItem) => {
        const newItem = activeItem === item.value ? "" : item.value;
        setActiveItem(newItem);
        activeItemRef.current = newItem;
        onItemClick?.(item);
    };

    useEffect(() => {
        if (activeItemRef.current) {
            const targetElement = itemRefs.current[activeItemRef.current];
            if (targetElement) {
                setTimeout(() => {
                    targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
                }, 300);
            }
        }
    }, [activeItem]);

    return (
        <ul className={`flex flex-col ${style !== "" ? "gap-3" : "gap-6"} `}>
            {items.map((item, index) => (
                <li className="flex flex-col" key={index}>
                    <span
                        className={`flex gap-2 items-center cursor-pointer ${style}`}
                        onClick={() => handleClick(item)}
                    >
                        {item.icons} {item.value}
                    </span>
                    <div
                        className={`flex-grow transition-all duration-700 text-gray-700 rounded-md ${activeItem === item.value
                            ? "opacity-100 bg-gray-200 overflow-y-scroll max-h-screen"
                            : "max-h-0 opacity-0 overflow-hidden"
                            }`}
                        ref={(el) => {
                            itemRefs.current[item.value] = el;
                        }}
                    >
                        {item.JSX}
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default SidebarMenu;
