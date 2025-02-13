
import { IconeAjuste, IconeCasa, IconeSino } from "@/components/icons";
import MenuItem from "../menu-item/menuItem";

export default function MenuLateral() {

    return (
        <aside className={`
            flex flex-col
            dark:bg-gray-900
        `}>
            <div className={`
                flex items-center justify-center h-20 w-full 
                bg-gradient-to-r from-[#550055] to-[#3a003a]
                text-white  
            `}>
                LOGO
            </div>
            <ul className=" flex-1">
                <MenuItem url="/" texto="Ínicio" icone={IconeCasa} />
                <MenuItem url="/ajustes" texto="Ajustes" icone={IconeAjuste} />
                <MenuItem url="/notificacoes" texto="Notificações" icone={IconeSino} />
            </ul>
        </aside>
    )
}