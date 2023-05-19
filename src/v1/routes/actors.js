const router = require('express').Router();
const {index,store,update,destroy,show} = require('../../controllers/actorsController');
const actorsValidator = require('../../validations/actorsValidators');

/* /actors */
router
  .get('/',index)
  .get('/:id',show)
  .post('/',actorsValidator,store)
  .put('/:id',update)
  .delete('/:id',destroy)

module.exports = router;
