import { Request, Response } from "express";
import { ApiResponse } from "../interfaces";
import Blog, { BlogCreationAttributes } from "../models/blogsModel";
import { DEFAULT_RESPONSE, STATUS_CODE } from "../constants/constants";
import { handleError } from "../utils";
import { BLOG_MESSAGES } from "../constants/messages";

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
      handleError(err);
    }

    return res.status(response.status_code).json(response);
  },
};
