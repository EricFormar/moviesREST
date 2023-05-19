const {check} = require('express-validator');

module.exports = [
    check('title')
        .notEmpty()
        .withMessage("El campo 'title' es obligatorio"),
    check('rating')
        .notEmpty()
        .withMessage("El campo 'rating' es obligatorio"),
    check('release_date')
        .notEmpty()
        .withMessage("El campo 'release_date' es obligatorio")

]