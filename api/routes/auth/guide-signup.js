const express = require("express");
const router = express.Router();

const checkAdmin = require("../../middlewares/check-admin");

const mongoose = require("mongoose");
const User = mongoose.model("users");

const { hash } = require("bcrypt");
const { body } = require("express-validator");

router.post(
  "/api/users/signup",
  checkAdmin,
  [
    body("username").notEmpty().isLength({ min: 5, max: 25 }).withMessage("Morate unijeti Vaše korisničko ime!"),
    body("email").notEmpty().isLength({ min: 10, max: 50 }).withMessage("Morate unijeti Vaš E-Mail!"),
    body("password").notEmpty().trim().isLength({ min: 6, max: 25 }).withMessage("Morate unijeti Vašu lozinku!"),
  ],
  async (req, res) => {
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
      role: "guide",
    });

    res.status(201).send(createdUserDoc);
  }
);

module.exports = router;
