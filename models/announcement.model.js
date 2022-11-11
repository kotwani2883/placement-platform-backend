let mongoose = require("mongoose");
let titlize = require("mongoose-title-case");

let announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  announcement_message: {
    type: String,
  },
  instruction: {
    type: String,
    // required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  recipent: {
    type: Array,
    required: true,
  },
  timestamp: {
    type: Date,
  },
});

module.exports = mongoose.model("announcement", announcementSchema);
