const express = require("express");
const router = express.Router();

const checkAuth = require("../../middlewares/check-auth");

const mongoose = require("mongoose");
const Location = mongoose.model("locations");

router.get("/api/locations", checkAuth, async (req, res) => {
  const locationsDoc = await Location.find();
  if (!locationsDoc) return res.status(404).send({ message: "Nema pronađenih lokacija u bazi!" });

  res.status(200).send(locationsDoc);
});

module.exports = router;
