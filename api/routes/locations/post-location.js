const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const Location = mongoose.model("locations");

router.post("/sarajevo", async (req, res) => {
  const { name, summary, description, image } = req.body;

  await Location.create({ name, summary, description, image });

  res.redirect("/");
});

module.exports = router;
