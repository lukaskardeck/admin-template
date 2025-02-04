import Usuario from "@/models/Usuario"
import app from "@/lib/firebase/config"
import { getAuth, signInWithPopup, User, GoogleAuthProvider } from "firebase/auth"
import { useRouter } from "next/router"
import { createContext, useState } from "react"
import { FirebaseError } from "firebase/app"

interface AuthContextProps {
    usuario?: Usuario
    loginGoogle?: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps>({})

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

export function AuthProvider(props: any) {
    const router = useRouter()

    const [usuario, setUsuario] = useState<Usuario>()

    async function loginGoogle() {
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider();

        try {
            const resp = await signInWithPopup(auth, provider);

            if (resp.user?.email) {
                const usuario = await usuarioNormalizado(resp.user);
                setUsuario(usuario);
                console.log(usuario.nome)
                router.push("/");
            }
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
        }
    }

    return (
        <AuthContext.Provider value={{
            usuario,
            loginGoogle
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext