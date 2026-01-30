import * as z from "zod"

export const userSchema = z.object({
    email: z.string().min(10),
    password: z.string().min(5)
})