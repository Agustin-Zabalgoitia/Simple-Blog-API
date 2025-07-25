import { Server } from "http";
import syncDatabase from "./sync";
import app from "../app";
import { DEVELOPMENT } from "../constants/constants";
import preloadDummyData from "./preload";

export default async function startServer() {
  const domain = process.env.API_DOMAIN;
  const port = process.env.API_PORT;

  await syncDatabase();

  // If the environment is DEVELOPMENT, then some dummy data is pre-loaded
  if (process.env.NODE_ENV === DEVELOPMENT) preloadDummyData();
  else
    console.log(
      "Non development environment detected. Skipping data pre-loading."
    );

  return new Promise<Server>((resolve, reject) => {
    const server = app.listen(port, () => {
      console.log(`Server running at ${domain}:${port}/`);
      resolve(server);
    });
    server.on("error", reject);
  });
}
