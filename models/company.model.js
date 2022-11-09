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
  job_role: {
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
  job_stipend: {
    type: Number,
    default: " ",
  },
  job_about: {
    type: String,
    default: "",
  },
  // student eligibility
  deadline_date: {
    type: Date,
    required: true,
  },
  batch: {
    type: Number,
    required: true,
  },
  min_cgpa: {
    type: String, // todo convert float
    default: "NA",
  },
  min_10_percent: {
    type: Number,
    default: "NA",
  },
  min_12_percent: {
    type: Number,
    default: "NA",
  },
  branch: {
    type: Array,
    required: true,
  },
  companies_allowed: {
    type: Array,
  },

  // Selection Process
  // selection_process: {
  //   type: Object,
  // },
  // waitlist: {
  //   type: String,
  // },
  // final_offer: {
  //   type: String,
  // },
  //this is added by mongodb by default no need to explicityly add this
  timestamp: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

module.exports = mongoose.model("company", companySchema);
