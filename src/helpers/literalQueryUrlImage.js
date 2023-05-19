const {literal} = require('sequelize');

const literalQueryUrlImage = (
    req,
    entity,
    nameImage,
    field,
  ) => {
    const urlImage = (req) =>
      `${req.protocol}://${req.get("host")}/images/${entity}/`;
    
    return nameImage ? [literal(`CONCAT('${urlImage(req)}',${nameImage})`), field] : null;
  };

  module.exports = literalQueryUrlImage