import {DataTypes} from "sequelize";
import db from "../config/database.js";

const RequestsModel = db.define(
  "RequestModel",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    codigo: {type: DataTypes.STRING, allowNull: false},
    descripcion: {type: DataTypes.STRING, allowNull: false},
    resumen: {type: DataTypes.STRING, allowNull: false},
    empleadoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "empleados",
        key: "id",
      },
    },
  },
  {
    tableName: "solicitud",
    timestamps: false,
  }
);

export default RequestsModel;
