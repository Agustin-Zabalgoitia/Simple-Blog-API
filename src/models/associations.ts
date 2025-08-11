import Blog from "./blogsModel";
import Project from "./projectsModel";
import User from "./userModel";

export const defineAssociations = () => {
  User.hasMany(Blog, {
    foreignKey: "userId",
    sourceKey: "id",
  });

  Project.hasMany(Blog, {
    foreignKey: "projectId",
    sourceKey: "id",
  });

  Blog.belongsTo(User, {
    foreignKey: "userId",
    targetKey: "id",
  });

  Blog.belongsTo(Project, {
    foreignKey: "projectId",
    targetKey: "id",
  });
};

export default defineAssociations;
