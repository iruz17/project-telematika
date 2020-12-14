module.exports = app => {
  const router = require('express').Router();

  const controller = require('../controllers/card.controller');

  router.post('/', controller.create);
  router.get('/', controller.findAll);

  router.get('/:cardId', controller.findOne);
  router.put('/:cardId', controller.update);
  router.delete('/:cardId', controller.remove);

  app.use('/api/card', router);
};
