const mongoose = require("mongoose");
const userSchema = require("./userSchema")

const Schema = mongoose.Schema;

const orgSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
    },
    address: {
      type: String
    },
    image_url: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    learners: [
      {
        type: Schema.Types.ObjectId,
        // type: userSchema,
        ref: "User",
      },
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Org", orgSchema);
