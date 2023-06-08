const mongoose = require("mongoose");
const lessonSchema = require("./lessonSchema");

const unitSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    image_url: {
      type: String,
    },
    lessons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        // type: lessonSchema,
        ref: "Lesson",
      },
    ],
  });
  
  module.exports = mongoose.model("Unit", unitSchema);