import { prisma } from "../utils/prisma"
import { todoSchema } from "../schemas/todo.schema"
import { Request, Response } from "express"

export const create =  async (req: Request, res: Response) => {
    const body = todoSchema.parse(req.body)

    const newTodo = await prisma.todo.create({
        data: {
            ...body
        }
    })

    return res.json(newTodo)
}

export const readAll = async (req: Request, res: Response) => {
    const todos = await prisma.todo.findMany()
    return res.json(todos)
}

export const readOne = async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const todo = await prisma.todo.findFirst({ where: { id } })
    return res.json(todo)
}

export const update = async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const body = todoSchema.partial().parse(req.body)

    const todo = await prisma.todo.update({
        where: { id }, data: {
            ...body
        }
    })

    return res.json(todo)
}

export const del = async (req: Request, res: Response) => {
    const id = String(req.params.id);

    const todo = await prisma.todo.delete({ where: { id }})
    return res.json(todo);
}