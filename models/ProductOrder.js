const Sequelize = require("sequelize");
const db = require("./../config/database");
const ProductOrder = db.define("product_order", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
});

module.exports = ProductOrder;
