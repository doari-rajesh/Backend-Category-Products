const express = require("express");
const router = express.Router();

const {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/Category");

router.get("/getCategories", getAllCategories);
router.post("/createCategory", createCategory);
router.put("/categories/:id", updateCategory);
router.delete("/categories/:id", deleteCategory);

module.exports = router;
