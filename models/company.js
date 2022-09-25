const mongodb = require("mongodb");
const mongoose = require("mongoose");
const CompanySchema = new mongoose.Schema({
  c_id: {
    type: Number,
    required: true,
  },
  c_name: {
    type: String,
    required: true,
  },
  c_des: {
    type: String,
    required: true,
  },
  c_pptdate: {
    type: Date,
    required: true,
  },
  c_DreamStatus: {
    type: Boolean,
    required: true,
  },
});
