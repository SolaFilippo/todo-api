import { Request, Response, NextFunction } from "express"
import { prisma } from "../utils/prisma";

export const checkTodoId = async (req: Request, res: Response, next: NextFunction) => {
    const id = String(req.params.id);
    const todo = await prisma.todo.findUnique({ where: { id }})

    if (!todo) {
        return res.status(404).json({ message: "Todo not found" })
    }

    next()
}