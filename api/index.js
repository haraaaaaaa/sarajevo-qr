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

// Required Models & Middlewares
require("./models/User");
require("./models/Location");
const currentUser = require("./middlewares/current-user");
app.use(currentUser);

// Required Auth Routes
const guideSignUpRouter = require("./routes/auth/guide-signup");
const signUpRouter = require("./routes/auth/signup");
const signInRouter = require("./routes/auth/signin");

// Required Location Routes
const postLocationRouter = require("./routes/locations/post-location");
const getLocationRouter = require("./routes/locations/get-location");
const getLocationsRouter = require("./routes/locations/get-locations");

// Auth Router Middlewares
app.use(guideSignUpRouter);
app.use(signUpRouter);
app.use(signInRouter);

// Location Router Middlewares
app.use(postLocationRouter);
app.use(getLocationRouter);
app.use(getLocationsRouter);

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
