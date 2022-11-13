const User = require("../models/user.model");
const Company = require("../models/company.model");

exports.oneClickApply = async (req, res) => {
  try {
    const company = await Company.findOne({
      company_name: req.body.company_name,
    }).select("candidates");
    console.log(company);
    company.candidates.push({
      college_id: req.body.college_id,
      timestamp: new Date(),
    });

    const data = await company.save();

    // const details = await User.findOne({
    //   company_name: req.body.college_id,
    // }).select("first_name last_name gender stream aggregate_cgpa");
    res
      .status(200)
      .json({ success: true, message: "Successfully applied.", data: data });
  } catch (err) {
    console.error(err);
    res.status(200).json({ success: false, message: "Something went wrong!" });
  }
};
