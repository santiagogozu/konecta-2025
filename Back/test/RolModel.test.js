import SequelizeMock from "sequelize-mock";
import RolModel from "../models/RolModel.js";

const dbMock = new SequelizeMock();
const RolMock = dbMock.define("rol", {
  id: 1,
  nombre: "Administrador",
});

describe("RolModel", () => {
  it("debería crear un rol correctamente", async () => {
    const rol = await RolMock.create({nombre: "Administrador"});

    expect(rol.nombre).toBe("Administrador");
  });

  it("debería tener una clave primaria en id", () => {
    expect(RolModel.primaryKeyAttribute).toBe("id");
  });
});
