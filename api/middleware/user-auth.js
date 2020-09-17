require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  console.log(req.headers);
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_KEY);
  console.log(token);
  console.log(decoded);

  if (decoded) {
    return next();
  }

  return res.status(401).json({
    message: "auth failed",
  });
};
