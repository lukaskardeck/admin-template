import { IconeLua, IconeSol } from "@/components/icons"
import { useState } from "react";

interface BotaoAlternarTemaProps {
    tema: string
    alternarTema: () => void
}

export default function BotaoAlternarTema(props: BotaoAlternarTemaProps) {

    const [dark, setDark] = useState(props.tema === "dark");

    const handleClick = () => {
        setDark(!dark);
        props.alternarTema();
    };

    return (
        <div
            onClick={handleClick}
            className={`
                hidden sm:flex items-center cursor-pointer
                w-12 h-6 p-1 rounded-full
                ${!dark ? "bg-gradient-to-r from-violet-700 to-purple-950" : "bg-gradient-to-r from-rose-100 to-teal-100"}
            `}
        >
            <div
                className={`
                    w-4 h-4 flex items-center justify-center rounded-full 
                    transition-transform duration-500
                    ${!dark ? "translate-x-0 bg-gray-200 text-gray-800" : "translate-x-6 text-gray-600"}
                `}
            >
                {!dark ? IconeLua(3) : IconeSol(4)}
            </div>
        </div>
    );
}