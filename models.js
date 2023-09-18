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

exports.fetchFilms = (actors, directors, genres, year) => {
  let queryStr = "";
  if (actors) {
    const actorIds = actors.split(",");
    for (id of actorIds) {
      if (!parseInt(id)) {
        return Promise.reject({
          status: 400,
          msg: "Invalid Id",
        });
      }
    }
    queryStr += `&with_cast=${actors}`;
  }

  if (directors) {
    const directorIds = directors.split(",");
    for (id of directorIds) {
      if (!parseInt(id)) {
        return Promise.reject({
          status: 400,
          msg: "Invalid Id",
        });
      }
    }
    queryStr += `&with_crew=${directors}`;
  }

  if (genres) {
    const genreIds = genres.split(",");
    for (id of genreIds) {
      if (!parseInt(id)) {
        return Promise.reject({
          status: 400,
          msg: "Invalid Id",
        });
      }
    }
    queryStr += `&with_genres=${genres}`;
  }

  if (year) {
    if (!parseInt(year)) {
      return Promise.reject({
        status: 400,
        msg: "Invalid Year",
      });
    }
    queryStr += `&primary_release_year=${year}`;
  }

  return tmdbApi({
    method: "GET",
    url: `/discover/movie?${queryStr}`,
  }).then(({ data: { results } }) => {
    return results.map((film) => {
      return {
        id: film.id,
        title: film.original_title,
        poster: `https://www.themoviedb.org/t/p/original${film.poster_path}`,
        year: dayjs(film.release_date).format("YYYY"),
      };
    });
  });
};
