import { ReviewsGetOneOutput } from "@/modules/reviews/types";
import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FormControl, FormField, FormItem, FormMessage, Form } from "@/components/ui/form";
import { StarPicker } from "@/components/star-picker";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { toast } from "sonner";


interface Props {
    productId: string;
    initialData?: ReviewsGetOneOutput
}
const formSchema = z.object({
    rating: z.number().min(1, { message: "Rating is required" }).max(5),
    description: z.string().min(1, { message: "Description is required" })
})
export const ReviewForm = ({ productId, initialData }: Props) => {
    const [isPreview, setIsPreview] = useState(!!initialData)
    const trpc = useTRPC()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            rating: initialData?.rating ?? 0,
            description: initialData?.description ?? ""
        }
    })

    const queryClient = useQueryClient()
    const createReviwe = useMutation(trpc.review.create.mutationOptions({
        onSuccess: () => {
            queryClient.invalidateQueries(trpc.review.getOne.queryOptions({
                productId
            }))
            setIsPreview(true)
        },
        onError: (error) => {
            toast.error(error.message)
        }
    }))
    const updateReviwe = useMutation(trpc.review.update.mutationOptions({
        onSuccess: () => {
            queryClient.invalidateQueries(trpc.review.getOne.queryOptions({
                productId
            }))
            setIsPreview(true)
        },
        onError: (error) => {
            toast.error(error.message)
        }
    }))

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        if (initialData) {
            updateReviwe.mutate({
                reviewId: initialData.id,
                rating: data.rating,
                description: data.description
            })
        } else {
            createReviwe.mutate({
                productId,
                rating: data.rating,
                description: data.description
            })
        }
    }
    return (
        <Form {...form}>
            <form
                className="flex flex-col gap-y-4"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <p className="font-medium">
                    {isPreview ? "your rating" : "Like it? Give it a rating"}
                </p>
                <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                        <FormItem>
                            <StarPicker
                                value={field.value}
                                onChange={field.onChange}
                                disabled={isPreview}
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Textarea
                                    placeholder="Want to leave a written review"
                                    disabled={isPreview}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {!isPreview && (
                    <Button
                        variant={"elevated"}
                        disabled={createReviwe.isPending || updateReviwe.isPending}
                        type="submit"
                        size={"lg"}
                        className="bg-black text-white hover:bg-pink-400  hover:text-primary w-fit">
                        {initialData ? "Update" : "Create"}
                    </Button>
                )}

            </form>
            {isPreview && (
                <Button
                    onClick={() => setIsPreview(false)}
                    size={"lg"}
                    type="button"
                    variant={"elevated"}
                    className="w-fit mt-4"
                >
                    Edit
                </Button>
            )}
        </Form>
    )
}



export const ReviewFormSkeleton = () => {
    return (
        <div
            className="flex flex-col gap-y-4"
        >
            <p className="font-medium">
                Like it? Give it a rating.
            </p>

            <StarPicker

                disabled
            />


            <Textarea
                placeholder="Want to leave a written review"
                disabled
            />


            <Button
                variant={"elevated"}
                disabled
                type="button"
                size={"lg"}
                className="bg-black text-white hover:bg-pink-400  hover:text-primary w-fit">
                Create
            </Button>

        </div>
    )
}