const { validationResult } = require("express-validator");
const {
  getAllActors,
  getOneActor,
  createActor,
  updateActor,
} = require("../services/actorsServices");
const createErrorExpress = require("../helpers/createErrorExpress");

module.exports = {
  index: async (req, res) => {
    try {
      const actors = await getAllActors(req);

      return res.status(200).json({
        ok: true,
        data: actors,
      });
    } catch (error) {
      console.log(error);
      return res.status(error.status || 500).json({
        ok: false,
        error: error || "upss, ocurrió un error",
      });
    }
  },
  show: async (req, res) => {
    try {
      const { params: id } = req;

      const actor = await getOneActor(id);

      return res.status(200).json({
        ok: true,
        data: actor,
      });
    } catch (error) {
      console.log(error);
      return res.status(error.status || 500).json({
        ok: false,
        error: error || "upss, ocurrió un error",
      });
    }
  },
  store: async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) throw createErrorExpress(errors, req);

      const newActor = await createActor(req.body);

      return res.status(201).json({
        ok: true,
        data: newActor,
      });
    } catch (error) {
        console.log(error)
      return res.status(error.status || 500).json({
        ok: false,
        error: error || "upss, ocurrió un error",
      });
    }
  },
  update: async (req, res) => {
    try {
      const data = req.body;

      const response = await updateActor(data);

      return res.status(201).json({
        ok: true,
        msg: "",
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
    try {
        
    } catch (error) {
        console.log(error);
        return res.status(error.status || 500).json({
            ok: false,
            error: error || "upss, ocurrió un error",
          });
    }
  },
};
