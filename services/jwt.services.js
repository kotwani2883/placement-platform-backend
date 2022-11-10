const jwt = require("jsonwebtoken");
let secret = process.env.JWT_SECRET_TOKEN;

exports.encode = (data) => {
  let token = jwt.sign(
    {
      first_name: data.first_name,
      last_name: data.last_name,
      college_id: data.college_id,
    },
    secret
  );
  return token;
};

exports.decode = (token) => {
  return (decoded = jwt.verify(token, secret));
};
