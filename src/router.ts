import { Router } from "express";
import todoRouter from "./routes/todo.router"

const router = Router()

router.use("/todo", todoRouter)

export default router