import SequelizeMock from "sequelize-mock";
import EmployeesModel from "../models/EmployeesModel.js";

const dbMock = new SequelizeMock();
const EmployeeMock = dbMock.define("empleados", {
  id: 1,
  nombre: "Juan Pérez",
  fecha_ingreso: "2023-01-15",
  salario: 6000,
});

describe("EmployeesModel", () => {
  it("debería crear un empleado correctamente", async () => {
    const employee = await EmployeeMock.create({
      nombre: "Juan Pérez",
      fecha_ingreso: "2023-01-15",
      salario: 6000,
    });

    expect(employee.nombre).toBe("Juan Pérez");
    expect(employee.fecha_ingreso).toBe("2023-01-15");
    expect(employee.salario).toBe(6000);
  });

  it("debería tener la clave primaria en id", () => {
    expect(EmployeesModel.primaryKeyAttribute).toBe("id");
  });
});
