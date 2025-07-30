import { Router } from "express";
import { blogsController } from "../controllers/blogsController";

const blogRouter = Router();

blogRouter.post("/", blogsController.createBlog);
blogRouter.get("/:id", blogsController.getBlogsById);

export default blogRouter;
