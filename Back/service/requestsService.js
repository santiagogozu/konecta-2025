import RequestsModel from "../models/RequestsModel.js";

class EmpleadosService {
  async create(request) {
    return (await RequestsModel.create(request)).toJSON();
  }

  async getAll() {
    return RequestsModel.findAll();
  }

  async getById(id) {
    return (await RequestsModel.findOne({where: {id: id}})).toJSON();
  }

  async remove(id) {
    return RequestsModel.destroy({where: {id: id}});
  }
}

export default new EmpleadosService();
