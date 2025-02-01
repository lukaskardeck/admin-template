import Link from "next/link"
import { useRouter } from "next/router"

interface MenuItemProps {
    texto: string
    icone: any
    url?: string
    className?: string
    onClick?: (evento: any) => void
}

export default function MenuItem(props: MenuItemProps) {
    const router = useRouter()
    const paginaSelecionada = router.pathname == props.url ? "bg-gray-100" : ""

    function renderizarItem() {
        return (
            <div className={`flex flex-col justify-center items-center h-20 w-full}`}>
                {props.icone}
                <span
                    className="text-sm font-light"
                >{props.texto}</span>
            </div>
        )
    }

    return (
        <li className={`
            hover:bg-gray-100 px-1 cursor-pointer text-gray-600 
            ${paginaSelecionada} ${props.className}
        `} onClick={props.onClick}>
            {props.url ? (
                <Link href={props.url}>
                    {renderizarItem()}
                </Link>
            ) : renderizarItem()}
        </li>
    )
}