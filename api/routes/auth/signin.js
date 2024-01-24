const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const User = mongoose.model("users");

const bcrypt = require("bcrypt");
const { body } = require("express-validator");

const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../../config/keys.js");

router.post(
  "/api/users/signin",
  [
    body("username").notEmpty().withMessage("Morate unijeti Vaše korisničko ime!"),
    body("password").notEmpty().trim().withMessage("Morate unijeti Vašu lozinku!"),
  ],
  async (req, res) => {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (!existingUser) return res.status(401).send({ message: "Korisnik sa tim korisničkim imenom ne postoji!" });

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) return res.status(401).send({ message: "Neuspješna Autentikacija!" });

    res.status(200).send({
      message: "Uspješna Autentikacija!",
      token: jwt.sign({ id: existingUser._id, role: existingUser.role }, JWT_SECRET_KEY, {
        expiresIn: "12h",
      }),
    });
  }
);

module.exports = router;
