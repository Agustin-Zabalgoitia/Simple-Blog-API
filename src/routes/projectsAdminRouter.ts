import { Router } from "express";
import { projectsController } from "../controllers/projectsController";
import { createProjectValidation } from "../validations/projectsValidations";
import { getAllValidation } from "../validations/getAllValidation";

const projectsAdminRouter = Router();

projectsAdminRouter.get(
  "/",
  getAllValidation,
  projectsController.getAllProjectsAdmin
);

export default projectsAdminRouter;
