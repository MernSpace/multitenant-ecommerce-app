import { DEFAULT_LIMIT } from "@/constants";
import { loadProductFilter } from "@/modules/products/search-params";
import { ProductListView } from "@/modules/products/ui/views/product-list-view";
import { trpc, getQueryClient } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { SearchParams } from "nuqs/server";

interface Props {
    params: Promise<{
        subcategory: string;
    }>
    searchParams: Promise<SearchParams>

}
const page = async ({ params, searchParams }: Props) => {
    const { subcategory } = await params;
    const filters = await loadProductFilter(searchParams)
    const queryClient = getQueryClient();
    void queryClient.prefetchInfiniteQuery(trpc.products.getMany.infiniteQueryOptions({
        ...filters,
        category: subcategory,
        limit: DEFAULT_LIMIT
    }))

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>

            <ProductListView category={subcategory} />
        </HydrationBoundary>
    )
}

export default page