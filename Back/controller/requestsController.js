import requestsService from "../service/requestsService.js";

export const create = async (req, res) => {
  try {
    const requests = await requestsService.create(req.body);
    res.json({data: requests});
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Ocurrio un error al crear la solicitud"});
  }
};

export const list = async (_req, res) => {
  try {
    const requestsList = await requestsService.getAll();
    res.json({data: requestsList});
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({error: "Ocurrio un error al consultar las solicitudes"});
  }
};

export const getById = async (req, res) => {
  try {
    const request = await requestsService.getById(req.params.id);
    res.json(request);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Ocurrio un error al consultar la solicitud"});
  }
};

export const remove = async (req, res) => {
  try {
    await requestsService.remove(req.params.id);
    res.json({data: {success: true}});
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Ocurrio un error al eliminar la solicitud"});
  }
};
