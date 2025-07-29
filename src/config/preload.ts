import Blog from "../models/blogsModel";
import Project from "../models/projectsModel";
import User from "../models/userModel";
import blogsDummyData from "../preloadedData/blogsData";
import projectsDummyData from "../preloadedData/projectsData";
import usersDummyData from "../preloadedData/usersData";

export default async function preloadDummyData() {
  console.log("Preloading dummy data...");

  await Project.bulkCreate(projectsDummyData);
  await User.bulkCreate(usersDummyData);
  await Blog.bulkCreate(blogsDummyData);

  console.log("Dummy data preloaded successfully.");
}
