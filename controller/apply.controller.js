const User = require("../models/user.model");
const Company = require("../models/company.model");

exports.oneClickApply = async (req, res) => {
  const _b = req.query;

  try {
    const company = await Company.findOne({
      company_name: _b.company_name,
    }).select("candidates");

    // todo = Validations
    company.candidates.push({
      college_id: req.query.college_id,
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
