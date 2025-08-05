import { Router } from "express";
import { projectsController } from "../controllers/projectsController";
import {
  createProjectValidation,
  getAllProjectsValidation,
} from "../validations/projectsValidations";

const projectsRouter = Router();

projectsRouter.post(
  "/",
  createProjectValidation,
  projectsController.createProject
);
projectsRouter.get("/:id", projectsController.getProjectsById);
projectsRouter.get(
  "/",
  getAllProjectsValidation,
  projectsController.getAllProjects
);
projectsRouter.put("/:id", projectsController.updateProject);
projectsRouter.delete("/:id", projectsController.deleteProject);

export default projectsRouter;
