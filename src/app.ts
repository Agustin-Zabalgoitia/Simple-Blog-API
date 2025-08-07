import express from "express";
import projectsRouter from "./routes/projectsRouter";
import { ROLE_NAMES, TESTING } from "./constants/constants";
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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());

app.use("/api", apiRouter);

apiRouter.use("/project", projectsRouter);
apiRouter.use("/user", userRouter);
apiRouter.use("/blog", blogRouter);
apiRouter.use("/role", rolesRouter);
apiRouter.use("/auth", authRouter);

//Routes for users
apiRouter.use(validateToken([ROLE_NAMES.USER]));

apiRouter.use("/user/projects", projectsUserRouter);
apiRouter.use("/user/blogs", blogsUserRouter);

if (process.env.NODE_ENV !== TESTING) {
  startServer();
}

export default app;
