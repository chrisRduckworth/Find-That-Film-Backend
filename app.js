const { getGenres, getActors } = require("./controllers");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/api/genres", getGenres);

app.get("/api/actors", getActors);

app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  }
  next(err);
});

app.use((err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;
