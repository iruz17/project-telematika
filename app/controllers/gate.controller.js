const Gate = require('../models').Gate;

exports.create = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: 'content could not be empty!' });
  }

  const gate = new Gate({
    name: req.body.name,
    locationId: req.body.locationId,
    type: req.body.type,
  });

  gate.save(gate)
    .then(newGate => {
      res.send(newGate);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.findAll = (_, res) => {
  Gate.find()
    .then(gates => {
      res.send(gates);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.findOne = (req, res) => {
  const gateId = req.params.gateId;

  Gate.findById(gateId)
    .then(gate => {
      if (gate) {
        res.send(gate);
      } else {
        res.status(404).send({
          message: `gate with id ${gateId} not found`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.update = (req, res) => {
  const gateId = req.params.gateId;

  if (!req.body) {
    return res.status(400).send({ message: 'content could not be empty!' });
  }

  const gate = {
    name: req.body.name,
    locationId: req.body.locationId,
    type: req.body.type,
  };

  Gate.findByIdAndUpdate(gateId, gate, { useFindAndModify: false })
    .then(result => {
      if (result) {
        Gate.findById(gateId)
          .then(newGate => {
            if (newGate) {
              res.send(newGate);
            } else {
              res.status(404).send({
                message: `gate with id ${gateId} not found`,
              });
            }
          })
          .catch(err => {
            res.status(500).send({ message: err.message });
          });
      } else {
        res.status(404).send({
          message: `cannot update gate with id ${gateId}`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.remove = (req, res) => {
  const gateId = req.params.gateId;

  Gate.findByIdAndRemove(gateId)
    .then(gate => {
      if (gate) {
        res.send(gate);
      } else {
        res.status(404).send({
          message: `cannot remove gate with id ${gateId}`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
