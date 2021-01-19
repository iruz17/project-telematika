const models = require('../models');
const util = require('../plugins/utility');

exports.location = async(req, res) => {
  try {
    const locations = [];
    for (const location of await models.Location.find()) {
      locations.push({
        id: location._id,
        name: location.name,
        type: location.type,
        longitude: location.longitude,
        latitude: location.latitude,
        description: location.description,
        timestamp: null,
      });
    }

    const card = await models.Card.findOne({ tagId: req.params.tagId });
    if (!card) {
      return res.status(404).send('Kartu tidak valid');
    } else if (card.validityDate !== util.toDateInput(new Date())) {
      return res.status(401).send('Kartu sudah tidak berlaku');
    }

    const visitor = await models.Visitor.findOne({ cardId: card.id });
    if (!visitor) {
      return res.status(404).send('Kartu tidak valid');
    }

    const visitations = await models.Visitation.find({ visitorId: visitor.id });
    for (const visitation of visitations) {
      const gate = await models.Gate.findById(visitation.gateId);
      if (gate) {
        if (gate.type === 'enter') {
          for (const i in locations) {
            if (locations[i].id == gate.locationId) {
              if (locations[i].timestamp) {
                const oldDate = new Date(locations[i].timestamp);
                const newDate = new Date(visitation.timestamp);
                if (oldDate < newDate) {
                  locations[i].timestamp = visitation.timestamp;
                }
              } else {
                locations[i].timestamp = visitation.timestamp;
              }

              break;
            }
          }
        }
      }
    }

    return res.send(locations);

  } catch (err) {
    return res.status(500).send(`Kesalahan server, ${err.message}`);
  }
};
