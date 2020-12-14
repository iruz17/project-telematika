module.exports = app => {
  const router = require('express').Router();

  const controller = require('../controllers/visitor.controller');

  router.post('/', controller.create);
  router.get('/', controller.findAll);

  router.get('/:visitorId', controller.findOne);
  router.put('/:visitorId', controller.update);
  router.delete('/:visitorId', controller.remove);

  app.use('/api/visitor', router);
};
