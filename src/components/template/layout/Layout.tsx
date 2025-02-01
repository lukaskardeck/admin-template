import Cabecalho from "../cabecalho/Cabecalho"
import Conteudo from "../conteudo/Conteudo"
import MenuLateral from "../menu-lateral/MenuLateral"

interface LayoutProps {
    titulo: string
    subtitulo: string
    children?: any
}

export default function Layout(props: LayoutProps) {
    return (
        <div>
            <h1>Layout</h1>
            <MenuLateral />
            <Cabecalho titulo={props.titulo} subtitulo={props.subtitulo}/>
            <Conteudo>
                {props.children}
            </Conteudo>
        </div>
    )
}