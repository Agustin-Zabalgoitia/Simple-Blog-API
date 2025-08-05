import { VALIDATIONS } from "../constants/validations";
import { body } from "express-validator";
import { validateResult } from "../middleware/validationMiddleware";
import { Request, Response, NextFunction } from "express";

export const createProjectValidation = [
  body("projectName")
    .exists()
    .withMessage("projectName must be provided")
    .isString()
    .withMessage("projectName should be an string")
    .isLength({ min: VALIDATIONS.PROJECT.PROJECTNAME_MIN_LENGHT })
    .withMessage(
      `projectName must be at least ${VALIDATIONS.PROJECT.PROJECTNAME_MIN_LENGHT} characters long`
    ),

  body("description")
    .optional()
    .isString()
    .isLength({ min: VALIDATIONS.PROJECT.DESCRIPTION_MIN_LENGHT })
    .withMessage(
      `description must be at least ${VALIDATIONS.PROJECT.DESCRIPTION_MIN_LENGHT} characters long`
    ),

  body("respositoryUrl").optional().isString(),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];
