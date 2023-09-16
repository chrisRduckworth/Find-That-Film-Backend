const { fetchGenres } = require("../models/genres-models");

exports.getGenres = (req, res, next) => {
  fetchGenres()
    .then((genres) => {
      res.status(200).send({ genres });
    })
    .catch((err) => {
      next(err);
    });
};
