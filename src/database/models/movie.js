'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movie.belongsTo(models.Genre, {
        foreignKey : 'genre_id',
        as : 'genre'
      });
      
      Movie.belongsToMany(models.Actor, {
        foreignKey : 'movie_id',
        otherKey : 'actor_id',
        through : 'actor_movie',
        as : 'actors'
      })
    }
  }
  Movie.init({
    title: {
      type: DataTypes.STRING(500),
      allowNull : false,
    },
    rating:{ 
      type: DataTypes.DECIMAL(3,1).UNSIGNED,
      allowNull : false,
    },
    awards: {
      type : DataTypes.INTEGER.UNSIGNED,
      defaultValue : 0
    },
    release_date: {
      type: DataTypes.DATE,
      allowNull : false,
    },
    length: DataTypes.INTEGER.UNSIGNED,
    genre_id: DataTypes.INTEGER.UNSIGNED,
    review : DataTypes.STRING,
    poster : DataTypes.STRING,
    banner : DataTypes.STRING,
    thumbnail : DataTypes.STRING,
    banner_show : DataTypes.BOOLEAN,
    thumbnail_show : DataTypes.BOOLEAN,
    poster_public_id : DataTypes.STRING,
    banner_public_id : DataTypes.STRING,
    thumbnail_public_id : DataTypes.STRING,
    visible : DataTypes.BOOLEAN,

  }, {
    sequelize,
    modelName: 'Movie',
    underscored: true,
  });
  return Movie;
};