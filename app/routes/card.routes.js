module.exports = app => {
    const cards = require("../controllers/card.controller.js");

    var router = require("express").Router();

    router.post("/", cards.create);
    router.get("/", cards.findAll);
    router.delete("/", cards.deleteAll);

    router.get("/:id", cards.findOne);
    router.put("/:id", cards.update);
    router.delete("/:id", cards.delete);

    app.use('/api/cards', router);

};