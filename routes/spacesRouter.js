const express = require("express");
const cors = require("cors");
const spacesRouter = express.Router();
const Space = require("../models/space");

const options = {
    origin: "http://localhost:3000",
};
app.use(cors(options));

spacesRouter
    .route("/")
    .get((req, res, next) => {
        Space.find()
            .then((spaces) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(spaces);
            })
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        Space.create(req.body)
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
        res.end("PUT operation not supported on /spaces");
    })
    .delete((req, res, next) => {
        Space.deleteMany()
            .then((response) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(response);
            })
            .catch((err) => next(err));
    });

spacesRouter
    .route("/:spaceId")
    .get((req, res, next) => {
        Space.findById(req.params.spaceId)
            .then((space) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(space);
            })
            .catch((err) => next(err));
    })
    .post((req, res) => {
        res.statusCode = 403;
        res.end(
            "POST operation not supported on /spaces/${req.params.spaceId}"
        );
    })
    .put((req, res, next) => {
        Space.findByIdAndUpdate(
            req.params.spaceId,
            {
                $set: req.body,
            },
            {new: true}
        )
            .then((space) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(space);
            })
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        Space.findByIdAndDelete(req.params.spaceId)
            .then((response) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(response);
            })
            .catch((err) => next(err));
    });

module.exports = spacesRouter;
