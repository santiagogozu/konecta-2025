import EmployeeModel from "../models/EmployeesModel.js";
import {Op} from "sequelize";

class EmployeesService {
  async create(employee) {
    return (await EmployeeModel.create(employee)).toJSON();
  }

  async getAll(search = "", pageNumber = 1, limitNumber = 10) {
    const offset = (pageNumber - 1) * limitNumber;
    const whereCondition = search
      ? {
          [Op.or]: [{nombre: {[Op.iLike]: `%${search}%`}}],
        }
      : {};

    const {count, rows} = await EmployeeModel.findAndCountAll({
      where: whereCondition,
      limit: limitNumber,
      offset: offset,
    });
    return {
      employees: rows,
      totalPages: Math.ceil(count / limitNumber),
      currentPage: pageNumber,
    };
  }

  async getById(id) {
    return (await EmployeeModel.findOne({where: {id: id}})).toJSON();
  }
}

export default new EmployeesService();
