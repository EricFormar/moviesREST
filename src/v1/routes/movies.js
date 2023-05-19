const router = require('express').Router();
const {index,show,store,update,destroy} = require('../../controllers/moviesController');
const upload = require('../../middlewares/upload');
const moviesValidator = require('../../validations/moviesValidator')

/* /movies */
router
  .get('/',index)
  .get('/:id',show)
  .post('/', upload.fields([
    {name : "poster"},
    {name : "banner"},
    {name : "thumbnail"}
  ]),moviesValidator, store)
  .put('/:id',upload.fields([
    {name : "poster"},
    {name : "banner"},
    {name : "thumbnail"}
  ]),update)
  .delete('/:id',destroy)

module.exports = router;
