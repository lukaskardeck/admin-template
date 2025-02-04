import useAppData from "@/data/hooks/useAppData"
import BotaoAlternarTema from "../botao/BotaoAlternarTema"
import Titulo from "../titulo/Titulo"
import Avatar from "../avatar/Avatar"

interface CabecalhoProps {
    titulo: string
    subtitulo: string
}

export default function Cabecalho(props: CabecalhoProps) {
    const { tema, alternarTema } = useAppData()
    return (
        <div className="flex">
            <Titulo titulo={props.titulo} subtitulo={props.subtitulo} />
            <div className="flex flex-grow justify-end items-center gap-2">
                <BotaoAlternarTema tema={tema} alternarTema={alternarTema} />
                <Avatar />
            </div>
        </div>
    )
}