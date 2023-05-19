'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Actor_Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Actor_Movie.init({
    actor_id: DataTypes.INTEGER,
    movie_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Actor_Movie',
    underscored: true,
    tableName : 'actor_movie'
  });
  return Actor_Movie;
};