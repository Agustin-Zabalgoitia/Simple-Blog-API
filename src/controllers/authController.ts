import { Response, Request } from "express";
import {
  DEFAULT_RESPONSE,
  PRODUCTION,
  STATUS_CODE,
  TOKEN_DURATION,
  TOKEN_NAME,
} from "../constants/constants";
import { ApiResponse, UserAttributes } from "../interfaces";
import User from "../models/userModel";
import { checkIfNotFound, comparePassword, handleError } from "../utils";
import { error } from "console";
import jwt from "jsonwebtoken";
import { AUTH_MESSAGES, RESPONSE_MESSAGES } from "../constants/messages";
import Role from "../models/rolesModel";

export const authController = {
  login: async (
    req: Request,
    res: Response<ApiResponse<UserAttributes | null>>
  ) => {
    let response = DEFAULT_RESPONSE;

    const { username, password } = req.body;

    try {
      const user = await User.findOne({
        where: { username },
      });

      if (user == null || !(await comparePassword(password, user.password))) {
        throw new Error("Wrong Password");
      }

      const payload = {
        id: user.id,
        roleId: user.roleId,
        username: user.username,
        email: user.email,
      };

      const token = jwt.sign(payload, process.env.SECRET, {
        expiresIn: TOKEN_DURATION,
      });

      res.cookie(TOKEN_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === PRODUCTION,
        sameSite: "strict",
      });

      response.message = AUTH_MESSAGES.SUCCESFUL_LOGIN_MESSAGE;
      response.status_code = STATUS_CODE.OK;
      response.data = [payload];
    } catch (err) {
      response = handleError(err);
    }

    res.status(response.status_code).json(response);
  },
  logout: (req: Request, res: Response<ApiResponse<null>>) => {
    let response = DEFAULT_RESPONSE;

    try {
      res.clearCookie(TOKEN_NAME, {
        httpOnly: true,
        secure: process.env.NODE_ENV === PRODUCTION,
        sameSite: "strict",
      });
      response.message = AUTH_MESSAGES.SUCCESFUL_LOGOUT_MESSAGE;
      response.status_code = STATUS_CODE.OK;
      response.data = [];
    } catch (err) {
      response = handleError(err);
    }

    res.status(response.status_code).json(response);
  },
};
