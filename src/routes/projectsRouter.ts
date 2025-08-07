import { Router } from "express";
import { projectsController } from "../controllers/projectsController";
import { getAllValidation } from "../validations/getAllValidation";

const projectsRouter = Router();

projectsRouter.get("/:id", projectsController.getProjectsById);
projectsRouter.get("/", getAllValidation, projectsController.getAllProjects);

export default projectsRouter;
