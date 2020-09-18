const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, process.env.JWT_KEY, function (err, decoded) {
      if (err) return res.status(500).json({ message: "jwt err" });
      if (decoded) {
        return next();
      }
    });
  } catch (error) {
    return res.status(401).json({
      message: "auth failed",
    });
  }
};
