import { DataTypes, Model, Optional } from "sequelize";
import { BlogAttributes } from "../interfaces";
import Project from "./projectsModel";
import User from "./userModel";
import sequelize from "../config/dbConnection";

export interface BlogCreationAttributes
  extends Optional<BlogAttributes, "id"> {}

class Blog
  extends Model<BlogAttributes, BlogCreationAttributes>
  implements BlogAttributes
{
  public id!: number;
  public projectId!: number;
  public userId!: number;
  public title: string;
  public content: string;
}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    projectId: {
      type: DataTypes.INTEGER,
      references: {
        model: Project,
        key: "id",
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
  },
  { sequelize, underscored: true }
);

export default Blog;
