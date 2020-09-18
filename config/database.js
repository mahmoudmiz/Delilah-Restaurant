const Sequelize = require("sequelize");

// connecting to the database
module.exports = new Sequelize(
  process.env.DATABASE_URL ||
    `postgres://anyblykeimctiw:cabbcd8572fd5bde5a6fd9b746a80686a91de2a40ca919729c32505efecc7d52@ec2-54-146-142-58.compute-1.amazonaws.com:5432/dfaqg1rchorclc`,
  {
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // <<<<<<< YOU NEED THIS
      },
    },
  }
);
