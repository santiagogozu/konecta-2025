import {DataTypes} from "sequelize";
import db from "../config/database.js";

const RolModel = db.define(
  "RolModel",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "rol",
    timestamps: false,
  }
);

export default RolModel;
