import {DataTypes} from "sequelize";
import db from "../config/database.js";
import EmployeesModel from "./EmployeesModel.js";
import RolModel from "./RolModel.js";

const UserModel = db.define(
  "UserModel",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rolId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: RolModel,
        key: "id",
      },
    },
    empleadoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: EmployeesModel,
        key: "id",
      },
    },
  },
  {
    tableName: "usuarios",
    timestamps: false,
  }
);

// Definir relaciones
UserModel.belongsTo(RolModel, {foreignKey: "rolId"});
UserModel.belongsTo(EmployeesModel, {foreignKey: "empleadoId"});

export default UserModel;
