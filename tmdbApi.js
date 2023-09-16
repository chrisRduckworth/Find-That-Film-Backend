const axios = require("axios");

require("dotenv").config();
const key = process.env.TMDB_KEY;

if (!key) {
  throw new Error("no TMDB_KEY env variable set");
}

const tmdbApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${key}`,
  },
});

module.exports = tmdbApi;
