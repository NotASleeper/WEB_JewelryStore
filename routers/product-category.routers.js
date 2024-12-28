const express = require('express');
const { createProductCategory, getAllProductCategory, getDetailProductCategory, updateProductCategory, deleteProductCategory } = require('../controllers/product-category.controllers');

const productCategoryRouter = express.Router();

productCategoryRouter.post("/", createProductCategory);
productCategoryRouter.get("/", getAllProductCategory);
productCategoryRouter.get("/:id", getDetailProductCategory);
productCategoryRouter.put("/:id", updateProductCategory);
productCategoryRouter.delete("/:id", deleteProductCategory);

module.exports = {
    productCategoryRouter,
}