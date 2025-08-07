import { Router } from "express";
import { projectsController } from "../controllers/projectsController";
import { createProjectValidation } from "../validations/projectsValidations";
import { getAllValidation } from "../validations/getAllValidation";

const projectsUserRouter = Router();

projectsUserRouter.post(
  "/",
  createProjectValidation,
  projectsController.createProject
);
projectsUserRouter.put("/:id", projectsController.updateProject);
projectsUserRouter.delete("/:id", projectsController.deleteProject);

export default projectsUserRouter;
