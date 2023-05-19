"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      "movies",
      "poster",
      {
        type: Sequelize.DataTypes.STRING,
        after: "length",
      },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("movies", "poster");
  },
};
