import { Router } from "express";
import { readAll, readOne, create, update, del } from "../controllers/todo.controller";
import { checkTodoId } from "../middlewares/todo.middleware";
import { zodBodyValidator } from "../middlewares/zod.middleware";
import { todoSchema } from "../schemas/todo.schema";

const router = Router()

router.get("/", readAll)
router.post("/", zodBodyValidator(todoSchema), create)

router.use(checkTodoId)

router.get("/:id", readOne)
router.patch("/:id", zodBodyValidator(todoSchema), update)
router.delete("/:id", del)

export default router