const User = require("./../../models/User");
const userServices = require("../../utils/users-service");
module.exports = async (req, res, next) => {
  try {
    const userData = await userServices.identifyUser(req);
    const user = await User.findOne({ where: { email: `${userData.email}` } });
    if (user) {
      if (user.is_admin) {
        return next();
      } else {
        return res.status(401).json({
          message: "unauthorized",
        });
      }
    }
  } catch (err) {
    if (err.message) return res.status(500).json({ message: err.message });
    res.status(500).json({ message: "Internal server error" });
  }
};
