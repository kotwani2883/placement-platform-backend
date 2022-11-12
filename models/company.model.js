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
  // registration deadline
  deadline_date: {
    type: Date,
    required: true,
  },
  batch: {
    type: Number,
    required: true,
  },
  min_cgpa: {
    type: Number, // todo convert float
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
  candidates: [
    {
      college_id: {
        type: String,
      },
      // college_email: {
      //   type: String,
      //   required: true,
      // },
      // gender: {
      //   type: String,
      //   required: true,
      // },
      // college_course: {
      //   type: String,
      //   required: true,
      // },
      // stream: {
      //   type: String,
      //   required: true,
      // },
      // aggregate_cgpa: {
      //   type: Number,
      //   required: true,
      // },

      // },
      timestamp: {
        type: Date,
      },
    },
  ],
  // Selection Process
  selection_process: {
    type: Object,
  },
  waitlist: {
    type: String,
  },
  final_offer: {
    type: String,
  },
  //this is added by mongodb by default no need to explicityly add this
  timestamp: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

module.exports = mongoose.model("company", companySchema);
