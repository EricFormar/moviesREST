const router = require('express').Router();
const {index,create,store,search,edit,update,destroy,detail} = require('../controllers/genresController');

/* /genres */
router
  .get('/',index);

module.exports = router;
