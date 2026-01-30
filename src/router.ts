import { Router } from "express";
import todoRouter from "./routes/todo.router"
import userRouter from "./routes/user.router"

const router = Router()

router.use("/todo", todoRouter)
router.use("/user", userRouter)

export default router