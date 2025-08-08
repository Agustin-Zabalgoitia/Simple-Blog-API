import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../interfaces";
import { AUTH_MESSAGES, RESPONSE_MESSAGES } from "../constants/messages";
import { ERRORS, STATUS_CODE, TOKEN_NAME } from "../constants/constants";
import jwt from "jsonwebtoken";
import { handleError, isValidUser } from "../utils";

export const validateToken = (allowedRolesIds: Array<number>) => {
  return async function validateToken(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    let response: ApiResponse<null> = {
      message: AUTH_MESSAGES.INVALID_TOKEN_MESSAGE,
      status_code: STATUS_CODE.UNAUTHORIZED,
      data: [],
    };

    const tokenWithPrefix = req.headers.cookie;

    try {
      if (!tokenWithPrefix) throw new Error(ERRORS.NOT_LOGGED_IN);

      const tokenAndPrefix = tokenWithPrefix.split("=");
      const prefix = tokenAndPrefix[0];
      const tokenWithoutPrefix = tokenAndPrefix[1];

      if (prefix !== TOKEN_NAME) throw new Error(ERRORS.INVALID_TOKEN);

      const decoded = jwt.verify(tokenWithoutPrefix, process.env.SECRET);
      if (typeof decoded !== "object") throw new Error(ERRORS.INVALID_TOKEN);
      if (
        allowedRolesIds.includes(decoded.roleId) &&
        !(await isValidUser(decoded.id))
      ) {
        return next();
      } else {
        response.message = AUTH_MESSAGES.FORBIDDEN;
        response.status_code = STATUS_CODE.FORBIDDEN;
      }
    } catch (err) {
      response = handleError(err);
    }

    res.status(response.status_code).json(response);
  };
};
