const express = require("express");
const perksRouter = express.Router();
const Perk = require("../models/perk");

perksRouter
    .route("/")
    .get((req, res, next) => {
        Perk.find()
            .then((perks) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(perks);
            })
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        Perk.create(req.body)
            .then((space) => {
                console.log("Space Created ", space);
                console.log(req.body);
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(space);
            })
            .catch((err) => next(err));
    })
    .put((req, res) => {
        res.statusCode = 403;
        res.end("PUT operation not supported on /perks");
    })
    .delete((req, res, next) => {
        Perk.deleteMany()
            .then((response) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(response);
            })
            .catch((err) => next(err));
    });

module.exports = perksRouter;
