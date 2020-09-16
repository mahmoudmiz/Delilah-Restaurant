const Sequelize = require("sequelize");
const db = require("./../config/database");
const Product = require("./Product");
const ProductOrder = require("./ProductOrder");
const Order = db.define("order", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  deliveryStatus: {
    type: Sequelize.STRING,
    defaultValue: "confirmed",
  },
  description: {
    type: Sequelize.STRING,
  },
  payment_method: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false,
  },
});

Order.belongsToMany(Product, { through: ProductOrder });
Product.belongsToMany(Order, { through: ProductOrder });
module.exports = Order;
