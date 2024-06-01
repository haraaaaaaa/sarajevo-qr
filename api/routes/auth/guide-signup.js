const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const User = mongoose.model("users");

const checkAuth = require("../../middlewares/check-auth");
const checkAdmin = require("../../middlewares/check-admin");

const { body } = require("express-validator");

router.post(
  "/api/users/guide-signup",
  checkAuth,
  checkAdmin,
  [body("username").notEmpty().isLength({ min: 5, max: 25 }).withMessage("Morate unijeti korisničko ime!")],
  async (req, res) => {
    const { username } = req.body;

    const userDoc = await User.findOne({ username });
    if (!userDoc) return res.status(409).send({ message: "Korisnik sa tim korisničkim imenom ne postoji!" });

    userDoc.role = "guide";

    const updatedUserDoc = await userDoc.save();

    res.status(201).send(updatedUserDoc);
  }
);

module.exports = router;
