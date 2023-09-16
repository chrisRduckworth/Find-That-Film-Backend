require('dotenv').config()
const key = process.env.TMDB_KEY

if (!key) {
  throw new Error("no TMDB_KEY env variable set")
}

module.exports = key