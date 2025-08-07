import {
  DEFAULT_OFFSET,
  DEFAULT_QUERY_LIMIT,
  DEFAULT_RESPONSE,
  SALT_ROUNDS,
  STATUS_CODE,
} from "../constants/constants";
import { ApiResponse } from "../interfaces";
import { Request, Response } from "express";
import User, { UserCreationAttributes } from "../models/userModel";
import {
  checkIfNotFound,
  getArrayFromNumericCSV,
  getOrderByFromString,
  handleError,
} from "../utils";
import { USER_MESSAGES } from "../constants/messages";
import bcrypt from "bcrypt";

export const usersController = {
  createUser: async (req: Request, res: Response<ApiResponse<null>>) => {
    let response: ApiResponse<null> = DEFAULT_RESPONSE;

    const { username, roleId, password, email }: UserCreationAttributes =
      req.body;

    try {
      const hash = await bcrypt.hash(password, SALT_ROUNDS);
      await User.create({
        username: username,
        roleId: roleId,
        password: hash,
        email: email,
      });

      response.message = USER_MESSAGES.CREATION_OK;
      response.status_code = STATUS_CODE.CREATED;
      response.data = [];
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
  getAllUsers: async (
    req: Request,
    res: Response<ApiResponse<User | null>>
  ) => {
    let response: ApiResponse<User | null> = DEFAULT_RESPONSE;

    const { orderBy } = req.query;
    const { limit } = req.query;
    const { offset } = req.query;

    try {
      const usersInTable = await User.findAll({
        order: getOrderByFromString("username", "createdAt", orderBy as string),
        limit: limit ? parseInt(limit as string) : DEFAULT_QUERY_LIMIT,
        offset: offset ? parseInt(offset as string) : DEFAULT_OFFSET,
      });

      checkIfNotFound(usersInTable);

      response.status_code = STATUS_CODE.OK;
      response.message = USER_MESSAGES.CREATION_OK;
      response.data = usersInTable;
    } catch (err) {
      response = handleError(err);
    }

    res.status(response.status_code).json(response);
  },
  deleteUser: async (
    req: Request,
    res: Response<ApiResponse<number | null>>
  ) => {
    let response: ApiResponse<number | null> = DEFAULT_RESPONSE;

    const { id } = req.params;

    const idToFind: Array<string> = getArrayFromNumericCSV(id);

    try {
      const numberOfDeletedUsers: number = await User.destroy({
        where: {
          id: idToFind,
        },
      });
      response.status_code = STATUS_CODE.OK;
      response.message = USER_MESSAGES.DELETE_OK;
      response.data = [numberOfDeletedUsers];
    } catch (err) {
      response = handleError(err);
    }

    res.status(response.status_code).json(response);
  },
  updateUser: async (
    req: Request,
    res: Response<ApiResponse<number | null>>
  ) => {
    let response: ApiResponse<number | null> = DEFAULT_RESPONSE;

    const { id } = req.params;
    const idToFind: Array<string> = getArrayFromNumericCSV(id);

    if (req.body.password)
      req.body.password = await bcrypt.hash(req.body.password, SALT_ROUNDS);

    try {
      const updatedUsers = await User.update(req.body, {
        where: {
          id: idToFind,
        },
      });

      checkIfNotFound(updatedUsers);

      response.status_code = STATUS_CODE.OK;
      response.message = USER_MESSAGES.UPDATE_OK;
      response.data = [updatedUsers[0]];
    } catch (err) {
      response = handleError(err);
    }

    res.status(response.status_code).json(response);
  },
};
