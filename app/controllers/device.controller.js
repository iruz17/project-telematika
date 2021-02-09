const models = require('../models');
const util = require('../plugins/utility');

exports.visitation = (req, res) => {
  models.Gate.findById(req.params.gateId)
    .then(gate => {
      if (gate) {
        models.Card.findOne({ tagId: req.params.tagId })
          .then(card => {
            if (card) {
              if (card.validityDate === util.toDateInput(new Date())) {
                models.Visitor.findOne({ cardId: card.id })
                  .then(visitor => {
                    if (visitor) {
                      const visitation = new models.Visitation({
                        visitorId: visitor._id,
                        gateId: req.params.gateId,
                        timestamp: util.toDateTimeInput(new Date()),
                      });

                      visitation.save(visitation)
                        .then(() => {
                          if (gate.type === 'enter') {
                            res.send(`Selamat datang ${visitor.name}`);
                          } else {
                            res.send(`Sampai jumpa ${visitor.name}`);
                          }
                        })
                        .catch(err => {
                          res.status(500).send(
                            `Kesalahan server, ${err.message}`
                          );
                        });
                    } else {
                      res.status(404).send('Kartu tidak valid');
                    }
                  })
                  .catch(err => {
                    res.status(500).send(`Kesalahan server, ${err.message}`);
                  });
              } else {
                res.status(401).send('Kartu sudah tidak berlaku');
              }
            } else {
              res.status(404).send('Kartu tidak valid');
            }
          })
          .catch(err => {
            res.status(500).send(`Kesalahan server, ${err.message}`);
          });
      } else {
        res.status(404).send('Gate tidak valid');
      }
    })
    .catch(err => {
      res.status(500).send(`Kesalahan server, ${err.message}`);
    });
};
