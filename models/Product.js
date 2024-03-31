const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Category = require("./Category");

const Product = sequelize.define("Product", {
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});


module.exports = Product;
