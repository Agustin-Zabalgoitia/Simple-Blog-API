import express from "express";
import projectsRouter from "./routes/projectsRouter";
import { ROLE_ID, TESTING } from "./constants/constants";
import startServer from "./config/server";
import userRouter from "./routes/usersAdminRouter";
import blogRouter from "./routes/blogsRouter";
import { authRouter } from "./routes/authRouter";
import { validateToken } from "./middleware/auth";
import projectsUserRouter from "./routes/projectsUserRouter";
import blogsUserRouter from "./routes/blogsUserRouter";
import rolesRouter from "./routes/rolesRouter";

const app = express();
const port = process.env.API_PORT;
const apiRouter = express.Router();

app.use(express.json());

app.use("/api", apiRouter);

apiRouter.use("/project", projectsRouter);
apiRouter.use("/blog", blogRouter);
apiRouter.use("/role", rolesRouter);
apiRouter.use("/auth", authRouter);

//Routes for users
apiRouter.use(validateToken([ROLE_ID.ADMIN, ROLE_ID.USER]));

apiRouter.use("/user/project", projectsUserRouter);
apiRouter.use("/user/blog", blogsUserRouter);

//Routes for admins
apiRouter.use(validateToken([ROLE_ID.ADMIN]));

apiRouter.use("/admin/user", userRouter);

if (process.env.NODE_ENV !== TESTING) {
  startServer();
}

export default app;
