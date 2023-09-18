const request = require("supertest");
const app = require("../app");

describe("GET /api/genres", () => {
  it("should respond with a list of all genres", () => {
    return request(app)
      .get("/api/genres")
      .expect(200)
      .then(({ body: { genres } }) => {
        genres.forEach((genre) => {
          expect(genre).toHaveProperty("id"),
            expect(genre).toHaveProperty("name");
        });
      });
  });
});

describe("GET /api/people?name=name", () => {
  it("should respond with a list of the first 10 people that match the search query", () => {
    return request(app)
      .get("/api/people?name=clooney")
      .expect(200)
      .then(({ body: { people } }) => {
        expect(people).toHaveLength(10);
        people.forEach((person) => {
          expect(person).toHaveProperty("id", expect.any(Number));
          expect(person).toHaveProperty("name");
          expect(person).toHaveProperty("img");
          expect(person.knownFor).toHaveProperty("title");
          expect(person.knownFor).toHaveProperty("year");
        });
      });
  });
  it("should respond subsequent pages if passed page query", () => {
    return request(app)
      .get("/api/people?name=john%20smith&page=6")
      .expect(200)
      .then(({ body: { people } }) => {
        expect(people).toHaveLength(19);
      });
  });
  it("should respond with 400 invalid page if sent invalid type for page", () => {
    return request(app)
      .get("/api/people?name=clooney&page=bananas")
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Invalid Page");
      });
    Page;
  });
});

describe("GET /api/films", () => {
  it("should return a list of films with multiple actors", () => {
    return request(app)
      .get("/api/films?actors=1461%2C1892")
      .expect(200)
      .then(({ body: { films } }) => {
        expect(films).toHaveLength(9);
        films.forEach((film) => {
          expect(film).toHaveProperty("id");
          expect(film).toHaveProperty("title");
          expect(film).toHaveProperty("poster");
          expect(film).toHaveProperty("year");
        });
      });
  });
  it("should return a list of films when given a specific year", () => {
    return request(app)
      .get("/api/films?actors=1461&year=2002")
      .expect(200)
      .then(({ body: { films } }) => {
        expect(films).toHaveLength(3);
        films.forEach((film) => {
          expect(film).toHaveProperty("id");
          expect(film).toHaveProperty("title");
          expect(film).toHaveProperty("poster");
          expect(film).toHaveProperty("year", "2002");
        });
      });
  });
  it("should return a list of films when given a specific director", () => {
    return request(app)
      .get("/api/films?actors=1461&directors=11218")
      .expect(200)
      .then(({ body: { films } }) => {
        expect(films).toHaveLength(1);
        films.forEach((film) => {
          expect(film).toHaveProperty("id");
          expect(film).toHaveProperty("title");
          expect(film).toHaveProperty("poster");
          expect(film).toHaveProperty("year");
        });
      });
  });
  it("should return a list of films when given specific genres", () => {
    return request(app)
      .get("/api/films?actors=1461&genres=12%2C10751")
      .expect(200)
      .then(({ body: { films } }) => {
        expect(films).toHaveLength(4);
        films.forEach((film) => {
          expect(film).toHaveProperty("id");
          expect(film).toHaveProperty("title");
          expect(film).toHaveProperty("poster");
          expect(film).toHaveProperty("year");
        });
      });
  });
  it("should respond with 400 bad request if sent invalid year", () => {
    return request(app)
      .get("/api/films?actors=1461&year=banana")
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Invalid Year");
      });
  });
  it("should respond with 400 bad request if sent invalid actor id", () => {
    return request(app)
      .get("/api/films?actors=1461%2Cbananas")
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Invalid Id");
      });
  });
  it("should respond with 400 bad request if sent invalid director id", () => {
    return request(app)
      .get("/api/films?actors=1461&directors=bananas")
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Invalid Id");
      });
  });
  it("should respond with 400 bad request if sent invalid genre id", () => {
    return request(app)
      .get("/api/films?actors=1461&genres=bananas")
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Invalid Id");
      });
  });
});
