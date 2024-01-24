const express = require("express");
const router = express.Router();

const checkAuth = require("../../middlewares/check-auth");
const checkGuide = require("../../middlewares/check-guide");

const { body } = require("express-validator");

const mongoose = require("mongoose");
const Location = mongoose.model("locations");

router.post(
  "/api/locations",
  checkAuth,
  checkGuide,
  [
    body("name").notEmpty()./*length({ min: 5, max: 50 }).*/ withMessage("Morate unijeti naziv lokacije!"),
    body("summary").notEmpty()./*length({ min: 5, max: 200 }).*/ withMessage("Morate unijeti kratak opis lokacije!"),
    body("description").notEmpty()./*length({ min: 5, max: 2000 }).*/ withMessage("Morate unijeti detaljan opis lokacije!"),
    body("image").notEmpty().withMessage("Morate unijeti sliku lokacije!"),
  ],
  async (req, res) => {
    const { name, summary, description, image } = req.body;

    const nameCheck = await Location.findOne({ name });
    if (nameCheck) return res.status(409).send({ message: "Istoimena lokacija već postoji!" });

    const newLocationDoc = await Location.create({ name, summary, description, image });

    res.status(201).send(newLocationDoc);
  }
);

module.exports = router;
