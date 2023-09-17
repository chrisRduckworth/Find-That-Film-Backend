const tmdbApi = require("./tmdbApi");
const dayjs = require("dayjs");

exports.fetchGenres = () => {
  return tmdbApi({
    method: "GET",
    url: "/genre/movie/list",
  }).then(({ data: { genres } }) => {
    return genres;
  });
};

exports.fetchPeople = (name, page = "1") => {
  page = parseInt(page);
  if (!page) {
    return Promise.reject({
      status: 400,
      msg: "Invalid Page",
    });
  }

  return tmdbApi({
    method: "GET",
    url: `/search/person?query=${name}&page=${page}`,
  }).then(({ data: { results } }) => {
    const people = results.map((person) => {
      const knownFor = {};
      try {
        knownFor.title = person.known_for[0].title || person.known_for[0].name;
        knownFor.year = dayjs(person.known_for[0].release_date).format("YYYY");
      } catch {
        knownFor.title = "";
        knownFor.year = "";
      }
      return {
        id: person.id,
        name: person.name,
        img: `https://www.themoviedb.org/t/p/original${person.profile_path}`,
        knownFor,
      };
    });
    return people;
  });
};
