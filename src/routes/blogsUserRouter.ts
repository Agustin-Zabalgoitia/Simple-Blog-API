import { Router } from "express";
import { blogsController } from "../controllers/blogsController";
import { createBlogValidation } from "../validations/blogsValidation";

const blogUserRouter = Router();

blogUserRouter.post("/", createBlogValidation, blogsController.createBlog);
blogUserRouter.delete("/:id", blogsController.deleteBlog);
blogUserRouter.put("/:id", blogsController.updateBlog);

export default blogUserRouter;
