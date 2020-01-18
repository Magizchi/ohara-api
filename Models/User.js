const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  pseudo: { type: String, unique: true, required: true },
  auth: {
    salt: { type: String, require: true },
    hash: { type: String, require: true }
  }
});

module.exports = mongoose.model("User", UserSchema);
