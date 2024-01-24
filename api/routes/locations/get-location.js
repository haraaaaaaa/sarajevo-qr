const express = require("express");
const router = express.Router();

const checkAuth = require("../../middlewares/check-auth");

const mongoose = require("mongoose");
const Location = mongoose.model("locations");

router.get("/sarajevo/:id", checkAuth, [check("id").isMongoId().withMessage("ID lokacije nije validan!")], async (req, res) => {
  const { id } = req.params;

  const locationDoc = await Location.findById(id);
  if(!locationDoc) return res.status(404).({message: "Lokacija nije pronađena u bazi!"});

  res.status(200).send(locationDoc);
});

module.exports = router;
