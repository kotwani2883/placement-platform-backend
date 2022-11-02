const mongodb = require("mongodb");
const mongoose = require("mongoose");
var titlize = require("mongoose-title-case");
// mongoose.set("useCreateIndex", true);
const companySchema = new mongoose.Schema({
  // Company
  company_name: {
    type: String,
    required: true,
  },
  company_website_url: {
    type: String,
    default: " ",
  },
  about_company: {
    type: String,
    default: " ",
  },
  // Job Profile
  job_profile: {
    type: String,
    required: true,
  },
  job_ctc: {
    type: Number,
    required: true,
  },
  job_type: {
    type: String,
    required: true,
  },
  job_description: {
    type: String,
    default: " ",
  },
  // student eligibility
  min_cgpa: {
    type: String, // todo convert float
    default: "NA",
  },
  min_10_percent: {
    type: String,
    default: "NA",
  },
  min_12_percent: {
    type: String,
    default: "NA",
  },
  branch: {
    type: Array,
    required: true,
  },
  companies_allowed: {
    type: Array,
    required: true,
  },
  //this is added by mongodb by default no need to explicityly add this
  timestamp: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

module.exports = mongoose.model("company", companySchema);
