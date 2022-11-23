const User = require("../models/user.model");
const Company = require("../models/company.model");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

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
    console.log(companies);
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
      res.status(200).json({
        success: true,
        message: "Successfully new company added.",
        data: data,
      });
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
//Update only those which has placed in length 0
//Or those which are allowed
exports.validate = (req, res) => {
  console.log(req.body);
  User.updateMany(
    {
      $or: [
        {
          $and: [
            ({ aggregate_cgpa: { $gt: req.body.min_cgpa } },
            { placed_in: { $in: req.body.companies_allowed } }),
          ],
        },
        {
          $and: [
            ({ aggregate_cgpa: { $gt: req.body.min_cgpa } },
            { placed_in: { $eq: [] } }),
          ],
        },
      ],
    },
    { $push: { companies_allowed: req.body.company_name } }
  )
    .then(async (data) => {
      res.status(200).json({
        success: true,
        message: "Successfully Validated and upgraded",
        data: data,
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

exports.sendEmails = async (req, res) => {
  const user = await User.find({
    companies_allowed: { $in: req.query.company_name },
  }).select("personal_email");
  // console.log(user);
  for (let i = 0; i < user.length; i++) {
    console.log(user[i].personal_email);
    let mailTransporter = await nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "placementcell.ietdavv@gmail.com",
        pass: "hyzagqzrihfhdtxl",
      },
      tls: {
        rejectUnauthorized: false,
      },
      port: 465,
      host: "smtp.gmail.com",
    });

    let mailDetails = {
      from: "placementcell.ietdavv@gmail.com",
      to: user[i].personal_email,
      subject: `${req.query.company_name} is visting IET DAVV`,
      text: `${req.query.company_name} is visiting our Campus.Kindly login to the portal and Apply for the same if you are intrested.`,
    };

    mailTransporter.sendMail(mailDetails, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log("Email sent successfully");
      }
    });
  }
  res.status(200).json({
    success: true,
    message: "Mail sent successfully",
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

exports.getCountOfAllCompanies = async (req, res) => {
  try {
    const data = await Company.count();

    res.status(200).json({ success: true, data: data });
    console.log(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};
