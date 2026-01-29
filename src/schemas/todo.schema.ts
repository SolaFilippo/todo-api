import * as z from "zod"

export const todoSchema = z.object({
    title: z.string().min(1),
    completed: z.boolean().default(false)
})