const Sequelize = require("sequelize");

// connecting to the database
module.exports = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
});
