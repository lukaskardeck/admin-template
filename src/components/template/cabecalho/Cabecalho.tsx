import Titulo from "../titulo/Titulo"
import Avatar from "../avatar/Avatar"

interface CabecalhoProps {
    titulo: string
    subtitulo: string
}

export default function Cabecalho(props: CabecalhoProps) {
    return (
        <div className="flex justify-between bg-white dark:bg-gray-900 h-20 px-7 py-4">
            <Titulo titulo={props.titulo} subtitulo={props.subtitulo} />
            <Avatar />
        </div>
    )
}