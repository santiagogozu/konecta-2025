import RequestsModel from "../models/RequestsModel.js";
import {Op} from "sequelize";

class EmpleadosService {
  async create(request) {
    return (await RequestsModel.create(request)).toJSON();
  }

  async getAll(search = "", pageNumber = 1, limitNumber = 10) {
    const offset = (pageNumber - 1) * limitNumber;

    const whereCondition = search
      ? {
          [Op.or]: [
            {codigo: {[Op.iLike]: `%${search}%`}},
            {descripcion: {[Op.iLike]: `%${search}%`}},
            {resumen: {[Op.iLike]: `%${search}%`}},
          ],
        }
      : {};

    const {count, rows} = await RequestsModel.findAndCountAll({
      where: whereCondition,
      limit: limitNumber,
      offset: offset,
    });

    return {
      requests: rows,
      totalPages: Math.ceil(count / limitNumber),
      currentPage: pageNumber,
    };
  }

  async getById(id) {
    return (await RequestsModel.findOne({where: {id: id}})).toJSON();
  }

  async remove(id) {
    return RequestsModel.destroy({where: {id: id}});
  }
}

export default new EmpleadosService();
