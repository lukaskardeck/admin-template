import AuthInput from "@/components/auth/AuthInput";
import { IconeAtencao, IconeCadeado, IconeCasa, IconeEmail, IconeGoogle, IconePerfil } from "@/components/icons";
import useAuth from "@/data/hooks/useAuth";
import { FirebaseError } from "firebase/app";
import Image from "next/image";
import { useState } from "react";

export default function Autenticacao() {

    const {
        login,
        cadastrar,
        loginGoogle
    } = useAuth()

    const [modo, setModo] = useState<"login" | "cadastro">("login")
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    // const [confirmarSenha, setConfirmarSenha] = useState("")
    const [erro, setErro] = useState("")

    async function submit() {
        try {
            if (modo === "login") {
                await login(email, senha)
            } else {
                if (!nome.trim()) {
                    exibirMsgErro("Campo 'Nome de usuário' está vazio!");
                    return;
                }
                await cadastrar(nome, email, senha)
            }
        } catch (erro) {
            if (erro instanceof FirebaseError) {
                let mensagemErro = "Ocorreu um erro inesperado."

                switch (erro.code) {
                    case "auth/invalid-credential":
                        mensagemErro = "E-mail ou senha incorretos. Verifique e tente novamente."
                        break
                    case "auth/invalid-email":
                        mensagemErro = "O e-mail informado não é válido."
                        break
                    case "auth/user-not-found":
                        mensagemErro = "Nenhuma conta encontrada com esse e-mail."
                        break
                    case "auth/wrong-password":
                        mensagemErro = "Senha incorreta. Tente novamente."
                        break
                    case "auth/email-already-in-use":
                        mensagemErro = "Este e-mail já está em uso por outra conta."
                        break
                    case "auth/too-many-requests":
                        mensagemErro = "Muitas tentativas. Tente novamente mais tarde."
                        break
                    case "auth/network-request-failed":
                        mensagemErro = "Verifique sua conexão com a internet."
                        break
                    default:
                        mensagemErro = "Erro desconhecido: " + erro.message
                }

                exibirMsgErro(mensagemErro)
            } else {
                console.error("Erro inesperado:", erro)
                exibirMsgErro("Erro inesperado. Tente novamente.")
            }
        }
    }



    function alternarModo() {
        setModo(modo === "login" ? "cadastro" : "login")
        setNome("")
        setEmail("")
        setSenha("")
        // setConfirmarSenha("")
    }

    function exibirMsgErro(msg: string, tempoDuracaoSeg: number = 10) {
        setErro(msg)
        setTimeout(() => setErro(""), tempoDuracaoSeg * 1000);
    }

    return (
        <div className={`relative h-screen w-screen`}>
            <Image
                src="/images/constellation.svg"
                alt=""
                fill
                style={{ objectFit: "cover" }}
                className="z-0"
                
            />

            <div className={`
                relative z-10 flex flex-col items-center justify-center h-full
            `}>

                {/* CONTAINER TRANSPARENTE */}
                <div className={`
                    flex flex-col gap-8
                    text-white bg-white/10 border border-white/30
                    backdrop-blur-lg rounded-xl shadow-lg 
                    w-[400px] md:w-[500px] p-8
                `}>

                    {/* TÍTULO DA PÁGINA */}
                    <h1 className={`
                        text-xl font-bold text-center
                    `}>
                        {
                            modo === "login"
                                ? "Entre com a Sua Conta"
                                : "Cadastre-se na Plataforma"
                        }
                    </h1>

                    {/* MENSAGEM DE ERRO */}
                    {erro && (
                        <div className={`
                        flex items-center
                        py-3 px-5 gap-3 rounded-lg
                        bg-red-400 text-white font-light 
                    `}>
                            {IconeAtencao}
                            <span>{erro}</span>
                        </div>
                    )}

                    {/* CAMPOS DE ENTRADA */}
                    <div className="flex flex-col gap-3">
                        {modo === "cadastro" && (
                            <AuthInput
                                tipo="text"
                                label="Nome de Usuario"
                                icon={IconePerfil(5)}
                                valor={nome}
                                onChange={setNome}
                                required
                            />
                        )}

                        <AuthInput
                            tipo="email"
                            label="Email"
                            icon={IconeEmail}
                            valor={email}
                            onChange={setEmail}
                            required
                        />

                        <AuthInput
                            tipo="password"
                            label="Senha"
                            icon={IconeCadeado}
                            valor={senha}
                            onChange={setSenha}
                            required
                        />

                        {/* {modo === "cadastro" && (
                        <AuthInput
                            tipo="password"
                            label="Confirmar Senha"
                            valor={confirmarSenha}
                            onChange={setConfirmarSenha}
                            required
                        />
                        )} */}
                    </div>

                    {/* BOTÕES PARA LOGIN/CADASTRO */}
                    <div>
                        <button onClick={submit} className={`
                            w-full bg-indigo-500 hover:bg-indigo-400
                            text-white rounded-lg px-4 py-3
                        `}>
                            {modo === "login" ? "Entrar" : "Cadastrar"}
                        </button>

                        <hr className="my-3 border-gray-300 w-full" />

                        <button
                            onClick={loginGoogle}
                            className="flex items-center w-full bg-red-600 hover:bg-red-500 text-white rounded-lg px-4 py-3 relative"
                        >
                            <div className="absolute left-4 ">
                                {IconeGoogle}
                            </div>

                            <span className="w-full text-center">Entrar com Google</span>
                        </button>

                    </div>

                    <div>
                        <p className="mt-2">
                            {modo === "login" ? "Novo por aqui?" : "Já faz parte da comunidade?"}
                            <span
                                onClick={alternarModo}
                                className="ml-2 cursor-pointer text-indigo-300">
                                {modo === "login" ? "Crie uma conta gratuitamente!" : "Entre com as suas credenciais!"}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}