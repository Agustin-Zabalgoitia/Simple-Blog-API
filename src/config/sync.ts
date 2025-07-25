import { PRODUCTION } from "../constants/constants";
import Project from "../models/projectsModel";
import sequelize from "./dbConnection";

const models = [Project];

const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to DB has been established successfully.");

    models.forEach((model) => {
      console.log(`${model.name} has been registered.`);
    });

    // If this parameter is TRUE all tables will be destroyed and recreated during initialization.
    // This parameter is TRUE if you are not in production
    await sequelize.sync({ force: process.env.NODE_ENV !== PRODUCTION });
    console.log("All models were synchronized successfully.");
  } catch (err) {
    console.error(
      "An unexpected error has occurred while trying to connect to the DB.",
      err
    );
  }
};

export default syncDatabase;
