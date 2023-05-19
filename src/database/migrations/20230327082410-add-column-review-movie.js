"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      "movies",
      "review",
      {
        type: Sequelize.DataTypes.TEXT,
        after: "poster",
      },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("movies", "review");
  },
};
