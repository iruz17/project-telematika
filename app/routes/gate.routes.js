module.exports = app => {
    const gates = require("../controllers/gate.controller.js");

    var router = require("express").Router();

    router.post("/", gates.create);
    router.get("/", gates.findAll);
    router.delete("/", gates.deleteAll);

    router.get("/:id", gates.findOne);
    router.put("/:id", gates.update);
    router.delete("/:id", gates.delete);

    app.use('/api/gates', router);

};