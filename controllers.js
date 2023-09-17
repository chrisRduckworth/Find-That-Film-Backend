const { fetchGenres, fetchPeople } = require("./models");

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
