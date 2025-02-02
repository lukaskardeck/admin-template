import { createContext, useState } from "react";

export type Tema = 'dark' | ''

interface AppContextProps {
    tema?: Tema
    alternarTema?: () => void
}

const AppContext = createContext<AppContextProps>({})

function AppProvider(props) {
    const [tema, setTema] = useState<Tema>('')

    function alternarTema() {
        setTema(tema === "" ? "dark": "")
    }

    return (
        <AppContext.Provider value={{
            tema,
            alternarTema
        }}>
            {props.children}
        </AppContext.Provider>
    )
}

export {
    AppContext,
    AppProvider
}