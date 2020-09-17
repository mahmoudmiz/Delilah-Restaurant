require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.Authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    if (decoded) {
      next();
    }
  } catch (error) {
    return res.status(401).json({
      message: "auth failed",
    });
  }
};
