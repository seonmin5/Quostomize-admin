'use client'

import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import {NextResponse} from "next/server";

const LogoutButton = () => {
    const router = useRouter();

    const logout = async () => {
        try {
            await fetch("api/auth/logout", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                cache:"no-store",
                credentials: "include"
            });

            await signOut({ redirect: false });
            router.push('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    }

    return (
        <div
            className="underline cursor-pointer text-xs"
            onClick={() => logout()}
        >
            로그아웃
        </div>
    )
}

export default LogoutButton;