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
    const paginaSelecionada = router.pathname == props.url 
        ? "bg-gray-100 dark:bg-gray-800"
        : ""

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
            px-1 cursor-pointer 
            hover:bg-gray-100 text-gray-600
            dark:text-gray-200 dark:hover:bg-gray-700
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