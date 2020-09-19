const User = require("../models/User");
const bcrypt = require("bcrypt");
const { Op, Sequelize } = require("sequelize");
const jwt = require("jsonwebtoken");

module.exports = {
  checkUser: async (req, res) => {
    if (req.body.email) {
      const user = await User.findOne({ where: { email: req.body.email } });
      return user;
    }
  },

  createUser: async (req) => {
    const { username, fullname, email, phone, address } = req.body;
    const hash = await bcrypt.hash(req.body.password, 10);

    if (hash) {
      const createdUser = await User.create({
        username,
        fullname,
        email,
        phone,
        address,
        password: hash,
      });

      return createdUser;
    }
  },

  findUser: async (req) => {
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { email: `${req.body.email || ""}` },
          { username: `${req.body.username || ""}` },
        ],
      },
    });

    return user;
  },

  checkUserPassword: async (req, user) => {
    const { password } = req.body;
    if (password) {
      const match = await bcrypt.compare(password, user.password);
      return match;
    }
  },

  identifyUser: async (req) => {
    if (req.headers.authorization !== undefined) {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      return decoded;
    } else {
      throw new Error(" Auth failed");
    }
  },
  deleteUser: async (req) => {
    const result = await User.destroy({
      where: {
        id: req.params.userId,
      },
    });

    return result;
  },
};
