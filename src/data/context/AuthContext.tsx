import Usuario from "@/models/Usuario"
import app from "@/lib/firebase/config"
import { setCookie, deleteCookie, getCookie } from "cookies-next"
import {
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    User, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
} from "firebase/auth"
import { useRouter } from "next/router"
import { createContext, useEffect, useState } from "react"
import { FirebaseError } from "firebase/app"

interface AuthContextProps {
    usuario: Usuario
    carregando: boolean
    cadastrar: (email: string, senha: string) => Promise<void>
    login: (email: string, senha: string) => Promise<void>
    loginGoogle: () => Promise<void>
    logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps>({
    usuario: {} as Usuario,
    carregando: true,
    cadastrar: async () => {},
    login: async () => {},
    loginGoogle: async () => {},
    logout: async () => {}
})

async function usuarioNormalizado(usuarioFirebase: User): Promise<Usuario> {
    const token = await usuarioFirebase.getIdToken()
    return {
        uid: usuarioFirebase.uid,
        email: usuarioFirebase.email ?? "",
        nome: usuarioFirebase.displayName ?? "",
        token: token,
        provedor: usuarioFirebase.providerData[0].providerId,
        imagemUrl: usuarioFirebase.photoURL ?? ""
    }
}

async function gerenciarCookies(logado: boolean) {
    if (logado) {
        setCookie(
            "admin-template-auth",
            logado,
            {
                maxAge: 7 * 24 * 60 * 60, // 7 dias
            }
        )
    } else {
        deleteCookie("admin-template-auth");
    }
}

export function AuthProvider(props: any) {
    const router = useRouter()
    const [usuario, setUsuario] = useState<Usuario | null>()
    const [carregando, setCarregando] = useState<boolean>(true)

    const auth = getAuth(app);

    async function configurarSessao(usuarioFirebase: User | null) {
        if (usuarioFirebase?.email) {
            const usuario = await usuarioNormalizado(usuarioFirebase)
            setUsuario(usuario)
            gerenciarCookies(true)
            setCarregando(false)
            return usuario.email
        } else {
            setUsuario(null)
            gerenciarCookies(false)
            setCarregando(false)
            return false
        }
    }

    async function cadastrar(email: string, senha: string) {
        try {
            setCarregando(true)
            const resp = await createUserWithEmailAndPassword(auth, email, senha)
            await configurarSessao(resp.user)
            router.push("/")
        } finally {
            setCarregando(false)
        }
    }

    async function login(email: string, senha: string) {
        try {
            setCarregando(true)
            const resp = await signInWithEmailAndPassword(auth, email, senha)
            await configurarSessao(resp.user)
            router.push("/")
        } finally {
            setCarregando(false)
        }
    }

    async function loginGoogle() {
        const provider = new GoogleAuthProvider();

        try {
            setCarregando(true)
            const resp = await signInWithPopup(auth, provider);
            await configurarSessao(resp.user)
            router.push("/");
        } catch (error) {
            if (error instanceof FirebaseError) {
                if (error.code === "auth/popup-closed-by-user") {
                    console.warn("O usuário fechou o pop-up antes de concluir o login.");
                } else {
                    console.error("Erro ao fazer login com Google:", error.message);
                }
            } else {
                console.error("Erro desconhecido ao fazer login:", error);
            }
        } finally {
            setCarregando(false)
        }
    }

    useEffect(() => {
        if (getCookie("admin-template-auth")) {
            const cancelar = auth.onIdTokenChanged(configurarSessao)
            return () => cancelar()
        } else {
            setCarregando(false)
        }
    }, [])

    async function logout() {
        try {
            setCarregando(true)
            await auth.signOut()
            await configurarSessao(null)
        } finally {
            setCarregando(false)
            router.push("/autenticacao")
        }
    }

    return (
        <AuthContext.Provider value={{
            usuario,
            carregando,
            cadastrar,
            login,
            loginGoogle,
            logout
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext