import { Router } from "express";
import { readAllUsers , readOneUser, createUser, updateUser, delUser } from "../controllers/user.controller";
import { checkUserId } from "../middlewares/user.middleware";
import { zodBodyValidator } from "../middlewares/zod.middleware";
import { userSchema } from "../schemas/user.schema";

const router = Router()

router.get("/", readAllUsers)
router.post("/", zodBodyValidator(userSchema), createUser)

router.get("/:id", checkUserId, readOneUser)
router.patch("/:id", checkUserId, zodBodyValidator(userSchema.partial()), updateUser)
router.delete("/:id", checkUserId, delUser)

export default router