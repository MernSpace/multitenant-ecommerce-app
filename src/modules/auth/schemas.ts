import z from "zod"
export const loginSchema =
    z.object({
        email: z.string().email(),
        password: z.string()
    })


export const registerSchema =
    z.object({
        email: z.string().email(),
        password: z.string(),
        username: z.string()
            .min(3, "user name must be 3 characters")
            .max(23, "user name must be less then 23 characters")
            .regex(
                /^[a-z0-9][a-z0-9-]*[a-z0-9]$/,
                "user name can only contain lowercase letter, number and hypen"
            )
            .refine(
                (val) => !val.includes("--"),
                "username cannot contain consecutive hyphens"
            )
            .transform((val) => val.toLowerCase())
    })