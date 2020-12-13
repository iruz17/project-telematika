module.exports = app => {
  const router = require('express').Router();

  const controller = require('../controllers/visitation.controller');

  router.post('/', controller.create);
  router.get('/', controller.findAll);

  router.get('/:visitationId', controller.findOne);
  router.put('/:visitationId', controller.update);
  router.delete('/:visitationId', controller.remove);

  app.use('/api/visitation', router);
};
