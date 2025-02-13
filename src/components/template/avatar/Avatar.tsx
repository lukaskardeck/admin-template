import useAppData from "@/data/hooks/useAppData";
import useAuth from "@/data/hooks/useAuth";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import MenuPerfil from "../menu-perfil/MenuPerfil";
import ItemMenuPerfil from "../menu-perfil/ItemMenuPerfil";
import { IconeParaBaixo, IconePerfil, IconeSair, IconeSol } from "@/components/icons";

export default function Avatar() {
    const { usuario, logout } = useAuth()
    const { tema, alternarTema } = useAppData()
    const [menuAberto, setMenuAberto] = useState<boolean>(false)

    const palavraTema = tema === "dark" ? "Dark" : "Light"

    const menuRef = useRef<HTMLDivElement>(null);

    // Fecha o menu ao clicar fora
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuAberto(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div
            className={`
                relative flex items-center gap-2 p-3 cursor-pointer
                hover:bg-gray-100 dark:hover:bg-gray-800
                rounded-xl
            `}
            onClick={() => setMenuAberto(!menuAberto)}
            ref={menuRef}
        >
            <div className="relative h-8 w-8">
                <Image
                    alt="Avatar do usuário"
                    src={usuario?.imagemUrl || "/images/avatar.svg"}
                    className="rounded-full"
                    fill
                    priority
                />
            </div>

            <div className="flex items-center justify-center text-sm gap-1">
                <div className="hidden sm:flex">
                    {usuario?.nome || "user"}
                </div>
                {IconeParaBaixo}
            </div>

            {menuAberto &&
                <MenuPerfil>
                    <ItemMenuPerfil
                        texto="Meu Perfil"
                        icon={IconePerfil(5)}
                        onClick={() => console.log(usuario)}
                        url="/perfil"
                    />

                    <ItemMenuPerfil
                        texto={`Tema: ${palavraTema}`}
                        icon={IconeSol(5)}
                        onClick={alternarTema}
                    />

                    <ItemMenuPerfil
                        texto="Sair"
                        icon={IconeSair(5)}
                        onClick={logout}
                        className={`
                            text-red-600 hover:bg-red-500 hover:text-white
                            dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-gray-200
                        `}
                    />
                </MenuPerfil>
            }
        </div>
    )
}