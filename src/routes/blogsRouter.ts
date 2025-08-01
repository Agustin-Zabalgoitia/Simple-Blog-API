import { Router } from "express";
import { blogsController } from "../controllers/blogsController";

const blogRouter = Router();

blogRouter.post("/", blogsController.createBlog);
blogRouter.get("/:id", blogsController.getBlogsById);
blogRouter.get("/", blogsController.getAllBlogs);
blogRouter.delete("/:id", blogsController.deleteBlog);
blogRouter.put("/:id", blogsController.updateBlog);

export default blogRouter;
