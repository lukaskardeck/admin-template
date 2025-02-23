interface AuthInputProps {
    label: string;
    tipo?: string;
    valor: string;
    onChange: (valor: string) => void;
    required?: boolean;
    icon?: React.ReactNode; // Ícone SVG ou React Icons (opcional)
  }
  
  export default function AuthInput(props: AuthInputProps) {
    return (
      <div className="flex flex-col">
        <label>{props.label}</label>
  
        <div className="relative text-black/60">
          {props.icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              {props.icon}
            </div>
          )}
  
          <input
            type={props.tipo ?? "text"}
            value={props.valor}
            onChange={(e) => props.onChange(e.target.value)}
            required={props.required}
            className={`
              w-full px-4 py-3 rounded-lg bg-gray-200 mt-1 focus:bg-gray-100
              border focus:border-blue-700 focus:outline-none
              ${props.icon ? "pl-11" : ""}
            `}
          />
        </div>
      </div>
    );
  }
  