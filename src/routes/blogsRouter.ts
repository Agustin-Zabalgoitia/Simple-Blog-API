import { Router } from "express";
import { blogsController } from "../controllers/blogsController";
import { getAllValidation } from "../validations/getAllValidation";
import { createBlogValidation } from "../validations/blogsValidation";

const blogRouter = Router();

blogRouter.post("/", createBlogValidation, blogsController.createBlog);
blogRouter.get("/:id", blogsController.getBlogsById);
blogRouter.get("/", getAllValidation, blogsController.getAllBlogs);
blogRouter.delete("/:id", blogsController.deleteBlog);
blogRouter.put("/:id", blogsController.updateBlog);

export default blogRouter;
