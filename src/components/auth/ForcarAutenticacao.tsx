import useAppData from "@/data/hooks/useAppData";
import useAuth from "@/data/hooks/useAuth";
import Image from "next/image";
import router from "next/router";
import Script from "next/script";

export default function ForcarAutenticacao(props) {
    const { usuario, carregando } = useAuth()
    const { tema } = useAppData()

    function renderizarConteudo() {
        return (
            <>
                <Script id="redirect-script" dangerouslySetInnerHTML={{
                    __html: `
                        if (!document.cookie?.includes("admin-template-auth")) {
                            window.location.href = "/autenticacao"
                        }
                    `
                }} />
                {props.children}
            </>
        )
    }

    function renderizarCarregamento() {
        return (
            <div className={`${tema} h-screen`}>
                <div className="flex h-full justify-center items-center dark:bg-gray-800">
                    <Image
                        src="/images/loading.gif"
                        alt="gif de carregamento"
                        width={100}
                        height={100}
                        priority
                        unoptimized
                    />
                </div>
            </div>
        )
    }

    if (carregando) return renderizarCarregamento()
    if (usuario?.email) return renderizarConteudo()

    router.push("/autenticacao")
    return null
}