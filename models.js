const tmdbApi = require("./tmdbApi");

exports.fetchGenres = () => {
  return tmdbApi({
    method: "GET",
    url: "/genre/movie/list",
  }).then(({ data: { genres } }) => {
    return genres.map(({ name }) => name);
  });
};
