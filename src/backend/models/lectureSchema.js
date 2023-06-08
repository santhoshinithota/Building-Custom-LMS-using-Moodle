const mongoose = require("mongoose");

const lectureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
  },
  type: {
    type: String,
  },
});

module.exports = mongoose.model("Lecture", lectureSchema);