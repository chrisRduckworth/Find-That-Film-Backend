const { fetchGenres, fetchPeople, fetchFilms } = require("./models");

exports.getGenres = (req, res, next) => {
  fetchGenres()
    .then((genres) => {
      res.status(200).send({ genres });
    })
    .catch(next);
};

exports.getPeople = (req, res, next) => {
  const { name, page } = req.query;
  fetchPeople(name, page)
    .then((people) => {
      res.status(200).send({ people });
    })
    .catch(next);
};

exports.getFilms = (req, res, next) => {
  const { actors, directors, genres, year } = req.query;
  fetchFilms(actors, directors, genres, year)
    .then((films) => {
      res.status(200).send({ films });
    })
    .catch(next);
};
