"use client"

import Image from "next/image"
import Link from "next/link"
import { generateTenantURL } from "../../../../lib/utils"
// import { CheckoutButton } from "@/modules/checkout/ui/components/checkout-button"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"






interface Props {
    slug: string
}
export const Navbar = ({
    slug
}: Props) => {
    return (
        <nav className="h-20 border-b font-medium bg-white">
            <div className="max-w-(--breakpoint-xl) mx-auto flex justify-between items-center h-full px-4 lg:px-12">
                <Link href={generateTenantURL(slug)} className="flex items-center gap-2">

                    <p className="text-2xl">Checkout</p>

                </Link>
                <Button
                    variant={"elevated"}
                    asChild
                >
                    <Link href={generateTenantURL(slug)}>
                        Continue
                    </Link>
                </Button>
            </div>
        </nav>
    )
}

