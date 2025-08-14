"use client"
import { ArrowLeftIcon } from "lucide-react"
import Link from "next/link"
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"
import { ReviewSidebar } from "../components/review-sidebar"

interface Props {
    productId: string
}

export const ProductView = ({ productId }: Props) => {
    const trpc = useTRPC()
    const { data } = useSuspenseQuery(trpc.library.getOne.queryOptions({
        productId
    }))
    return (
        <div className="min-h-screen bg-white">
            <nav className="p-4 bg-[#F4F4F0] w-full border-b">
                <Link prefetch href={"/"} className="flex items-center gap-2">

                    <ArrowLeftIcon className="size-4" />
                    <span className="text font-medium">Back</span>

                </Link>
            </nav>
            <header className="bg-[#F4F4F0] py-8 border-b">
                <div className="max-w-(--breakpoint-xl) mx-auto lg:px-12 px-4 ">
                    <h1 className="text-[40px] font-medium">{data.name}</h1>
                </div>
            </header>
            <section className="max-w-(--breakpoint-xl) mx-auto lg:px-12 px-4 py-10"  >
                <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 lg:gap-16">
                    <div className="lg:col-span-3">
                        <div className="p-4 bg-white rounded-md border gap-4">
                            <ReviewSidebar productId={productId} />
                        </div>
                    </div>
                    <div className="lg:col-span-5">
                        <p className="font-medium italic text-muted-foreground">No specal</p>
                    </div>

                </div>

            </section>
        </div>
    )
}