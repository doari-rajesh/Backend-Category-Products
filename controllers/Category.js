const { json } = require("sequelize");
const Category = require("../models/Category");
const Product = require("../models/Product");

const createCategory = async (req, res) => {
  try {
    // get categoryName from req body
    const { categoryName } = req.body;

    // validate categoryName
    if (!categoryName) {
      return res.status(403).json({
        success: false,
        message: "Category is required",
      });
    }

    //  check category already exist or not
    const categoryExists = await Category.findOne({
      where: { categoryName: categoryName },
    });

    // console.log(categoryExists);

    if (categoryExists) {
      return res.status(403).json({
        success: false,
        message: "Category already exits",
      });
    }

    const newCategory = await Category.create({ categoryName: categoryName });

    // console.log(newCategory);

    return res.status(201).json({
      success: true,
      message: "category created successfully",
    });
  } catch (error) {
    console.error(error);

    // console.log("createCategoryControllerError : ", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllCategories = async (req, res) => {
  try {
    // get all categories from DB
    const categories = await Category.findAll();

    // console.log(categories);

    return res.status(200).json({
      success: true,
      message: "Categories fetch successfully",
      categories: categories,
    });
  } catch (error) {
    console.log(error);

    // console.log("getAllCategoriesError : ", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateCategory = async (req, res) => {
  // get id and categoryName from req body
  const { id } = req.params;
  const { categoryName } = req.body;
  try {
    // check category exist or not
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    console.log(category);
    // if category exists update it
    category.categoryName = categoryName;
    await category.save();

    return res.status(200).json({
      success: true,
      message: "category updated successfully",
      category: category,
    });
  } catch (error) {
    console.error(error);

    // console.log("updateCategoryControllerError : ", error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteCategory = async (req, res) => {
  // get id from req body
  const { id } = req.params;
  try {
    // Check if the category is associated with any products
    const products = await Product.findAll({ where: { CategoryId: id } });
    if (products.length > 0) {
      return res
        .status(400)
        .json({ message: "Cannot delete category with associated products" });
    }

    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    await category.destroy();
    return res
      .status(200)
      .json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    console.error(error);
    // console.log("deleteCategoryControllerError :", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
