import { Router } from "express";
import { getAllValidation } from "../validations/getAllValidation";
import { rolesController } from "../controllers/rolesController";

const rolesRouter = Router();

rolesRouter.get("/", getAllValidation, rolesController.getAllRoles);

export default rolesRouter;
