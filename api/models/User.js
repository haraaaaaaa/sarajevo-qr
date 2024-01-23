const mongoose = require("mongoose");
const { Schema } = mongoose;

const userRoles = {
  Tourist: "tourist",
  Admin: "admin",
};

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

mongoose.model("users", userSchema);
