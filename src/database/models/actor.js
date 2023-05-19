'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Actor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Actor.belongsToMany(models.Movie, {
        foreignKey : 'actor_id',
        otherKey : 'movie_id',
        through : 'actor_movie',
        as : 'movies'
      })
    }
  }
  Actor.init({
    first_name: {
      type: DataTypes.STRING(100),
      allowNull : false
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    rating: DataTypes.INTEGER,
    photo : DataTypes.STRING,
    favorite_movie_id: {
      type: DataTypes.INTEGER.UNSIGNED,
    }
  }, {
    sequelize,
    modelName: 'Actor',
    underscored: true,
  });
  return Actor;
};