import { VALIDATIONS } from "../constants/validations";
import { ORDER_BY } from "../constants/constants";
import { body, query } from "express-validator";

export const createProjectValidation = [
  body("projectName")
    .exists()
    .withMessage("projectName must be provided")
    .isString()
    .withMessage("projectName should be an string")
    .isLength({ min: VALIDATIONS.PROJECT.MIN_LENGHT })
    .withMessage(
      `projectName must be at least ${VALIDATIONS.PROJECT.MIN_LENGHT} characters long`
    ),

  body("description")
    .optional()
    .isString()
    .isLength({ min: VALIDATIONS.DESCRIPTION.MIN_LENGHT })
    .withMessage(
      `description must be at least ${VALIDATIONS.DESCRIPTION.MIN_LENGHT} characters long`
    ),

  body("respositoryUrl").optional().isString(),
];

export const getAllProjectsValidation = [
  query("orderBy")
    .optional()
    .isIn(ORDER_BY)
    .withMessage(`orderBy can only be ${ORDER_BY}`),
  query("limit").optional().isNumeric().withMessage("limit must be a number"),
  query("offset").optional().isNumeric().withMessage("offset must be a number"),
];
