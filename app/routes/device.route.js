module.exports = app => {
  const router = require('express').Router();

  const controller = require('../controllers/device.controller');

  router.post('/visitation/:gateId/:tagId', controller.visitation);

  app.use('/api/device', router);
};
