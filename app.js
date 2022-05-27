require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
const cors = require("cors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const spacesRouter = require("./routes/spacesRouter");
const membershipsRouter = require("./routes/membershipsRouter");
const perksRouter = require("./routes/perksRouter");

var app = express();

app.use(cors());

const url =
    "mongodb+srv://soo123:" +
    process.env.DB_PASSWORD +
    "@mernproject.3xgj3.mongodb.net/?retryWrites=true&w=majority";

const connect = mongoose.connect(url, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

connect.then(
    () => console.log("Connected successfully to server"),
    (err) => console.log(err)
);

app.listen(process.env.PORT || 8000);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/spaces", spacesRouter);
app.use("/memberships", membershipsRouter);
app.use("/perks", perksRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
