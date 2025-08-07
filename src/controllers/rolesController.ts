import { Request, Response } from "express";
import { ApiResponse } from "../interfaces";
import Role from "../models/rolesModel";
import {
  DEFAULT_OFFSET,
  DEFAULT_QUERY_LIMIT,
  DEFAULT_RESPONSE,
  STATUS_CODE,
} from "../constants/constants";
import { checkIfNotFound, getOrderByFromString, handleError } from "../utils";
import { ROLE_MESSAGES } from "../constants/messages";

export const rolesController = {
  getAllRoles: async (
    req: Request,
    res: Response<ApiResponse<Role | null>>
  ) => {
    let response = DEFAULT_RESPONSE;

    const { orderBy } = req.query;
    const { limit } = req.query;
    const { offset } = req.query;

    try {
      const rolesInTable = await Role.findAll({
        order: getOrderByFromString("name", "createdAt", orderBy as string),
        limit: limit ? parseInt(limit as string) : DEFAULT_QUERY_LIMIT,
        offset: offset ? parseInt(offset as string) : DEFAULT_OFFSET,
      });

      checkIfNotFound(rolesInTable);

      response.status_code = STATUS_CODE.OK;
      response.message = ROLE_MESSAGES.CREATION_OK;
      response.data = rolesInTable;
    } catch (err) {
      response = handleError(err);
    }

    res.status(response.status_code).json(response);
  },
};
