"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      "movies",
      "banner",
      {
        type : Sequelize.DataTypes.STRING,
      }
    );
    await queryInterface.addColumn(
      "movies",
      "thumbnail",
      {
        type : Sequelize.DataTypes.STRING,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("movies", "banner");
    await queryInterface.removeColumn("movies", "thumbnail");
  },
};
