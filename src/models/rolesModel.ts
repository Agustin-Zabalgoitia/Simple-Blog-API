import { DataTypes, Model, Optional } from "sequelize";
import { RoleAttributes } from "../interfaces";
import sequelize from "../config/dbConnection";

export interface RoleCreationAttributes
  extends Optional<RoleAttributes, "id"> {}

class Role
  extends Model<RoleAttributes, RoleCreationAttributes>
  implements RoleAttributes
{
  public id!: number;
  public name!: string;
}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  { sequelize, underscored: true }
);

export default Role;
