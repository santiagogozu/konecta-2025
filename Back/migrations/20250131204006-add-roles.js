export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("rol", [
      {
        id: 1,
        nombre: "Empleado",
      },
      {
        id: 2,
        nombre: "Administrador",
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("rol", {
      id: [1, 2],
    });
  },
};
