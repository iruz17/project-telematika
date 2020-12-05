const dbConfig = require ("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.tutorials = require("./tutorial.controller.js")(mongoose);
db.tutorials = require("./card.controller.js")(mongoose);
db.tutorials = require("./location.controller.js")(mongoose);
db.tutorials = require("./visitation.controller.js")(mongoose);
db.tutorials = require("./visitor.controller.js")(mongoose);
db.tutorials = require("./gate.controller.js")(mongoose);

module.exports = db;