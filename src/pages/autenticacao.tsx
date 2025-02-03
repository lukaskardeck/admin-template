import AuthInput from "@/components/auth/AuthInput";
import { IconeAtencao } from "@/components/icons";
import Image from "next/image";
import { useState } from "react";

export default function Autenticacao() {
    const [modo, setModo] = useState<"login" | "cadastro">("login")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [confirmarSenha, setConfirmarSenha] = useState("")
    const [erro, setErro] = useState("")

    function submit() {
        if (modo === "login") {
            console.log("login")
        } else {
            console.log("cadastrar")
        }
    }

    function alternarModo() {
        setModo(modo === "login" ? "cadastro" : "login")
        setEmail("")
        setSenha("")
        setConfirmarSenha("")
    }

    function exibirMsgErro(msg: string, tempoDuracaoSeg: number = 5) {
        setErro(msg)
        setTimeout(() => setErro(""), tempoDuracaoSeg * 1000);
    }

    return (
        <div className={`flex h-screen items-center justify-center`}>
            <div className={`
                hidden md:flex relative w-1/2 h-full xl:w-2/3
            `}>
                <Image
                    alt="imagem aleatória"
                    src="/image2.jpg"
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="100%"
                    priority
                />
            </div>


            <div className={`
               flex w-1/2 xl:w-1/3 flex-col gap-6 px-6
            `}>
                <h1 className={`
                     text-xl font-bold text-center
                `}>
                    {
                        modo === "login"
                            ? "Entre com a Sua Conta"
                            : "Cadastre-se na Plataforma"
                    }
                </h1>

                {erro && (
                    <div className={`
                        flex items-center
                        py-3 px-5 gap-1 rounded-lg
                        bg-red-400 text-white font-light 
                    `}>
                        {IconeAtencao}
                        <span>{erro}</span>
                    </div>
                )}

                <div className="flex flex-col gap-3">
                    <AuthInput
                        tipo="email"
                        label="Email"
                        valor={email}
                        onChange={setEmail}
                        required
                    />

                    <AuthInput
                        tipo="password"
                        label="Senha"
                        valor={senha}
                        onChange={setSenha}
                        required
                    />

                    {modo === "cadastro" && (
                        <AuthInput
                            tipo="password"
                            label="Confirmar Senha"
                            valor={confirmarSenha}
                            onChange={setConfirmarSenha}
                            required
                        />
                    )}
                </div>

                <div>
                    <button onClick={submit} className={`
                        w-full bg-indigo-500 hover:bg-indigo-400
                        text-white rounded-lg px-4 py-3
                    `}>
                        {
                            modo === "login"
                                ? "Entrar"
                                : "Cadastrar"
                        }
                    </button>

                    <hr className="my-4 border-gray-300 w-full" />

                    <button onClick={submit()} className={`
                        w-full bg-red-600 hover:bg-red-500
                        text-white rounded-lg px-4 py-3
                    `}>
                        Entrar com Google
                    </button>
                </div>

                <div>
                    <p className="mt-2">
                        {modo === "login" ? "Novo por aqui?" : "Já faz parte da comunidade?"}
                        <span
                            onClick={alternarModo}
                            className="ml-2 cursor-pointer text-indigo-700">
                            {modo === "login" ? "Crie uma conta gratuitamente!" : "Entre com as suas credenciais!"}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}