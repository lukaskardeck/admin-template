
import { IconeAjuste, IconeCasa, IconeSino } from "@/components/icons";
import MenuItem from "../menu-item/menuItem";

export default function MenuLateral() {
    return (
        <aside>
            <ul>
                <MenuItem url="/" texto="Ínicio" icone={IconeCasa}/>
                <MenuItem url="/ajustes" texto="Ajustes" icone={IconeAjuste}/>
                <MenuItem url="/notificacoes" texto="Notificações" icone={IconeSino}/>
            </ul>
        </aside>
    )
}