const express = require("express");
const membershipsRouter = express.Router();
const Membership = require("../models/membership");

membershipsRouter
    .route("/")
    .get((req, res, next) => {
        Membership.find()
            .then((memberships) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(memberships);
            })
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        Membership.create(req.body)
            .then((membership) => {
                console.log("Membership Created ", membership);
                console.log(req.body);
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(membership);
            })
            .catch((err) => next(err));
    })
    .put((req, res) => {
        res.statusCode = 403;
        res.end("PUT operation not supported on /memberships");
    })
    .delete((req, res, next) => {
        Membership.deleteMany()
            .then((response) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(response);
            })
            .catch((err) => next(err));
    });

module.exports = membershipsRouter;
