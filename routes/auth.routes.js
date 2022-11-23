const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model");

const router = express.Router();

router.post("/register", async (req, res, next) => {
  const { firstname, lastname, username, email, password } = req.body;

  if (!firstname || typeof firstname !== "string") {
    return res.json({ status: "error", error: "Invalid firstname" });
  }

  if (!lastname || typeof lastname !== "string") {
    return res.json({ status: "error", error: "Invalid lastname" });
  }

  if (!username || typeof username !== "string") {
    return res.json({ status: "error", error: "Invalid username" });
  }

  if (!email || typeof email !== "string") {
    return res.json({ status: "error", error: "Invalid email" });
  }

  if (!password || typeof password !== "string") {
    return res.json({ status: "error", error: "Invalid password" });
  }

  if (password.length < 5) {
    return res.json({
      status: "error",
      error: "password too small. should be atleast characters",
    });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  try {
    const response = await User.create({
      firstname,
      lastname,
      username,
      email,
      password: passwordHash,
    });
    console.log("user created successfully: ", response);
  } catch (error) {
    if (error.code === 11000) {
      return res.json({ status: "error", error: "Username already in use" });
    }
    throw error;
  }
  res.json({ status: "ok" });
});

router.get("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.json({ status: "error", error: "Invalid username/password" });
  }

  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.SECRET_KEY
    );

    return res.json({ status: "ok", data: token });
  }
  res.json({ status: "error", error: "Invalid username/password" });
});

module.exports = router;