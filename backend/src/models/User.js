const mongoose = require("mongoose");

const Userschema = new mongoose.Schema({
  email: String
});

module.exports = mongoose.model("User", Userschema);
