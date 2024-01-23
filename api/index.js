// Dependencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const keys = require("./config/keys");

// Server Config & Middleware Config
const app = express();

app.set("trust proxy", true);
app.use(express.json());
app.use(cors());

// Start Function
const start = async () => {
  try {
    await mongoose.connect(keys.MONGO_URI);
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.log(error);
  }

  const port = process.env.PORT || 5000;

  app.listen(port, () => console.log(`Server listening on port ${port}`));
};

start();
