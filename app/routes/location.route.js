module.exports = app => {
  const router = require('express').Router();

  const controller = require('../controllers/location.controller');

  router.post('/', controller.create);
  router.get('/', controller.findAll);

  router.get('/:locationId', controller.findOne);
  router.put('/:locationId', controller.update);
  router.delete('/:locationId', controller.delete);

  app.use('/api/location', router);
};
