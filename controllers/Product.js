const Product = require("../models/Product");
const Category = require("../models/Category");

const getProducts = async (req, res) => {
  let previous;
  const pageSize = 10;

  // get page form req query
  const page = req.query.page || 1;

  // previous logic
  previous = page > 1 ? page - 1 : false;

  // offset logic
  const offset = (page - 1) * pageSize;

  try {
    const productLength = await Product.findAll();
    // console.log("productLength", productLength);
    const products = await Product.findAll({
      include: [Category],
      offset,
      limit: pageSize,
    });
    return res.status(200).json({
      sucess: true,
      previous: previous,
      data: products,
      productLength: productLength.length,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: err.message });
  }
};

const createProduct = async (req, res) => {
  // console.log(req.body);
  const { productName, categoryid } = req.body;
  console.log(productName, categoryid);
  // console.log(typeof parseInt(categoryid));
  try {
    // const newProduct = await Product.create({ productName: productName });
    const newProduct = await Product.create({
      productName: productName,
      CategoryId: categoryid,
    });

    return res.status(201).json({
      success: true,
      message: "product created",
      product: newProduct,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const updateProduct = async (req, res) => {
  // console.log(req.body);
  const { id, productName } = req.body;
  // console.log(id, productName);

  try {
    const updatedProduct = await Product.update(
      { productName: productName },
      {
        where: {
          id: id,
        },
      }
    );
    // console.log(updatedProduct);
    res.status(200).json({
      success: true,
      message: "product fields updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in updating product",
    });
  }
};

const deleteProduct = async (req, res) => {
  // console.log(req.body);
  const { id } = req.body;
  try {
    const deletedProduct = await Product.destroy({
      where: {
        id: id,
      },
    });
    // console.log(typeof deletedProduct);
    if (!deletedProduct) {
      return res.status(400).json({
        success: false,
        message: "could not find product",
      });
    }

    return res.status(200).json({
      success: true,
      message: "deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = { getProducts, createProduct, updateProduct, deleteProduct };
