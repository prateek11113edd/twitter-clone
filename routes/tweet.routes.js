const { Router } = require("express");
const { Tweet } = require("../models/tweet.model");
const { checkAuth } = require("../utils/checkAuth");

const router = Router();

router.post("/tweet", async (req, res) => {
  const { message } = req.body;
  const user = checkAuth(req);

  if (!message || typeof message !== "string") {
    return res.json({
      status: "error",
      error: "body of tweet cannot be empty",
    });
  }

  const newTweet = new Tweet({
    message,
    creator: user.id,
  });

  try {
    const tweet = await newTweet.save();

    res.json(tweet);
  } catch (error) {
    res.json("Could not save the tweet");
  }
});

router.get("/tweet/:id", async (req, res) => {
  const tweet = await Tweet.findById(req.params.id);

  return res.json(tweet);
});

router.get("/tweet", async (req, res) => {
  const tweets = await Tweet.find();
  return res.json(tweets);
});

router.put("/tweet/:id", async (req, res) => {
  const user = checkAuth(req);
  const { id } = req.params;
  const { message } = req.body;
  const tweet = await Tweet.findById(id);

  if (!tweet) {
    return res.json("Tweet does not exist");
  }

  if (tweet.creator.toString() !== user.id) {
    return res.status(401).json("You are not authorized to update this tweet.");
  }

  tweet.message = message;

  tweet.save();

  return res.json(tweet);
});

router.delete("/tweet/:id", async (req, res) => {
  const user = checkAuth(req);

  const { id } = req.params;

  const tweet = await Tweet.findById(id);

  if (!tweet) {
    return res.json("Tweet does not exist");
  }

  if (tweet.creator !== user.id) {
    return res.status(401).json("You are not authorized to delete this tweet.");
  }

  Tweet.findByIdAndDelete(id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => [res.status(400).json("Error: " + err)]);
});

router.put("/tweet/like/:id", async (req, res) => {
  const user = checkAuth(req);

  const { id } = req.params;

  const tweet = await Tweet.findById(id);

  if (!tweet) {
    return res.json("Tweet does not exist");
  }

  if (tweet.liked.includes(user.id)) {
    tweet.liked.pull(user.id);
  } else {
    tweet.liked.push(user.id);
  }

  tweet.save();

  console.log(tweet.liked);

  return res.json(tweet);
});

module.exports = router;
