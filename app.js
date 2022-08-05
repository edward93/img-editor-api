var express = require("express");

var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var imgEditorRouter = require("./routes/imgEditorRouter");
var swaggerRouter = require("./routes/swaggerRouter");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


app.use("/", swaggerRouter);
app.use("/api", imgEditorRouter);

module.exports = app;
