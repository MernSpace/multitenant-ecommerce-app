import "server-only"
import { cookies as getCookies } from "next/headers"

interface Props {
    prefix: string,
    value: string
}

export const generateAuthCokie = async ({
    prefix,
    value
}: Props) => {
    const cookies = await getCookies();
    cookies.set({
        name: `${prefix}-token`,
        value,
        httpOnly: true,
        path: "/",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        secure: process.env.NODE_ENV === "production",
        // ⚠️ remove domain in dev, only use for real root domain in prod
        domain: process.env.NODE_ENV === "production"
            ? process.env.NEXT_PUBLIC_ROOTDOMAIN
            : undefined
    })
}