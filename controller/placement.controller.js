let Placements = require("../models/placements.model");
const mongoose = require("mongoose");

exports.add = (req, res) => {
  const _b = req.body;

  if (_b.candidates.length === 0) {
    res
      .status(200)
      .json({ success: false, message: "Candidates list can not be empty!" });
  } else {
    Placements.create(
      _b.candidates.map((user) => {
        return {
          passout_batch: _b.passout_batch,
          company_name: _b.company_name,
          job_profile: _b.job_profile,
          recruitment: _b.recruitment,
          recruitment_type: _b.recruitment_type,
          recruitment_date: _b.recruitment_date,
          intern_duration: _b.intern_duration,
          intern_stipend: _b.intern_stipend,
          package: _b.package,
          student_college_id: user.college_id,
          timestamp: new Date(),
          author: req.decoded.college_id,
          comments: _b.comments,
        };
      })
    )
      .then((data) => {
        console.log(data);
        res
          .status(200)
          .json({
            success: true,
            message: "Placements data successfully added.",
          });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(200)
          .json({
            success: false,
            message: "Something went wrong!",
            error: err,
          });
      });
  }
};
