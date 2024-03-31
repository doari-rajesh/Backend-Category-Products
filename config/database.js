const { Sequelize } = require("sequelize");

const dotenv = require("dotenv");
dotenv.config();

// const sequelize = new Sequelize("product_db", "root", "root123", {
//   host: "localhost",
//   dialect: "mysql",
// });

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
  }
);

// try {
//   await sequelize.authenticate();
//   console.log('DB connected successfully.');
// } catch (error) {
//   console.log("DB not connected successfully.")
//   console.error('Unable to connect to the database:', error);
// }

// sequelize.sync({ force: true });

module.exports = sequelize;
