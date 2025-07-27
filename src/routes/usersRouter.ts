import { Router } from "express";
import { usersController } from "../controllers/usersController";

const userRouter = Router();

userRouter.post("/", usersController.createUser);
userRouter.get("/:id", usersController.getUsersById);

export default userRouter;
