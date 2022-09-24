const { Decimal128 } = require("mongodb");
const mongoose = require("mongoose");
const StudentSchema = new mongoose.Schema({
  s_name: {
    type: String,
    required: true,
  },
  s_id: {
    type: String,
    required: true,
  },
  s_dob: {
    type: Date,
    required: true,
  },
  s_stream: {
    type: String,
    required: true,
  },
  s_college: {
    type: String,
    required: true,
  },
  s_emailid: {
    type: String,
    required: true,
  },
  s_mobileNo: {
    type: Number,
    required: true,
  },
  s_Batch: {
    type: Number,
    required: true,
  },
  s_CGPA: {
    type: Decimal128,
    required: true,
  },
  s_Twelve: {
    type: Decimal128,
    required: true,
  },
  s_Tenth: {
    type: Decimal128,
    required: true,
  },
  s_ActiveBacklog: {
    type: Number,
    required: true,
  },
  s_PlacementStatus: {
    type: Boolean,
    required: true,
  },
  s_company: {
    type: String,
    required: true,
  },
  s_ctc: {
    type: Number,
    required: true,
  },
});
