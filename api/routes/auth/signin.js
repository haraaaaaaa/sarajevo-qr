const express = require("express");
const mongoose = require("mongoose");
const User = mongoose.model("users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../../config/keys.js");

const router = express.Router();

router.post("/api/users/signin", async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await User.findOne({ username });
  if (!existingUser) return res.status(401).send({ message: "Korisnik sa tim korisničkim imenom ne postoji!" });

  const isMatch = await bcrypt.compare(password, existingUser.password);
  if (!isMatch) return res.status(401).send({ message: "Neuspješna autentikacija." });

  res.status(201).send({
    message: "Auth Successful",
    token: jwt.sign({ id: existingUser._id, role: existingUser.role }, JWT_SECRET_KEY, {
      expiresIn: "12h",
    }),
  });
});

module.exports = router;
