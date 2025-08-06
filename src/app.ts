import express from "express";
import projectsRouter from "./routes/projectsRouter";
import { TESTING } from "./constants/constants";
import startServer from "./config/server";
import userRouter from "./routes/usersRouter";
import blogRouter from "./routes/blogsRouter";
import { authRouter } from "./routes/authRouter";

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
apiRouter.use("/auth", authRouter);

if (process.env.NODE_ENV !== TESTING) {
  startServer();
}

export default app;
