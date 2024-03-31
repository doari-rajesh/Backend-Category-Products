const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Product = require("./Product");

const Category = sequelize.define("Category", {
  categoryName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Category.hasMany(Product);

module.exports = Category;
