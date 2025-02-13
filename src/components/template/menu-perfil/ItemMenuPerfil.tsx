import Link from "next/link";

interface ItemMenuPerfilProps {
    texto: string;
    url?: string;
    onClick?: () => void;
    icon?: React.ReactNode;
    className?: string;
}

export default function ItemMenuPerfil(props: ItemMenuPerfilProps) {
    return (
        <li
            className={`relative flex items-center w-full 
                px-4 py-3 text-sm text-gray-700 dark:text-gray-200
                hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer gap-3
                first:rounded-t-lg last:rounded-b-lg ${props.className}
            `}
            onClick={props.onClick}
        >
            {props.url ? (
                <Link href={props.url} className="flex w-full items-center gap-3">
                    {props.icon}
                    {props.texto}
                </Link>
            ) : (
                <>
                    {props.icon}
                    {props.texto}
                </>
            )}
        </li>
    );
}
