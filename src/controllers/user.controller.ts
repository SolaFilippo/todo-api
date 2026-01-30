import { prisma } from "../utils/prisma"
import { userSchema } from "../schemas/user.schema"
import { Request, Response } from "express"

export const createUser =  async (req: Request, res: Response) => {
    const body = userSchema.parse(req.body)

    const newUser = await prisma.user.create({
        data: {
            ...body
        }
    })

    return res.json(newUser)
}

export const readAllUsers = async (req: Request, res: Response) => {
    const users = await prisma.user.findMany()
    return res.json(users)
}

export const readOneUser = async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const user = await prisma.user.findUnique({ where: { id } })
    return res.json(user)
}

export const updateUser = async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const body = userSchema.partial().parse(req.body)

    const user = await prisma.user.update({
        where: { id }, data: {
            ...body
        }
    })

    return res.json(user)
}

export const delUser = async (req: Request, res: Response) => {
    const id = String(req.params.id);

    const user = await prisma.user.delete({ where: { id }})
    return res.json(user);
}