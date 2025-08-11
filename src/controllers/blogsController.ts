import { Request, response, Response } from "express";
import { ApiResponse } from "../interfaces";
import Blog, { BlogCreationAttributes } from "../models/blogsModel";
import {
  DEFAULT_OFFSET,
  DEFAULT_QUERY_LIMIT,
  DEFAULT_RESPONSE,
  ERRORS,
  STATUS_CODE,
} from "../constants/constants";
import {
  checkIfNotFound,
  checkIfUserCanModifyBlog,
  getArrayFromNumericCSV,
  getDecodedToken,
  getOrderByFromString,
  handleError,
} from "../utils";
import { BLOG_MESSAGES } from "../constants/messages";
import Project from "../models/projectsModel";

export const blogsController = {
  createBlog: async (req: Request, res: Response<ApiResponse<null>>) => {
    const { projectId, userId, title, content }: BlogCreationAttributes =
      req.body;

    let response: ApiResponse<null> = DEFAULT_RESPONSE;

    try {
      await Blog.create({
        projectId: projectId,
        userId: userId,
        title: title,
        content: content,
      });

      response.status_code = STATUS_CODE.CREATED;
      response.message = BLOG_MESSAGES.CREATION_OK;
    } catch (err) {
      response = handleError(err);
    }

    return res.status(response.status_code).json(response);
  },
  getBlogsById: async (
    req: Request,
    res: Response<ApiResponse<Blog | null>>
  ) => {
    const { id } = req.params;

    let response: ApiResponse<Blog | null> = DEFAULT_RESPONSE;

    try {
      const idToFind: Array<string> = getArrayFromNumericCSV(id);
      const blogsInTable = await Blog.findAll({
        where: { id: idToFind },
      });

      checkIfNotFound(blogsInTable);

      response.status_code = STATUS_CODE.OK;
      response.message = BLOG_MESSAGES.GET_OK;
      response.data = blogsInTable;
    } catch (err) {
      response = handleError(err);
    }

    res.status(response.status_code).json(response);
  },
  getAllBlogs: async (
    req: Request,
    res: Response<ApiResponse<Blog | null>>
  ) => {
    let response: ApiResponse<Blog | null> = DEFAULT_RESPONSE;

    const { orderBy } = req.query;
    const { limit } = req.query;
    const { offset } = req.query;

    try {
      const blogsInTable = await Blog.findAll({
        include: {
          model: Project,
          where: {
            deleted: false,
          },
          required: true,
          attributes: [],
        },
        order: getOrderByFromString("blogName", "createdAt", orderBy as string),
        limit: limit ? parseInt(limit as string) : DEFAULT_QUERY_LIMIT,
        offset: offset ? parseInt(offset as string) : DEFAULT_OFFSET,
      });

      checkIfNotFound(blogsInTable);

      response.status_code = STATUS_CODE.OK;
      response.message = BLOG_MESSAGES.GET_OK;
      response.data = blogsInTable;
    } catch (err) {
      response = handleError(err);
    }

    res.status(response.status_code).json(response);
  },
  deleteBlog: async (
    req: Request,
    res: Response<ApiResponse<number | null>>
  ) => {
    let response: ApiResponse<number | null> = DEFAULT_RESPONSE;

    const { id } = req.params;
    const idToFind: Array<string> = getArrayFromNumericCSV(id);

    try {
      const token = getDecodedToken(req.headers.cookie);
      for (const id of idToFind)
        if (!(await checkIfUserCanModifyBlog(token, Number(id))))
          throw new Error(ERRORS.NOT_OWNER_OR_ADMIN);

      const numberOfDeletedBlogs: number = await Blog.destroy({
        where: {
          id: idToFind,
        },
      });
      response.status_code = STATUS_CODE.OK;
      response.message = BLOG_MESSAGES.DELETE_OK;
      response.data = [numberOfDeletedBlogs];
    } catch (err) {
      response = handleError(err);
    }

    res.status(response.status_code).json(response);
  },
  updateBlog: async (
    req: Request,
    res: Response<ApiResponse<number | null>>
  ) => {
    let response: ApiResponse<number | null> = DEFAULT_RESPONSE;

    const { id } = req.params;
    const idToFind: Array<string> = getArrayFromNumericCSV(id);

    try {
      const token = getDecodedToken(req.headers.cookie);
      for (const id of idToFind)
        if (!(await checkIfUserCanModifyBlog(token, Number(id))))
          throw new Error(ERRORS.NOT_OWNER_OR_ADMIN);

      const updatedBlogs = await Blog.update(req.body, {
        where: {
          id: idToFind,
        },
      });
      checkIfNotFound(updatedBlogs);
      response.status_code = STATUS_CODE.OK;
      response.message = BLOG_MESSAGES.UPDATE_OK;
      response.data = [updatedBlogs[0]];
    } catch (err) {
      response = handleError(err);
    }

    res.status(response.status_code).json(response);
  },
};
