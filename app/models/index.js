const dbConfig = require ("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.tutorials = require("./tutorial.model.js")(mongoose);
db.cards = require("./card.model.js")(mongoose);
db.locations = require("./location.model.js")(mongoose);
db.visitations = require("./visitation.model.js")(mongoose);
db.visitors = require("./visitor.model.js")(mongoose);
db.gates = require("./gate.model.js")(mongoose);

module.exports = db;