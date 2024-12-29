const { ProductCategory } = require('../models')
const express = require('express');
const { createProductCategory, getAllProductCategory, getDetailProductCategory, updateProductCategory, deleteProductCategory } = require('../controllers/product-category.controllers');
const { checkExist } = require('../middlewares/validations/checkExist');

const productCategoryRouter = express.Router();

productCategoryRouter.post("/", createProductCategory);
productCategoryRouter.get("/", getAllProductCategory);
productCategoryRouter.get("/:id", checkExist(ProductCategory), getDetailProductCategory);
productCategoryRouter.put("/:id", checkExist(ProductCategory), updateProductCategory);
productCategoryRouter.delete("/:id", checkExist(ProductCategory), deleteProductCategory);

module.exports = {
    productCategoryRouter,
}