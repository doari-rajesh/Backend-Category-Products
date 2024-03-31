const express = require("express");
const router = express.Router();

const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/Product");

router.get("/getProducts", getProducts);
router.post("/createProduct", createProduct);
router.put("/updateProduct", updateProduct);
router.delete("/deleteProduct", deleteProduct);

module.exports = router;
