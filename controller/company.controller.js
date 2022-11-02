const User = require("../models/user.model");
const Company = require("../models/company.model");
const mongoose = require("mongoose");

exports.getAll = async (req, res) => {
  const _b = req.body;

  try {
    const user = await User.findOne({ college_id: req.decoded.college_id })
      .select("passout_batch")
      .lean();

    const companies = await Company.find({
      passout_batch: user.passout_batch,
    })
      .select("company_name job_profile package ")
      .lean();

    res.status(200).json({ success: true, companies: companies });
  } catch (err) {
    console.error(err);
    res.status(200).json({ success: false, message: "Something went wrong!" });
  }
};

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
