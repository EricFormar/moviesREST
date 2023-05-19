const {check} = require('express-validator');

module.exports = [
    check('first_name')
        .notEmpty()
        .withMessage("El campo 'first_name' es obligatorio"),
    check('last_name')
        .notEmpty()
        .withMessage("El campo 'first_name' es obligatorio")
]