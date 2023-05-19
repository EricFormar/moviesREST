"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      "actors",
      "photo",
      {
        type: Sequelize.DataTypes.TEXT,
        after: "rating",
      },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("actors", "photo");
  },
};
