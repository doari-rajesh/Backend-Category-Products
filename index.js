const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");

const Category = require("./models/Category");
const Product = require("./models/Product");

// category controllers
const {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} = require("./controllers/Category");

// products controllers
const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("./controllers/Product");

// database connection
const sequelize = require("./config/database");
sequelize
  .authenticate()
  .then(() => {
    console.log("DB connected successfully.");
  })
  .catch((error) => {
    console.log("DB not connected successfully.");
    console.error(error);
  });

// Category.sync({ force: true });
// Product.sync({ force: true });

// Drop models
// Category.drop();
// Product.drop();

Product.belongsTo(Category);

// Synchronize all model at once
sequelize.sync();

// middlewares
app.use(express.json());
app.use(cors());

// default route
app.get("/", (req, res) => {
  res.send("<h1>Backend is running</h1>");
});

// category routes
const categoryRoutes = require("./routes/Category");
// product routes
const productRoutes = require("./routes/Product");

app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// category routes
// app.get("/getCategories", getAllCategories);
// app.post("/createCategory", createCategory);
// app.put("/categories/:id", updateCategory);
// app.delete("/categories/:id", deleteCategory);

// product routes
// app.get("/getProducts", getProducts);
// app.post("/createProduct", createProduct);
// app.put("/updateProduct", updateProduct);
// app.delete("/deleteProduct", deleteProduct);

// Creating Server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
