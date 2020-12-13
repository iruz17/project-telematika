const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const dbConfig = require('../config/db.config');

module.exports = {
  mongoose: mongoose,
  url: dbConfig.url,
  Card: require('./card.model')(mongoose),
  Gate: require('./gate.model')(mongoose),
  Location: require('./location.model')(mongoose),
  Visitation: require('./visitation.model')(mongoose),
  Visitor: require('./visitor.model')(mongoose),
};
