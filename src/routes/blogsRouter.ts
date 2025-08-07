import { Router } from "express";
import { blogsController } from "../controllers/blogsController";
import { getAllValidation } from "../validations/getAllValidation";

const blogRouter = Router();

blogRouter.get("/:id", blogsController.getBlogsById);
blogRouter.get("/", getAllValidation, blogsController.getAllBlogs);

export default blogRouter;
