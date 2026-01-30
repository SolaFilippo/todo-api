import { Request, Response, NextFunction } from "express"
import { prisma } from "../utils/prisma";

export const checkUserId = async (req: Request, res: Response, next: NextFunction) => {
    const id = String(req.params.id);
    const user = await prisma.user.findUnique({ where: { id }})

    if (!user) {
        return res.status(404).json({ message: "User not found" })
    }

    next()
}