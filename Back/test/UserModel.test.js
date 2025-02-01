const SequelizeMock = require("sequelize-mock");
const dbMock = new SequelizeMock();

const RolMock = dbMock.define("RolModel", {
  id: 1,
  nombre: "Admin",
});

const EmployeesMock = dbMock.define("EmployeesModel", {
  id: 1,
  nombre: "Juan Pérez",
});

const UserMock = dbMock.define("UserModel", {
  id: 1,
  correo: "test@example.com",
  password: "password123",
  rolId: 1,
  empleadoId: 1,
});

UserMock.belongsTo(RolMock, {foreignKey: "rolId"});
UserMock.belongsTo(EmployeesMock, {foreignKey: "empleadoId"});

UserMock.associations = {
  rolId: {foreignKey: "rolId"},
  empleadoId: {foreignKey: "empleadoId"},
};

describe("UserModel", () => {
  it("debería crear un usuario correctamente", async () => {
    const user = await UserMock.create({
      correo: "test@example.com",
      password: "password123",
      rolId: 1,
      empleadoId: 1,
    });

    expect(user.get("correo")).toBe("test@example.com");
    expect(user.get("rolId")).toBe(1);
    expect(user.get("empleadoId")).toBe(1);
  });

  it("debería tener relaciones con RolModel y EmployeesModel", async () => {
    expect(UserMock.associations.rolId).toBeDefined();
    expect(UserMock.associations.empleadoId).toBeDefined();
  });
});
