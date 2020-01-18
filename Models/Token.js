const mongoose = require("mongoose");

const Token = new mongoose.Schema({
  token: { type: String, require: true },
  user_id: { type: String, required: true },
  createAt: { type: Date, default: Date.now(), expires: "1d" }
});

module.exports = mongoose.model("Token", Token);
