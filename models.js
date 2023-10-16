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
        img:
          person.profile_path === null
            ? "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg"
            : `https://www.themoviedb.org/t/p/original${person.profile_path}`,
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
        poster:
          film.poster_path === null
            ? "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
            : `https://www.themoviedb.org/t/p/original${film.poster_path}`,
        year: dayjs(film.release_date).format("YYYY"),
      };
    });
  });
};
