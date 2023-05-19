const db = require("../database/models");
const literalQueryUrlImage = require('../helpers/literalQueryUrlImage')

module.exports = {
  getAllActors: async (req) => {
    try {
      const actors = await db.Actor.findAll({
        attributes : {
          exclude : ['createdAt','updatedAt'],
          include : [
            literalQueryUrlImage(req,'actors','photo','photo'),
          ]
        },
      });
      return actors;
    } catch (error) {
      throw {
        status : 500,
        message : error.message
      };
    }
  },
  getOneActor: async (id) => {
    try {
      const actor = await db.Actor.findByPk(id);
      return actor;
    } catch (error) {
      throw error;
    }
  },
  createActor: async (data) => {
    try {
      const newActor = await db.Actor.create({
        ...data,
      });

      return newActor;
    } catch (error) {
      throw error;
    }
  },
  updateActor: async (data, id) => {
    try {
      const result = await db.Actor.update(
        {
          ...data,
        },
        {
          where: {
            id,
          },
        }
      );

      return result;
    } catch (error) {
      throw error;
    }
  },
  destroyActor: async (id, whereBy) => {
    try {
      const whereQuery =
        whereBy === "movie_id"
          ? {
              where: {
                movie_id: id,
              },
            }
          : {
              wheere: {
                id,
              },
            };

      const actorsDestroy = await db.Actor_Movie.destroy(whereQuery);

      return actorsDestroy;
    } catch (error) {
      throw error;
    }
  },
};
