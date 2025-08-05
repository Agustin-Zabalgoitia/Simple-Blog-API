import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "./../interfaces";
import { STATUS_CODE } from "../constants/constants";

export const validateResult = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (error) {
    const response: ApiResponse<null> = {
      status_code: STATUS_CODE.BAD_REQUEST,
      message: "Bad Request",
      data: error.array(),
    };

    res.status(response.status_code).json(response);
  }
};
