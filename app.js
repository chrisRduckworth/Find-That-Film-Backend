const { getGenres } = require("./controllers/genres-controllers");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/api/genres", getGenres);

app.use((err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;
