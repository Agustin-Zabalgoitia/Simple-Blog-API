import { Router } from "express";
import { blogsController } from "../controllers/blogsController";

const blogRouter = Router();

blogRouter.post("/", blogsController.createBlog);

export default blogRouter;
