interface AuthInputProps {
    label: string
    valor: any
    tipo?: "text" | 'email' | 'password'
    required?: boolean
    onChange: (novoValor: any) => void
}

export default function AuthInput(props: AuthInputProps) {
    return (
        <div className={`flex flex-col`}>
            <label>{props.label}</label>
            <input 
                type={props.tipo ?? "text"}
                value={props.valor}
                onChange={e => props.onChange(e.target.value)}
                required={props.required}
                className={`
                    px-4 py-3 rounded-lg bg-gray-200 mt-1
                    focus:bg-gray-100
                    border focus:border-blue-700 focus:outline-none
                `}
            />
        </div>
    )
}