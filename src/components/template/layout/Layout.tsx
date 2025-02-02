import useAppData from "@/data/hooks/useAppData"
import Cabecalho from "../cabecalho/Cabecalho"
import Conteudo from "../conteudo/Conteudo"
import MenuLateral from "../menu-lateral/MenuLateral"

interface LayoutProps {
    titulo: string
    subtitulo: string
    children?: any
}

export default function Layout(props: LayoutProps) {
    const { tema } = useAppData()

    return (
        <div className={`${tema} flex h-screen w-screen`}>
            <MenuLateral />
            <div className="flex flex-col w-full p-7 bg-gray-200 dark:bg-gray-800 dark:text-white">
                <Cabecalho titulo={props.titulo} subtitulo={props.subtitulo} />
                <Conteudo>
                    {props.children}
                </Conteudo>
            </div>
        </div>
    )
}