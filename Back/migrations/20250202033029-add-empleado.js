export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("empleados", [
      {
        id: 1,
        fecha_ingreso: "2025-01-01",
        nombre: "admin",
        salario: 100,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("empleados", {
      id: 1,
    });
  },
};
