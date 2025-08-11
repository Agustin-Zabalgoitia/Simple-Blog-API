import { DataTypes, Model, Optional } from "sequelize";
import { ProjectAttributes } from "../interfaces";
import sequelize from "../config/dbConnection";

export interface ProjectCreationAtributes
  extends Optional<ProjectAttributes, "id"> {}

class Project
  extends Model<ProjectAttributes, ProjectCreationAtributes>
  implements ProjectAttributes
{
  public id!: number;
  public projectName!: string;
  public description?: string;
  public repositoryUrl?: string;
  public deleted!: boolean;
}

Project.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    projectName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    repositoryUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  { sequelize, underscored: true }
);

export default Project;
