const mongoose = require("mongoose");
const { Schema } = mongoose;

const locationSchema = new Schema({
  name: { type: String, required: true, unique: true },
  summary: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true, unique: true },
});

mongoose.model("locations", locationSchema);
