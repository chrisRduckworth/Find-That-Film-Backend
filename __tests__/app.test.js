const request = require("supertest");
const app = require("../app");

describe("GET /api/genres", () => {
  it("should respond with a list of all genres", () => {
    return request(app)
      .get("/api/genres")
      .expect(200)
      .then(({ body: { genres } }) => {
        expect(genres).toEqual([
          "Action",
          "Adventure",
          "Animation",
          "Comedy",
          "Crime",
          "Documentary",
          "Drama",
          "Family",
          "Fantasy",
          "History",
          "Horror",
          "Music",
          "Mystery",
          "Romance",
          "Science Fiction",
          "TV Movie",
          "Thriller",
          "War",
          "Western",
        ]);
      });
  });
});
