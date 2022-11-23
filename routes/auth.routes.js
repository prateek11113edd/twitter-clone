const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  validateRegisterData,
  validateLoginData,
} = require("../utils/validator");
const { User } = require("../models/user.model");
const { generateJwtToken } = require("../utils/generateJwtToken");

const router = express.Router();

router.post("/register", async (req, res, next) => {
  const { firstname, lastname, username, email, password } = req.body;

  const { errors, valid } = validateRegisterData(req.body);

  if (!valid) {
    return res.json({ status: "error", errors });
  }

  const user = await User.findOne({ username });

  const emailCheck = await User.findOne({ email });

  if (emailCheck) {
    return res.json({ status: "error", error: "Email already in use" });
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
  const { username, password } = req.body;

  const { errors, valid } = validateLoginData(req.body);

  if (!valid) {
    return res.json({ status: "error", errors });
  }

  const user = await User.findOne({ username });

  if (!user) {
    return res.json({ status: "error", error: "Invalid username/password" });
  }

  if (await bcrypt.compare(password, user.password)) {
    const token = generateJwtToken(user);

    return res.json({ status: "ok", data: token });
  }
  res.json({ status: "error", error: "Invalid username/password" });
});

module.exports = router;
