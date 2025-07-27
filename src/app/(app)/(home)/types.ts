import { Category } from "@/payload-types"

export type CustomTypes = Category & {
    subcategories: Category[]
}