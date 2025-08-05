import { Router } from "express";
import { projectsController } from "../controllers/projectsController";
import { createProjectValidation } from "../validations/projectsValidations";
import { getAllValidation } from "../validations/getAllValidation";

const projectsRouter = Router();

projectsRouter.post(
  "/",
  createProjectValidation,
  projectsController.createProject
);
projectsRouter.get("/:id", projectsController.getProjectsById);
projectsRouter.get("/", getAllValidation, projectsController.getAllProjects);
projectsRouter.put("/:id", projectsController.updateProject);
projectsRouter.delete("/:id", projectsController.deleteProject);

export default projectsRouter;
