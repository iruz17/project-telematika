module.exports = app => {
  const router = require('express').Router();

  const controller = require('../controllers/gate.controller');

  router.post('/', controller.create);
  router.get('/', controller.findAll);

  router.get('/:gateId', controller.findOne);
  router.put('/:gateId', controller.update);
  router.delete('/:gateId', controller.remove);

  app.use('/api/gate', router);
};
