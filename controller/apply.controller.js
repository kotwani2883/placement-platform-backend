const User = require("../models/user.model");
const Company = require("../models/company.model");

exports.oneClickApply = async (req, res) => {
  try {
    const company = await Company.findOne({
      company_name: req.body.company_name,
    }).select("candidates");

    console.log(company);
    // todo = Validations
    company.candidates.push({
      college_id: req.body.college_id,
      timestamp: new Date(),
    });

    const data = await company.save();

    res
      .status(200)
      .json({ success: true, message: "Successfully applied.", data: data });
  } catch (err) {
    console.error(err);
    res.status(200).json({ success: false, message: "Something went wrong!" });
  }
};
