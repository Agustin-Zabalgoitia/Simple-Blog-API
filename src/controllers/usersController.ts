import { DEFAULT_RESPONSE, STATUS_CODE } from "../constants/constants";
import { ApiResponse } from "../interfaces";
import { Request, Response } from "express";
import User, { UserCreationAttributes } from "../models/userModel";
import { checkIfNotFound, getArrayFromNumericCSV, handleError } from "../utils";
import { USER_MESSAGES } from "../constants/messages";

export const usersController = {
  createUser: async (req: Request, res: Response<ApiResponse<null>>) => {
    let response: ApiResponse<null> = DEFAULT_RESPONSE;

    const { username, password, email }: UserCreationAttributes = req.body;

    try {
      await User.create({
        username: username,
        password: password,
        email: email,
      });

      response.message = USER_MESSAGES.CREATION_OK;
      response.status_code = STATUS_CODE.CREATED;
    } catch (err) {
      response = handleError(err);
    }

    res.status(response.status_code).json(response);
  },
  getUsersById: async (
    req: Request,
    res: Response<ApiResponse<User | null>>
  ) => {
    let response: ApiResponse<User | null> = DEFAULT_RESPONSE;

    const { id } = req.params;

    const idToFind = getArrayFromNumericCSV(id);

    try {
      const usersInTable = await User.findAll({
        where: { id: idToFind },
      });
      checkIfNotFound(usersInTable);

      response.status_code = STATUS_CODE.OK;
      response.message = USER_MESSAGES.GET_OK;
      response.data = usersInTable;
    } catch (err) {
      response = handleError(err);
    }

    res.status(response.status_code).json(response);
  },
};
