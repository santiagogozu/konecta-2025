export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("usuarios", [
      {
        id: 1,
        correo: "admin@admin.com",
        password:
          "$2a$10$2kyo9kaog7X.ZCXagAAao.afv0jOZ1lmNojdmQyL1sTcVwogOvjqm",
        rolId: 2,
        empleadoId: 1,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("usuarios", {
      id: 1,
    });
  },
};
