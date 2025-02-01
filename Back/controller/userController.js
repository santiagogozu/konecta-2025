import bcrypt from "bcryptjs";
import employeesService from "../service/employeesService.js";
import userService from "../service/userService.js";

export const create = async (req, res) => {
  try {
    const encryptedPassword = await bcrypt.hash(req.body.password, 10);

    const employee = {
      fecha_ingreso: req.body.fecha_ingreso,
      nombre: req.body.nombre,
      salario: req.body.salario,
    };
    const nuevoEmpleado = await employeesService.create(employee);
    const user = {
      correo: req.body.correo,
      password: encryptedPassword,
      rolId: req.body.rolId,
      empleadoId: nuevoEmpleado.id,
    };
    await userService.create(user);
    res.status(200).json({message: "El usuario ha sido creado con éxito"});
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Ocurrio un error al crear empleado"});
  }
};
