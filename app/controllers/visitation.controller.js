const Visitation = require('../models').Visitation;

exports.create = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: 'content could not be empty!' });
  }

  const visitation = new Visitation({
    visitorId: req.body.visitorId,
    gateId: req.body.gateId,
    timestamp: req.body.timestamp,
  });

  visitation.save(visitation)
    .then(newVisitation => {
      res.send(newVisitation);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.findAll = (_, res) => {
  Visitation.find()
    .then(visitations => {
      res.send(visitations);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.findOne = (req, res) => {
  const visitationId = req.params.visitationId;

  Visitation.findById(visitationId)
    .then(visitation => {
      if (visitation) {
        res.send(visitation);
      } else {
        res.status(404).send({
          message: `visitation with id ${visitationId} not found`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.update = (req, res) => {
  const visitationId = req.params.visitationId;

  if (!req.body) {
    return res.status(400).send({ message: 'content could not be empty!' });
  }

  const visitation = {
    visitorId: req.body.visitorId,
    gateId: req.body.gateId,
    timestamp: req.body.timestamp,
  };

  Visitation.findByIdAndUpdate(
    visitationId,
    visitation,
    { useFindAndModify: false }
  )
    .then(result => {
      if (result) {
        Visitation.findById(visitationId)
          .then(newVisitation => {
            if (newVisitation) {
              res.send(newVisitation);
            } else {
              res.status(404).send({
                message: `visitation with id ${visitationId} not found`,
              });
            }
          })
          .catch(err => {
            res.status(500).send({ message: err.message });
          });
      } else {
        res.status(404).send({
          message: `cannot update visitation with id ${visitationId}`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.remove = (req, res) => {
  const visitationId = req.params.visitationId;

  Visitation.findByIdAndRemove(visitationId)
    .then(visitation => {
      if (visitation) {
        res.send(visitation);
      } else {
        res.status(404).send({
          message: `cannot remove visitation with id ${visitationId}`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
