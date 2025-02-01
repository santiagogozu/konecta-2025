import SequelizeMock from "sequelize-mock";
import RequestsModel from "../models/RequestsModel.js";

const dbMock = new SequelizeMock();
const RequestMock = dbMock.define("solicitud", {
  id: 1,
  codigo: "REQ123",
  descripcion: "Solicitud de prueba",
  resumen: "Resumen de la solicitud",
  empleadoId: 2,
});

describe("RequestsModel", () => {
  it("debería crear una solicitud correctamente", async () => {
    const request = await RequestMock.create({
      codigo: "REQ123",
      descripcion: "Solicitud de prueba",
      resumen: "Resumen de la solicitud",
      empleadoId: 2,
    });

    expect(request.codigo).toBe("REQ123");
    expect(request.descripcion).toBe("Solicitud de prueba");
    expect(request.resumen).toBe("Resumen de la solicitud");
    expect(request.empleadoId).toBe(2);
  });

  it("debería tener una clave primaria en id", () => {
    expect(RequestsModel.primaryKeyAttribute).toBe("id");
  });
});
