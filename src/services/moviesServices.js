const db = require('../database/models');
const { destroyActor } = require("./actorsServices");
const {literalQueryUrlImage,literalQueryUrl} = require('../helpers')
const cloudinary = require('cloudinary').v2;

module.exports = {
  getAllMovies: async (req) => {
    try {
      const {count, rows : movies} = await db.Movie.findAndCountAll({
        limit : req.query.limit,
        offset : req.skip,
        attributes : {
          exclude : ['createdAt','updatedAt','banner_show','thumbnail_show','visible','genre_id'],
          include : [
            literalQueryUrl(req,'movies','movie.id')
          ]
        },
        include : {
          association : 'genre',
          attributes : ['name']
        }
      });

      return {
        count,
        movies
      };
    } catch (error) {
        console.log(error);
      throw {
        status : 500,
        message : error.message
      };
    }
  },
  getMovieById: async (id) => {
    try {
      const movie = await db.Movie.findByPk(id, {
        attributes : {
          exclude : ['createdAt','updatedAt'],
        },
        include : [
          {
          association : 'genre',
          attributes : ['name']
          },
          {
            association : 'actors',
            attributes :['first_name','last_name','photo'],
            through: {
              attributes: []
            },
          }
      ]
      });
      return movie
    } catch (error) {
      console.log(error);
      throw {
        status : 500,
        message : error.message
      };
    }
  },
  createMovie: async (movieData) => {
    try {
      const newMovie = await db.Movie.create(movieData);

      return newMovie;
    } catch (error) {
      throw error;
    }
  },
  updateMovie: async (data, id) => {
    try {
      const movieUpdated = await db.Movie.update(
        {
          ...data,
        },
        {
          where: {
            id,
          },
        }
      );

      const actorsDestroy = await destroyActor(id, "movie_id");
      actorsDestroy && console.log("Actores eliminados");

      if (data.actors) {
        const actorsUpdated = actors.map((actor) => {
          return {
            actor_id: actor,
            movie_id: id,
          };
        });

        await db.Actor_Movie.bulkCreate(actorsUpdated);
      }

      return movieUpdated
    } catch (error) {
      throw error;
    }
  },
  destroyMovie: async (id) => {},
};
