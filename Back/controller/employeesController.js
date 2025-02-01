import employeesService from "../service/employeesService.js";

export const create = async (req, res) => {
  try {
    const employee = await employeesService.create(req.body);
    res.json({data: employee});
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Ocurrio un error al crear empleado"});
  }
};

export const list = async (req, res) => {
  try {
    const {page = 1, limit = 10, search = ""} = req.query;

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    const employeesList = await employeesService.getAll(
      search,
      pageNumber,
      limitNumber
    );

    res.json(employeesList);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({error: "Ocurrió un error al consultar los empleados"});
  }
};

export const getById = async (req, res) => {
  try {
    const employee = await employeesService.getById(req.params.id);
    res.json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Ocurrio un error al consultar el empleado"});
  }
};
