const Visitor = require('../models').Visitor;

exports.create = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: 'content could not be empty!' });
  }

  const visitor = new Visitor({
    cardId: req.body.cardId,
    name: req.body.name,
    age: req.body.age,
    gender: req.body.gender,
  });

  visitor.save(visitor)
    .then(newVisitor => {
      res.send(newVisitor);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.findAll = (_, res) => {
  Visitor.find()
    .then(visitors => {
      res.send(visitors);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.findOne = (req, res) => {
  const visitorId = req.params.visitorId;

  Visitor.findById(visitorId)
    .then(visitor => {
      if (visitor) {
        res.send(visitor);
      } else {
        res.status(404).send({
          message: `visitor with id ${visitorId} not found`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.update = (req, res) => {
  const visitorId = req.params.visitorId;

  if (!req.body) {
    return res.status(400).send({ message: 'content could not be empty!' });
  }

  const visitor = {
    cardId: req.body.cardId,
    name: req.body.name,
    age: req.body.age,
    gender: req.body.gender,
  };

  Visitor.findByIdAndUpdate(visitorId, visitor, { useFindAndModify: false })
    .then(result => {
      if (result) {
        Visitor.findById(visitorId)
          .then(newVisitor => {
            if (newVisitor) {
              res.send(newVisitor);
            } else {
              res.status(404).send({
                message: `visitor with id ${visitorId} not found`,
              });
            }
          })
          .catch(err => {
            res.status(500).send({ message: err.message });
          });
      } else {
        res.status(404).send({
          message: `cannot update visitor with id ${visitorId}`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.remove = (req, res) => {
  const visitorId = req.params.visitorId;

  Visitor.findByIdAndRemove(visitorId)
    .then(visitor => {
      if (visitor) {
        res.send(visitor);
      } else {
        res.status(404).send({
          message: `cannot remove visitor with id ${visitorId}`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
