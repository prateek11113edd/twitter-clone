const { Router } = require("express");
const { Comment } = require("../models/comment.model");
const { Tweet } = require("../models/tweet.model");
const { checkAuth } = require("../utils/checkAuth");

const router = Router();

router.post("/comment/:tweetId", async (req, res) => {
  const user = checkAuth(req);
  const { tweetId } = req.params;

  const tweet = await Tweet.findById(tweetId);

  if (!tweet) {
    return res.json({ status: "error", error: "Tweet does not exist" });
  }

  const { comment: commentBody } = req.body;

  if (!commentBody || typeof commentBody !== "string") {
    return res.json("comment body cannot be empty");
  }

  const comment = new Comment({
    comment: commentBody,
    creator: user.id,
    tweet: tweet.id,
  });

  comment.save();

  return res.json({ status: "ok", data: comment });
});

router.get("/comment/:tweetId", async (req, res) => {
  const { tweetId } = req.params;

  const tweet = await Tweet.findById(tweetId);

  if (!tweet) {
    return res.json({ status: "error", data: "tweet does not exist" });
  }

  const comments = await Comment.find({ tweet: tweetId });

  res.json(comments);
});

// router.get("/comment/:id", (req, res) => {});

router.put("/comment/:id", async (req, res) => {
  const user = checkAuth(req);
  const { id } = req.params;

  const comment = await Comment.findById(id);

  if (!comment) {
    return res.json({ status: "error", data: "comment does not exist" });
  }

  if (user.id !== comment.creator.toString()) {
    return res
      .status(401)
      .json("You are not authorized to perform this action.");
  }

  comment.comment = req.body.comment;

  comment.save();

  res.json(comment);
});

router.delete("/comment/:id", async (req, res) => {
  const user = checkAuth(req);
  const { id } = req.params;

  const comment = await Comment.findById(id);

  if (!comment) {
    return res.json({ status: "error", data: "comment does not exist" });
  }

  if (user.id !== comment.creator.toString()) {
    return res
      .status(401)
      .json("You are not authorized to perform this action.");
  }

  comment.delete();

  return res.json("comment deleted");
});

router.put("/comment/like/:id", (req, res) => {});

module.exports = router;
