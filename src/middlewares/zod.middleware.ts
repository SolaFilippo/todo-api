import * as z from "zod"
import { Request, Response, NextFunction } from "express"

export const zodBodyValidator = (schema: z.ZodObject<any, any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const body = req.method === "PATCH" ? schema.partial().parse(req.body) : schema.parse(req.body)
            req.body = body
            next()
        } catch (err) {
            if (err instanceof z.ZodError) {
                return res.status(400).json({ message: "Incorrect fields: " + zodErrorBuilderHelper(err) })
            }
        }
    }
}

const zodErrorBuilderHelper = (err: z.ZodError) => {
    const messageError = JSON.parse(err.message)
    return messageError.map((i: any) => i.path).join(", ")
}

