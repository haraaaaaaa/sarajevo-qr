const express = require("express");
const mongoose = require("mongoose");
const User = mongoose.model("users");
const { hash } = require("bcrypt");

const router = express.Router();

router.post("/api/users/signup", async (req, res) => {
  const { username, email, password } = req.body;

  const emailCheck = await User.findOne({ email });
  if (emailCheck) return res.status(409).send({ message: "E-mail adresa je već u upotrebi!" });

  const usernameCheck = await User.findOne({ username });
  if (usernameCheck) return res.status(409).send({ message: "Korisničko ime je već u upotrebi!" });

  const hashedPassword = await hash(password, 10);

  const createdUserDoc = await User.create({
    username,
    email,
    password: hashedPassword,
    role: "admin",
  });

  res.status(201).send(createdUserDoc);
});

module.exports = router;
