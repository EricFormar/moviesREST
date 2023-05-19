const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const methodOverride = require("method-override");
const paginate = require("express-paginate");
const cloudinary = require('cloudinary').v2;

const {cloudinary : cloudinary_config} = require('./config');

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views")).set("view engine", "ejs");

app
  .use(logger("dev"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(cookieParser())
  .use(express.static(path.join(__dirname, "..", "public")))

  .use(methodOverride("_method"))

  .use(paginate.middleware(8, 50));

// CONFIG CLOUDINARY
cloudinary.config(cloudinary_config);


// routes
const { actorsRouter, moviesRouter } = require("./v1/routes");
const createResponseError = require("./helpers/createResponseError");

app
  .use("/api/v1/actors", actorsRouter)
  .use("/api/v1/movies", moviesRouter)
  .use(function (req, res, next) {
    next(createError(404));
  })

  .use(function (error, req, res, next) {
    return createResponseError(res,error)
  });

module.exports = app;
