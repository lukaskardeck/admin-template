import Link from "next/link"
import { useRouter } from "next/router"

interface MenuItemProps {
    texto: string
    url: string
    icone: any
}

export default function MenuItem(props: MenuItemProps) {
    const router = useRouter()
    const paginaSelecionada = router.pathname == props.url ? "bg-gray-100" : ""

    return (
        <li className={`hover:bg-gray-100 px-1 ${paginaSelecionada}`}>
            <Link 
                href={props.url} 
                className="flex flex-col justify-center items-center h-20 w-full"
            >
                {props.icone}
                <span
                    className="text-sm font-light text-gray-600"
                >{props.texto}</span>
            </Link>
        </li>
    )
}