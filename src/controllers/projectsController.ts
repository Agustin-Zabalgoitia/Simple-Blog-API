import { Request, response, Response } from "express";
import { ApiResponse } from "../interfaces";
import Project from "../models/projectsModel";
import {
  DEFAULT_OFFSET,
  DEFAULT_QUERY_LIMIT,
  DEFAULT_RESPONSE,
  STATUS_CODE,
} from "../constants/constants";
import { PROJECT_MESSAGES, RESPONSE_MESSAGES } from "../constants/messages";
import {
  checkIfNotFound,
  getArrayFromNumericCSV,
  getOrderByFromString,
  handleError,
} from "../utils";

export const PROJECTS_ORDER_BY_TYPES = [
  "id",
  "title",
  "status_id",
  "start_date",
  "end_date",
  "expected_end_date",
  "creator_id",
];
export const DEFAULT_PROJECTS_ORDER_BY = "title";
export const DEFAULT_PROJECTS_ORDER = "ASC";
export const DEFAULT_PROJECTS_OFFSET = "0";

type ProjectCreationBodyRequest = {
  projectName: string;
  description: string;
  repositoryUrl: string;
};

export const projectsController = {
  createProject: async (req: Request, res: Response<ApiResponse<null>>) => {
    const {
      projectName,
      description,
      repositoryUrl,
    }: ProjectCreationBodyRequest = req.body;

    let response: ApiResponse<null> = {
      status_code: STATUS_CODE.BAD_REQUEST,
      message: RESPONSE_MESSAGES.GENERIC_ERROR_MESSAGE,
      data: [],
    };

    try {
      const p1 = await Project.create({
        projectName: projectName,
        description: description,
        repositoryUrl: repositoryUrl,
      });

      response.status_code = STATUS_CODE.CREATED;
      response.message = PROJECT_MESSAGES.CREATION_OK;
    } catch (err) {
      handleError(err);
    }

    return res.status(response.status_code).json(response);
  },
  getProjectsById: async (
    req: Request,
    res: Response<ApiResponse<Project | null>>
  ) => {
    const { id } = req.params;

    let response: ApiResponse<Project | null> = {
      status_code: STATUS_CODE.INTERNAL_SERVER_ERROR,
      message: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR,
      data: [],
    };

    try {
      const idToFind: Array<string> = getArrayFromNumericCSV(id);
      const projectsInTable = await Project.findAll({
        where: { id: idToFind },
      });
      checkIfNotFound(projectsInTable);
      response.status_code = STATUS_CODE.OK;
      response.message = PROJECT_MESSAGES.GET_OK;
      response.data = projectsInTable;
    } catch (err) {
      console.log(err);
    }

    res.status(response.status_code).json(response);
  },
  getAllProjects: async (
    req: Request,
    res: Response<ApiResponse<Project | null>>
  ) => {
    let response: ApiResponse<Project | null> = DEFAULT_RESPONSE;

    const { orderBy } = req.query;
    const { limit } = req.query;
    const { offset } = req.query;

    try {
      const projectsInTable = await Project.findAll({
        order: getOrderByFromString(
          "projectName",
          "createdAt",
          orderBy as string
        ),
        limit: limit ? parseInt(limit as string) : DEFAULT_QUERY_LIMIT,
        offset: offset ? parseInt(offset as string) : DEFAULT_OFFSET,
      });
      response.status_code = STATUS_CODE.OK;
      response.message = PROJECT_MESSAGES.GET_OK;
      response.data = projectsInTable;
    } catch (err) {
      handleError(err);
    }

    res.status(response.status_code).json(response);
  },
  deleteProject: async (
    req: Request,
    res: Response<ApiResponse<number | null>>
  ) => {
    let response: ApiResponse<number | null> = DEFAULT_RESPONSE;

    const { id } = req.params;

    const idToFind: Array<string> = getArrayFromNumericCSV(id);

    try {
      const numberOfDeletedProjects: number = await Project.destroy({
        where: {
          id: idToFind,
        },
      });
      response.status_code = STATUS_CODE.OK;
      response.message = PROJECT_MESSAGES.DELETE_OK;
      response.data = [numberOfDeletedProjects];
    } catch (err) {
      handleError(err);
    }

    res.status(response.status_code).json(response);
  },
  updateProject: async (
    req: Request,
    res: Response<ApiResponse<number | null>>
  ) => {
    let response: ApiResponse<number | null> = DEFAULT_RESPONSE;

    const { id } = req.params;
    const idToFind: Array<string> = getArrayFromNumericCSV(id);

    try {
      const updatedProjects = await Project.update(req.body, {
        where: {
          id: idToFind,
        },
      });
      response.status_code = STATUS_CODE.OK;
      response.message = PROJECT_MESSAGES.UPDATE_OK;
      response.data = [updatedProjects[0]];
    } catch (err) {
      handleError(err);
    }

    res.status(response.status_code).json(response);
  },
};
