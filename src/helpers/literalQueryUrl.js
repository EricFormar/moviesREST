const {literal} = require('sequelize');

const literalQueryUrl = (
    req,
    entity,
    id,
  ) => {
    const url = (req) =>
      `${req.protocol}://${req.get("host")}/api/v1/${entity}/`;
    
    return [literal(`CONCAT('${url(req)}',${id})`), 'url'];
  };

  module.exports = literalQueryUrl