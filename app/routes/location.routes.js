module.exports = app => {
    const locations = require("../controllers/location.controller.js");

    var router = require("express").Router();

    router.post("/", locations.create);
    router.get("/", locations.findAll);
    router.delete("/", locations.deleteAll);

    router.get("/:id", locations.findOne);
    router.put("/:id", locations.update);
    router.delete("/:id", locations.delete);

    app.use('/api/locations', router);

};