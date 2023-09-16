const { fetchGenres, fetchActors } = require("./models");

exports.getGenres = (req, res, next) => {
  fetchGenres()
    .then((genres) => {
      res.status(200).send({ genres });
    })
    .catch(next);
};

exports.getActors = (req, res, next) => {
  const { name, page } = req.query;
  fetchActors(name, page)
    .then((actors) => {
      res.status(200).send({ actors });
    })
    .catch(next);
};
