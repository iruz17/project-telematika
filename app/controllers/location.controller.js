const Location = require('../models').Location;

exports.create = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: 'content could not be empty!' });
  }

  const location = new Location({
    name: req.body.name,
    type: req.body.type,
    longitude: req.body.longitude,
    latitude: req.body.latitude,
    description: req.body.description,
  });

  location.save(location)
    .then(newLocation => {
      res.send(newLocation);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.findAll = (_, res) => {
  Location.find()
    .then(locations => {
      res.send(locations);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.findOne = (req, res) => {
  const locationId = req.params.locationId;

  Location.findById(locationId)
    .then(location => {
      if (location) {
        res.send(location);
      } else {
        res.status(404).send({
          message: `location with id ${locationId} not found`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.update = (req, res) => {
  const locationId = req.params.locationId;

  if (!req.body) {
    return res.status(400).send({ message: 'content could not be empty!' });
  }

  const location = {
    name: req.body.name,
    type: req.body.type,
    longitude: req.body.longitude,
    latitude: req.body.latitude,
    description: req.body.description,
  };

  Location.findByIdAndUpdate(locationId, location, { useFindAndModify: false })
    .then(result => {
      if (result) {
        Location.findById(locationId)
          .then(newLocation => {
            if (newLocation) {
              res.send(newLocation);
            } else {
              res.status(404).send({
                message: `location with id ${locationId} not found`,
              });
            }
          })
          .catch(err => {
            res.status(500).send({ message: err.message });
          });
      } else {
        res.status(404).send({
          message: `cannot update location with id ${locationId}`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.remove = (req, res) => {
  const locationId = req.params.locationId;

  Location.findByIdAndRemove(locationId)
    .then(location => {
      if (location) {
        res.send(location);
      } else {
        res.status(404).send({
          message: `cannot remove location with id ${locationId}`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
