import Project from "../models/projectsModel";
import User from "../models/userModel";
import projectsDummyData from "../preloadedData/projectsData";
import usersDummyData from "../preloadedData/usersData";

export default async function preloadDummyData() {
  console.log("Preloading dummy data...");

  await Project.bulkCreate(projectsDummyData);
  await User.bulkCreate(usersDummyData);

  console.log("Dummy data preloaded successfully.");
}
