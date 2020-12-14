module.exports = (app) => {
  require('./card.route')(app);
  require('./gate.route')(app);
  require('./location.route')(app);
  require('./visitation.route')(app);
  require('./visitor.route')(app);
};
