module.exports = app => {
    const visitors = require("../controllers/visitor.controller.js");

    var router = require("express").Router();

    router.post("/", visitors.create);
    router.get("/", visitors.findAll);
    router.delete("/", visitors.deleteAll);

    router.get("/:id", visitors.findOne);
    router.put("/:id", visitors.update);
    router.delete("/:id", visitors.delete);

    app.use('/api/visitors', router);

};