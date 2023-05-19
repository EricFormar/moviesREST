"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      "movies",
      "poster_public_id",
      {
        type : Sequelize.DataTypes.STRING,
      }
    );
    await queryInterface.addColumn(
      "movies",
      "banner_public_id",
      {
        type : Sequelize.DataTypes.STRING,
      }
    );
    await queryInterface.addColumn(
      "movies",
      "thumbnail_public_id",
      {
        type : Sequelize.DataTypes.STRING,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("movies", "poster_public_id");
    await queryInterface.removeColumn("movies", "banner_public_id");
    await queryInterface.removeColumn("movies", "thumbnail_public_id");
  },
};
