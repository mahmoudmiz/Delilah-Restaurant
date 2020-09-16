const Sequelize = require("sequelize");
const db = require("./../config/database");

const Product = db.define("product", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },

  description: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false,
  },
  img: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Product;
