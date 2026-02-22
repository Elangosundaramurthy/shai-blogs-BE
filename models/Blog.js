const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true
  },
  subHeading: {
    type: String,
    required: true
  },
  coverImage: {
    type: String
  },
  mainImage: {
    type: String
  },
  content: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Blog", blogSchema);