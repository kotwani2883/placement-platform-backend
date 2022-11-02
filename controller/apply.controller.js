const User = require("../models/user.model");
const Company = require("../models/company.model");

exports.oneClickApply = async (req, res) => {
  const _b = req.body;
  try {
    const company = await Company.findOne({ _id: _b.company_id }).select(
      "candidates"
    );
    const isCandidateAlreadyRegistered = company.candidates.find(function (
      candidate
    ) {
      return candidate.college_id === req.decoded.college_id;
    });
    if (!isCandidateAlreadyRegistered) {
      // todo = Validations
      company.candidates.push({
        college_id: req.decoded.college_id,
        timestamp: new Date(),
      });

      const data = await company.save();

      res.status(200).json({ success: true, message: "Successfully applied." });
    } else {
      res.status(200).json({ success: false, message: "Already applied." });
    }
  } catch (err) {
    console.error(err);
    res.status(200).json({ success: false, message: "Something went wrong!" });
  }
};
