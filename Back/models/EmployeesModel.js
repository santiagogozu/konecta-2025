import {DataTypes} from "sequelize";
import db from "../config/database.js";
const EmployeesModel = db.define(
  "EmployeesModel",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    fecha_ingreso: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "empleados",
    timestamps: false,
  }
);

export default EmployeesModel;
