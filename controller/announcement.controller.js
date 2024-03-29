let Announcement = require("../models/announcement.model");
let User = require("../models/user.model");

exports.add = (req, res) => {
  const _b = req.body;
  console.log(_b);
  console.log(_b.recipent);
  Announcement.create({
    title: _b.title,
    announcement_message: _b.announcement_message,
    instruction: req.instruction,
    deadline: _b.deadline,
    recipent: _b.recipent,
  })
    .then((data) => {
      res.status(200).json({
        success: true,
        message: "Announcement successfully Added.",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(200)
        .json({ success: false, message: "Something went wrong!" });
    });
};

exports.getAll = async (req, res) => {
  console.log(req.query.college_id);
  const user = await User.find({
    college_id: req.query.college_id,
  }).select("placed_in");
  console.log(user[0].placed_in);
  Announcement.find({
    recipent: { $in: user[0].placed_in },
  })
    .then((announcements) => {
      res.status(200).json({ success: true, announcements: announcements });
      console.log(announcements);
    })
    .catch((err) => {
      res
        .status(200)
        .json({ success: false, message: "Something went wrong!" });
    });
};
