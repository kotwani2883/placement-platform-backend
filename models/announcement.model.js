let mongoose = require("mongoose");
let titlize = require("mongoose-title-case");

let announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  announcement_messa: {
    type: String,
    required: true,
  },
  passout_batch: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("announcement", announcementSchema);
