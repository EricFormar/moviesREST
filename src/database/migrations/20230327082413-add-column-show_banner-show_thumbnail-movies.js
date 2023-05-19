"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      "movies",
      "banner_show",
      {
        type : Sequelize.DataTypes.BOOLEAN,
      }
    );
    await queryInterface.addColumn(
      "movies",
      "thumbnail_show",
      {
        type : Sequelize.DataTypes.BOOLEAN,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("movies", "banner_show");
    await queryInterface.removeColumn("movies", "thumbnail_show");
  },
};
