import { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import { validateResult } from "../middleware/validationMiddleware";

export const createBlogValidation = [
  body("projectId")
    .exists()
    .withMessage("projectId must be provided")
    .isNumeric()
    .withMessage("projectId must be a number"),

  body("userId")
    .exists()
    .withMessage("userId must be provided")
    .isNumeric()
    .withMessage("userId must be a number"),

  body("title")
    .exists()
    .withMessage("title must be provided")
    .isString()
    .withMessage("title must be a string"),

  body("content")
    .exists()
    .withMessage("content must be provided")
    .isString()
    .withMessage("content must be a string"),

  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];
