import { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import { validateResult } from "../middleware/validationMiddleware";

export const loginValidation = [
  body("username")
    .exists()
    .withMessage("username must be provided")
    .isString()
    .withMessage("username must be a string"),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];
