const db = require("../models");
const Visitation = db.visitations;

exports.create = (req, res) => {
    // if (!req.body.title) {
    //     res.status(400).send({ message: "Konten tidak boleh kosong !"});
    //     return;
    // }

    const visitation = new Visitation({
        visitorId: req.body.visitorId,
        gateId: req.body.gateId,
        timestamp: req.body.timestamp,
    });

    visitation
        .save(visitation)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Beberapa error terjadi ketika membuat database"
            });
        });
};

exports.findAll = (req, res) => {
    // const title = req.query.title;
    // var condition = title ? { title: { $regex: new RegExp(title), $options: "i" }} : {};

    Visitation.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Beberapa error terjadi ketika mendapatkan database"
            })
        })
};

exports.findOne = (req,res) => {
    const id = req.params.id;

    Visitation.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Tidak ditemukan database dengan id" + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error mendapatkan database dengan id=" + id});
        });
};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ 
            message: "Data untuk diupdate tidak boleh kosong !"
        });
    }

    const id = req.params.id;

    Visitation.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: 'tidak bisa mengupdate database dengan id=${id}. mungkin database tidak ditemukan!'
                });
            } else res.send ({ message: "database sukses terupdate"});
        })
        .catch(err => {
            res.status(500).send({
                message: "error ketika mengupdate database dengan id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Visitation.findByIdAndRemove(id)
        .then(data => {
            if(!data) {
                res.status(404).send({
                    message: 'tidak bisa menghapus database dengan id=${id}. mungkin database tidak ditemukan!'
                });
            } else {
                res.send({
                    message: "database sukses dihapus!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "tidak bisa menghapus database dengan id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {

};

exports.findAllPublished = (req, res) => {

};

