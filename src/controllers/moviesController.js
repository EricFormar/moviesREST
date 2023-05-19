const db = require("../database/models");
const fs = require("fs");
const {
  updateMovie,
  getAllMovies,
  getMovieById,
  createMovie,
} = require("../services/moviesServices");
const paginate = require("express-paginate");
const cloudinary = require("cloudinary").v2;

const createResponseError = require("../helpers/createResponseError");
const { validationResult } = require("express-validator");
const createErrorExpress = require("../helpers/createErrorExpress");

module.exports = {
  index: async (req, res) => {
    try {
      const { count, movies } = await getAllMovies(req);
      const pagesCount = Math.ceil(count / req.query.limit);
      const items = movies.length;
      const currentPage = req.query.page;
      const pages = paginate.getArrayPages(req)(
        pagesCount,
        pagesCount,
        req.query.page
      );
      const prevPage = currentPage > 1 ? pages[currentPage - 2].url : null;
      const nextPage = currentPage < pagesCount ? pages[currentPage].url : null;

      return res.status(200).json({
        ok: true,
        meta: {
          count,
          items,
          pagesCount,
          currentPage,
          prevPage,
          nextPage,
          pages,
        },
        data: movies,
      });
    } catch (error) {
      createResponseError(res, error);
    }
  },
  show: async (req, res) => {
    try {
      const {
        params: { id },
      } = req;

      let movie = await getMovieById(id);

      return res.status(200).json({
        ok: true,
        meta: {
          url: `${req.protocol}://${req.get("host")}/api/v1/movies/${id}`,
        },
        data: movie,
      });
    } catch (error) {
      createResponseError(res, error);
    }
  },

  store: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) throw createErrorExpress(errors, req);
      const {
        title,
        rating,
        awards,
        release_date,
        length,
        genre_id,
        review,
        visible,
        banner_show,
        thumbnail_show,
      } = req.body;

      const poster =
        req.files.poster &&
        (await cloudinary.uploader.upload(req.files.poster[0].path,{
          folder : 'movies'
        }));
      const banner =
        req.files.banner &&
        (await cloudinary.uploader.upload(req.files.banner[0].path));
      const thumbnail =
        req.files.thumbnail &&
        (await cloudinary.uploader.upload(req.files.thumbnail[0].path));
      console.log(poster);

      poster && fs.unlinkSync(req.files.poster[0].path);
      banner && fs.unlinkSync(req.files.banner[0].path);
      thumbnail && fs.unlinkSync(req.files.thumbnail[0].path);

      const { id } = await createMovie({
        title: title.trim(),
        rating,
        awards,
        release_date,
        length,
        genre_id,
        review,
        poster: poster ? poster.secure_url : null,
        banner: banner ? banner.secure_url : null,
        thumbnail: thumbnail ? thumbnail.secure_url : null,
        poster_public_id: poster ? poster.public_id : null,
        banner_public_id: banner ? banner.public_id : null,
        thumbnail_public_id: thumbnail ? thumbnail.public_id : null,
        banner_show: banner_show || true,
        thumbnail_show: thumbnail_show || true,
        visible: visible || true,
        actors: actors && (!Array.isArray(actors) ? [actors] : actors),
      });

      const movie = await getMovieById(id, req);

      return res.status(201).json({
        ok: true,
        meta: {
          url: `${req.protocol}://${req.get("host")}/api/v1/movies/${id}`,
        },
        data: movie,
      });
    } catch (error) {
      createResponseError(res, error);
    }
  },
  update: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) throw createErrorExpress(errors, req);
      const {
        title,
        rating,
        awards,
        release_date,
        length,
        genre_id,
        review,
        visible,
        banner_show,
        thumbnail_show,
        actors
      } = req.body;

      const { id } = req.params;

      const movie = await getMovieById(id);
      if (!movie)
        throw {
          status: 404,
          message: "No se encuentra una película con ese id",
        };
      let { poster_public_id, banner_public_id, thumbnail_public_id } = movie;

      const poster =
        req.files?.poster &&
        (await cloudinary.uploader.upload(req.files.poster[0].path, {
          public_id: poster_public_id,
          overwrite: true,
          //folder : 'movies'
        }));
      const banner =
        req.files?.banner &&
        (await cloudinary.uploader.upload(req.files.banner[0].path, {
          public_id: banner_public_id,
          overwrite: true,
          folder : 'movies'
        }));
      const thumbnail =
        req.files?.thumbnail &&
        (await cloudinary.uploader.upload(req.files.thumbnail[0].path, {
          public_id: thumbnail_public_id,
          overwrite: true,
          folder : 'movies'
        }));

      poster && fs.unlinkSync(req.files.poster[0].path);
      banner && fs.unlinkSync(req.files.banner[0].path);
      thumbnail && fs.unlinkSync(req.files.thumbnail[0].path);

      const data = {
        title: title && title.trim(),
        awards,
        release_date,
        rating,
        length,
        genre_id,
        poster,
        banner,
        thumbnail,
        review,
        visible,
        banner_show,
        thumbnail_show,
        poster: poster && poster.secure_url,
        banner: banner && banner.secure_url,
        thumbnail: thumbnail && thumbnail.secure_url,
        poster_public_id: poster && poster.public_id,
        banner_public_id: banner && banner.public_id,
        thumbnail_public_id: thumbnail && thumbnail.public_id,
        actors: actors && (!Array.isArray(actors) ? [actors] : actors),
      };

      const moviesUpdated = await updateMovie(data, id);

      return res.status(201).json({
        ok: true,
        data: moviesUpdated,
        msg:
          moviesUpdated[0] === 1
            ? "Película actualizada"
            : "No se hicieron cambios",
      });
    } catch (error) {
      console.log(error);
      return res.status(error.status || 500).json({
        ok: false,
        error: error || "upss, ocurrió un error",
      });
    }
  },
  destroy: (req, res) => {
    db.Actor.update(
      {
        favorite_movie_id: null,
      },
      {
        where: {
          favorite_movie_id: req.params.id,
        },
      }
    )
      .then(() => {
        db.Actor_Movie.destroy({
          where: {
            movie_id: req.params.id,
          },
        }).then(() => {
          db.Movie.destroy({
            where: {
              id: req.params.id,
            },
          }).then(() => res.redirect("/movies"));
        });
      })
      .catch((error) => console.log(error));
  },
};
