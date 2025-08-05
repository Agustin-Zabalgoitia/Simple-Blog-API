import { query } from "express-validator";
import { ORDER_BY } from "../constants/constants";
import { validateResult } from "../middleware/validationMiddleware";
import { Response, Request, NextFunction } from "express";

export const getAllValidation = [
  query("orderBy")
    .optional()
    .isIn(ORDER_BY)
    .withMessage(`orderBy can only be ${ORDER_BY}`),
  query("limit").optional().isNumeric().withMessage("limit must be a number"),
  query("offset").optional().isNumeric().withMessage("offset must be a number"),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];
