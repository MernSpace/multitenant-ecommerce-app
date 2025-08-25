import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ProductView, ProductViewSkeleton } from "@/modules/products/ui/views/product-view";
import { Suspense } from "react";

interface Props {
    params: Promise<{ productId: string; slug: string }>
}

const Page = async ({ params }: Props) => {
    const { productId, slug } = await params;
    const queryClient = getQueryClient()
    void queryClient.prefetchQuery(trpc.products.getOne.queryOptions({
        id: productId
    }))
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<ProductViewSkeleton />}>
                <ProductView productId={productId} tenanatSlug={slug} />
            </Suspense>
        </HydrationBoundary>
    )
}

export default Page