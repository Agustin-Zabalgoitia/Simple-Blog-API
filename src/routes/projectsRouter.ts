import { Router } from "express";
import { projectsController } from "../controllers/projectsController";

const projectsRouter = Router();

projectsRouter.post("/", projectsController.createProject);
projectsRouter.get("/:id", projectsController.getProjectsById);
projectsRouter.get("/", projectsController.getAllProjects);
projectsRouter.put("/:id", projectsController.updateProject);
projectsRouter.delete("/:id", projectsController.deleteProject);

export default projectsRouter;
