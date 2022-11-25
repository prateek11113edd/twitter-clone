const { app } = require("../index");
const { generateJwtToken } = require("../utils/generateJwtToken");
const supertest = require("supertest");
const mongoose = require("mongoose");
const { Tweet } = require("../models/tweet.model");

app.listen(4002);

const userPayload = {
  firstname: "prateek",
  lastname: "sharma",
  username: "prateek",
  email: "prateek@gmail.com",
  password: "Prateek*()890",
};

const jwt = generateJwtToken(userPayload);

const tweetPayload = {
  message: "test tweet",
};

const tweetPayload2 = {
  message: "test tweet2",
};

let tweet1Id = "";

describe("post /api/tweet/", () => {
  describe("create tweet", () => {
    test("returns the created tweet", async () => {
      const response = await supertest(app)
        .post("/api/tweet")
        .set("Authorization", `Bearer ${jwt}`)
        .send(tweetPayload);

      const response2 = await supertest(app)
        .post("/api/tweet")
        .set("Authorization", `Bearer ${jwt}`)
        .send(tweetPayload2);

      tweet1Id = JSON.parse(response.text)._id;

      expect(JSON.parse(response.text).message).toBe(tweetPayload.message);
      expect(JSON.parse(response2.text).message).toBe(tweetPayload2.message);
    });
  });
});

describe("get /api/tweet/", () => {
  describe("get all tweets", () => {
    test("returns all the tweets", async () => {
      const response = await supertest(app).get(`/api/tweet`);

      expect(response.statusCode).toBe(200);
    });
  });
});

describe("get /api/tweet/:id", () => {
  describe("get the tweet by id", () => {
    test("returns the tweet by id", async () => {
      const response = await supertest(app).get(`/api/tweet/${tweet1Id}`);

      expect(JSON.parse(response.text).message).toBe(tweetPayload.message);
    });
  });
});

// describe("put /api/tweet/:id", () => {
//   describe("update the tweet by id", () => {
//     test("returns the updated tweet by id", async () => {
//       const response = await supertest(app)
//         .put(`/api/tweet/${tweet1Id}`)
//         .set("Authorization", `Bearer ${jwt}`)
//         .send({
//           message: "updated test tweet",
//         });

//       expect(JSON.parse(response.text).message).toBe("updated test tweet");
//     });
//   });
// });

// describe("delete /api/tweet/:id", () => {
//   describe("update the tweet by id", () => {
//     test("returns the updated tweet by id", async () => {
//       const response = await supertest(app)
//         .delete(`/api/tweet/${tweet1Id}`)
//         .set("Authorization", `Bearer ${jwt}`);

//       expect(response.statusCode).toBe(200);
//     });
//   });
// });
