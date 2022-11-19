const User = require("../models/user.model");
const Company = require("../models/company.model");
const mongoose = require("mongoose");

exports.getAll = async (req, res) => {
  try {
    const user = await User.findOne({ college_id: req.query.college_id })
      .select("passout_batch")
      .lean();

    const companies = await Company.find({
      companies_allowed: { $in: user.placed_in },
    })
      .select("company_name job_profile package ")
      .lean();

    res.status(200).json({ success: true, companies: companies });
  } catch (err) {
    console.error(err);
    res.status(200).json({ success: false, message: "Something went wrong!" });
  }
};

//student is params

exports.add = (req, res) => {
  const _b = req.body;
  Company.create(_b)
    .then(async (data) => {
      res
        .status(200)
        .json({ success: true, message: "Successfully new company added." });
      console.log(_b);
    })
    .catch((err) => {
      console.error(err);
      res.status(200).json({
        success: false,
        message:
          "Something went wrong! Did you miss Company Name, Passout Batch, Job Profile or Deadline date?",
      });
    });
};
exports.validate = (req, res) => {
  User.updateMany(
    { aggregate_cgpa: { $gt: req.body.min_cgpa } },
    { $push: { companies_allowed: req.body.company_name } }
  )
    .then(async (data) => {
      res.status(200).json({
        success: true,
        message: "Successfully new company added to users",
      });
    })

    .catch((err) => {
      console.error(err);
      res.status(200).json({
        success: false,
        message:
          "Something went wrong! Did you miss Company Name, Passout Batch, Job Profile or Deadline date?",
      });
    });
};

exports.getOne = async (req, res) => {
  const details = await Company.find({
    company_name: req.query.company_name,
  })
    .select("-batch")
    .lean()
    .then((details) => {
      console.log(details);
      res.status(200).json({ success: true, details: details });
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ success: false, message: "Something went wrong!" });
    });
};
exports.getAllCompanies = async (req, res) => {
  const company_name = await Company.find()
    .select("company_name")
    .lean()
    .then((company_name) => {
      console.log(typeof company_name);
      res.status(200).json({ success: true, company_name: company_name });
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ success: false, message: "Something went wrong!" });
    });
};
