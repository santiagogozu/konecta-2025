import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import UserModel from "../models/UserModel.js";
import EmployeesModel from "../models/EmployeesModel.js";

import RolModel from "../models/RolModel.js";
import dotenv from "dotenv";

dotenv.config();

export const authenticateUser = async (correo, password) => {
  try {
    const user = await UserModel.findOne({
      where: {correo},
      include: [
        {model: RolModel, attributes: ["nombre"]},
        {model: EmployeesModel, attributes: ["id"]},
      ],
    });

    if (!user) {
      return {success: false, message: "Usuario no encontrado"};
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return {success: false, message: "Contraseña incorrecta"};
    }

    const token = jwt.sign(
      {
        correo: user.correo,
        rol: user.RolModel.nombre,
        empleadoId: user.empleadoId,
      },
      process.env.JWT_SECRET,
      {expiresIn: "1d"}
    );
    return {success: true, token, rol: user.RolModel.nombre};
  } catch (error) {
    return {success: false, message: "Error en el servidor", error};
  }
};
