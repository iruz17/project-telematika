module.exports = app => {
    const visitations = require("../controllers/visitation.controller.js");

    var router = require("express").Router();

    router.post("/", visitations.create);
    router.get("/", visitations.findAll);
    router.delete("/", visitations.deleteAll);

    router.get("/:id", visitations.findOne);
    router.put("/:id", visitations.update);
    router.delete("/:id", visitations.delete);

    app.use('/api/visitations', router);

};