import useAuth from "@/data/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";

export default function Avatar() {
    const { usuario } = useAuth()

    return (
        <Link href="/perfil">
            <div className="relative h-8 w-8 cursor-pointer">
                <Image
                    alt="Avatar do usuário"
                    src={usuario?.imagemUrl || "/images/avatar.svg"}
                    className="rounded-full"
                    fill
                    priority
                />
            </div>
        </Link>
    )
}