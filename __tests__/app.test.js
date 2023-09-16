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

describe("GET /api/actors?query=actor", () => {
  it("should respond with a list of the first 10 actors that match the search query", () => {
    return request(app)
      .get("/api/actors?name=clooney")
      .expect(200)
      .then(({ body: { actors } }) => {
        expect(actors).toHaveLength(10);
        actors.forEach((actor) => {
          expect(actor).toHaveProperty("name");
          expect(actor).toHaveProperty("img");
          expect(actor.knownFor).toHaveProperty("title");
          expect(actor.knownFor).toHaveProperty("year");
        });
      });
  });
  it("should respond subsequent pages if passed page query", () => {
    return request(app)
      .get("/api/actors?name=john%20smith&page=6")
      .expect(200)
      .then(({ body: { actors } }) => {
        expect(actors).toHaveLength(19);
      });
  });
  it("should respond with 400 invalid page if sent invalid type for page", () => {
    return request(app)
      .get("/api/actors?name=clooney&page=bananas")
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Invalid Page");
      });
    Page;
  });
});
