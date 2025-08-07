import { Router } from "express";
import { authController } from "../controllers/authController";
import { loginValidation } from "../validations/authValidation";

export const authRouter = Router();

authRouter.post("/login", loginValidation, authController.login);
authRouter.post("/logout", authController.logout);
