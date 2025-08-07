import { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import { validateResult } from "../middleware/validationMiddleware";
import { VALIDATIONS } from "../constants/validations";
import { isEmail } from "../utils";

export const createUserValidation = [
  body("username")
    .exists()
    .withMessage("username must be provided")
    .isLength({ min: VALIDATIONS.USER.USERNAME_MIN_LENGHT })
    .withMessage(
      `username must be at least ${VALIDATIONS.USER.USERNAME_MIN_LENGHT} characters long`
    ),
  body("roleId")
    .exists()
    .withMessage("roleId must be provided")
    .isNumeric()
    .withMessage("roleId must be a valid number"),
  body("password").exists().withMessage("password must be provided"),
  body("email")
    .optional()
    .isString()
    .withMessage("email must be a string")
    .custom((value: string) => {
      return isEmail(value);
    })
    .withMessage("email must be a valid address"),
  body("email").optional().isString(),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];
