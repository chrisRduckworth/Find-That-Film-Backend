const tmdbApi = require("./tmdbApi");
const dayjs = require("dayjs");

exports.fetchGenres = () => {
  return tmdbApi({
    method: "GET",
    url: "/genre/movie/list",
  }).then(({ data: { genres } }) => {
    return genres.map(({ name }) => name);
  });
};

exports.fetchActors = (name, page = "1") => {
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
    const actors = results.map((actor) => {
      const knownFor = {};
      try {
        knownFor.title = actor.known_for[0].title || actor.known_for[0].name;
        knownFor.year = dayjs(actor.known_for[0].release_date).format("YYYY");
      } catch {
        knownFor.title = "";
        knownFor.year = "";
      }
      return {
        name: actor.name,
        img: `https://www.themoviedb.org/t/p/original${actor.profile_path}`,
        knownFor,
      };
    });
    return actors;
  });
};
