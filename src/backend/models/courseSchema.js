const mongoose = require("mongoose");
const unitSchema = require("./unitSchema");
const userSchema = require("./userSchema");

const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    owner: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    units: [
      {
        type: mongoose.Schema.Types.ObjectId,
        // type = unitSchema,
        ref: "Unit",
      },
    ],
    members: [
      {
        type: Schema.Types.ObjectId,
        // type: userSchema,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
