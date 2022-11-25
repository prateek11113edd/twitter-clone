const { app } = require("../index");
app.listen(4001);
const superset = require("supertest");

describe("post /auth/register", () => {
  describe("given a firstname, lastname, username, email and password", () => {
    test("should respond with a 200 status code", async () => {
      const response = await superset(app).post("/api/auth/register").send({
        firstname: "prateek",
        lastname: "sharma",
        username: "prateek",
        email: "prateek@gmail.com",
        password: "Prateek*()890",
      });

      expect(response.statusCode).toBe(200);
    });
  });

  describe("given a firstname, lastname, username, email and password and email already used", () => {
    test("should return email already in use ", async () => {
      const response = await superset(app).post("/api/auth/register").send({
        firstname: "prateek",
        lastname: "sharma",
        username: "prateek",
        email: "prateek@gmail.com",
        password: "Prateek*()890",
      });

      expect(JSON.parse(response.text).error).toBe("Email already in use");
    });
  });

  describe("given a firstname, lastname, username, email and password and username already used", () => {
    test("should return Invalid email", async () => {
      const response = await superset(app).post("/api/auth/register").send({
        firstname: "prateek",
        lastname: "sharma",
        email: "prateek@",
        username: "prateek",
        password: "Prateek*()890",
      });

      expect(JSON.parse(response.text).errors.emailFormat).toBe(
        "Invalid email"
      );
    });
  });
});

describe("get /auth/login", () => {
  describe("given username and password", () => {
    test("should return jwt token", async () => {
      const response = await superset(app).get("/api/auth/login").send({
        username: "prateek",
        password: "Prateek*()890",
      });

      expect(JSON.parse(response.text).status).toBe("ok");
    });
  });

  describe("given username and password", () => {
    test("should return invalid username/password", async () => {
      const response = await superset(app).get("/api/auth/login").send({
        username: "prateek",
        password: "Prateek*()89",
      });

      expect(JSON.parse(response.text).error).toBe("Invalid username/password");
    });
  });
});
