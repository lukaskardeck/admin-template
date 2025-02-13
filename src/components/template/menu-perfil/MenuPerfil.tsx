export default function MenuPerfil(props: any) {
        return (
            <ul className={`
                absolute right-0 top-full mt-1
                rounded-lg shadow-lg border
                border-gray-200 dark:border-gray-700
                bg-white dark:bg-gray-800
                min-w-max 
            `}>
                {props.children}
            </ul>
        )
}