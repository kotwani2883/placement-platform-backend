var mongoose = require("mongoose");
var titlize = require("mongoose-title-case");

var feedbackSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
  author_name: {
    type: String,
    required: true,
  },
  author_email: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Feedback", feedbackSchema);
