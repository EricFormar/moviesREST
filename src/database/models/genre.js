'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Genre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Genre.hasMany(models.Movie,{
        foreignKey : 'genre_id',
        as : 'movies'
      })
    }
  }
  Genre.init({
    name: {
      type: DataTypes.STRING(100),
      allowNull : false,
    },
    ranking: {
      type: DataTypes.INTEGER.UNSIGNED,
      unique :true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull : false,
      defaultValue : 1
    }
  }, {
    sequelize,
    modelName: 'Genre',
    underscored: true,
  });
  return Genre;
};