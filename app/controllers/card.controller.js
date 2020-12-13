const Card = require('../models').Card;

exports.create = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: 'content could not be empty!' });
  }

  const card = new Card({
    tagId: req.body.tagId,
    validityDate: req.body.validityDate,
  });

  card.save(card)
    .then(newCard => {
      res.send(newCard);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.findAll = (_, res) => {
  Card.find()
    .then(cards => {
      res.send(cards);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.findOne = (req, res) => {
  const cardId = req.params.cardId;

  Card.findById(cardId)
    .then(card => {
      if (card) {
        res.send(card);
      } else {
        res.status(404).send({
          message: `card with id ${cardId} not found`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.update = (req, res) => {
  const cardId = req.params.cardId;

  if (!req.body) {
    return res.status(400).send({ message: 'content could not be empty!' });
  }

  const card = {
    tagId: req.body.tagId,
    validityDate: req.body.validityDate,
  };

  Card.findByIdAndUpdate(cardId, card, { useFindAndModify: false })
    .then(newCard => {
      if (newCard) {
        res.send(newCard);
      } else {
        res.status(404).send({
          message: `cannot update card with id ${cardId}`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.delete = (req, res) => {
  const cardId = req.params.cardId;

  Card.findByIdAndRemove(cardId)
    .then(card => {
      if (card) {
        res.send({ message: 'card was removed successfully' });
      } else {
        res.status(404).send({
          message: `cannot remove card with id ${cardId}`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
