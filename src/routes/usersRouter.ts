import { Router } from "express";
import { usersController } from "../controllers/usersController";
import { getAllValidation } from "../validations/getAllValidation";
import { createUserValidation } from "../validations/usersValidations";

const userRouter = Router();

userRouter.post("/", createUserValidation, usersController.createUser);
userRouter.get("/:id", usersController.getUsersById);
userRouter.get("/", getAllValidation, usersController.getAllUsers);
userRouter.delete("/:id", usersController.deleteUser);
userRouter.put("/:id", usersController.updateUser);

export default userRouter;
