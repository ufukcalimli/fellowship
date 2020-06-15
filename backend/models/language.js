const mongoose = require("mongoose");

const LanguageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model("language", LanguageSchema);
