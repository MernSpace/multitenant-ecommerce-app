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
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <nav className="p-4 bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto">
                    <Link href="/" className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors">
                        <ArrowLeftIcon className="w-4 h-4" />
                        <span className="text-sm font-medium">Back to library</span>
                    </Link>
                </div>
            </nav>

            {/* Header */}
            <header className="bg-white border-b border-gray-200 py-8">
                <div className="max-w-7xl mx-auto px-4 lg:px-12">
                    <h1 className="text-3xl lg:text-4xl font-semibold text-gray-900">
                        {data?.name || 'Product Name'}
                    </h1>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 lg:px-12 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Review Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <ReviewSidebar productId={productId} />
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 min-h-96">
                            {data.content ? <p>
                                {data.content}
                            </p> : (
                                <p className="text-gray-500 italic text-center mt-16">
                                    No special content
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}