interface ConteudoProps {
    children?: any
}

export default function Conteudo(props: ConteudoProps) {
    return (
        <div className={`
            flex flex-col px-7 py-7
        `}>
            {props.children}
        </div>
    )
}