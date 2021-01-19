module.exports = (app) => {
  require('./app.route')(app);
  require('./card.route')(app);
  require('./device.route')(app);
  require('./gate.route')(app);
  require('./location.route')(app);
  require('./visitation.route')(app);
  require('./visitor.route')(app);
};
