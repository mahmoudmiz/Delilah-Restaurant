const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    console.log("this is the fucken jwt key" + process.env.JWT_KEY);
    console.log(req.headers.authorization);
    console.log(req.headers);
    console.log(req.headers.authorization.split(" ")[1]);
    const token = req.headers.authorization.split(" ")[1];
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
