const express = require('express');
const { createProduct, getAllProduct, getDetailProduct, updateProduct, deleteProduct, getProductByCategoryID, getProductByCategoryName } = require('../controllers/product.controllers');

const productRouter = express.Router();

productRouter.post("/", createProduct);
productRouter.get("/", getAllProduct);
productRouter.get("/:id", getDetailProduct);
productRouter.put("/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);
productRouter.get("/category/:id_category", getProductByCategoryID);
productRouter.get("/category-name/:category_name", getProductByCategoryName);

module.exports = {
    productRouter,
}