import { createContext, useEffect, useState } from "react";

// export type Tema = 'dark' | ''

interface AppContextProps {
    tema?: string
    alternarTema?: () => void
}

const AppContext = createContext<AppContextProps>({})

function AppProvider(props) {
    const [tema, setTema] = useState("")

    function alternarTema() {
        const novoTema = tema === "" ? "dark": ""
        setTema(novoTema)
        localStorage.setItem("tema", novoTema)
    }

    useEffect(() => {
        const temaSalvo = localStorage.getItem("tema")
        setTema(temaSalvo ?? "")
    }, [])

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