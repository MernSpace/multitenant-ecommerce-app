import { useQueryStates, parseAsString } from "nuqs"


export const useProductFilter = () => {
    return useQueryStates({
        minPrice: parseAsString
            .withOptions({
                clearOnDefault: true
            }),
        maxPrice: parseAsString
            .withOptions({
                clearOnDefault: true
            })
    })
}