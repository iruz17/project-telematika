module.exports = app => {
  const router = require('express').Router();

  const controller = require('../controllers/app.controller');

  router.get('/location/:tagId', controller.location);

  app.use('/api/app', router);
};
