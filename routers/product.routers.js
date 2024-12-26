const express = require('express');
const { createProduct, getAllProduct, getDetailProduct, updateProduct, deleteProduct } = require('../controllers/product.controllers');

const productRouter = express.Router();

productRouter.post("/", createProduct);
productRouter.get("/", getAllProduct);
productRouter.get("/:id", getDetailProduct);
productRouter.put("/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);

module.exports = {
    productRouter,
}