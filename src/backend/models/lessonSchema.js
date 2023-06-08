const mongoose = require("mongoose");
const lectureSchema = require("./lectureSchema");

const lessonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  lectures: [
    {
      type: mongoose.Schema.Types.ObjectId,
      // type: lectureSchema,
      ref: "Lecture",
    },
  ],
});

module.exports = mongoose.model("Lesson", lessonSchema);
