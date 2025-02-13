
import { IconeAjuste, IconeCasa, IconeSair, IconeSino } from "@/components/icons";
import MenuItem from "../menu-item/menuItem";
import useAuth from "@/data/hooks/useAuth";

export default function MenuLateral() {
    const { logout } = useAuth()

    return (
        <aside className={`
            flex flex-col
            dark:bg-gray-900
        `}>
            <div className={`
                flex items-center justify-center h-20 w-full 
                bg-gradient-to-r from-emerald-500 to-lime-600 text-white   
            `}>
                LOGO
            </div>
            <ul className=" flex-1">
                <MenuItem url="/" texto="Ínicio" icone={IconeCasa} />
                <MenuItem url="/ajustes" texto="Ajustes" icone={IconeAjuste} />
                <MenuItem url="/notificacoes" texto="Notificações" icone={IconeSino} />
            </ul>
            {/* <ul>
                <MenuItem 
                    texto="Sair" 
                    icone={IconeSair} 
                    onClick={logout}
                    className={`
                        text-red-600 hover:bg-red-400 hover:text-white
                        dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-gray-200
                    `}
                />
            </ul> */}
        </aside>
    )
}