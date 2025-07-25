import Project from "../models/projectsModel";
import projectsDummyData from "../preloadedData/projectsData";

export default async function preloadDummyData() {
  console.log("Preloading dummy data...");

  await Project.bulkCreate(projectsDummyData);

  console.log("Dummy data preloaded successfully.");
}
