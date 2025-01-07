const { Product, ProductCategory } = require('../models')
const express = require('express');
const { createProduct, getAllProduct, getDetailProduct, updateProduct, deleteProduct, getProductByCategoryID, getProductByCategoryName } = require('../controllers/product.controllers');
const { checkExist } = require('../middlewares/validations/checkExist');
const uploadCloud = require('../middlewares/upload/cloudinary');

const productRouter = express.Router();

productRouter.post("/", uploadCloud.array('img'), createProduct);
productRouter.get("/", getAllProduct);
productRouter.get("/:id", checkExist(Product), getDetailProduct);
productRouter.put("/:id", checkExist(Product), updateProduct);
productRouter.delete("/:id", checkExist(Product), deleteProduct);
productRouter.get("/category/:id_category", getProductByCategoryID);
productRouter.get("/category-name/:category_name", getProductByCategoryName);

module.exports = {
    productRouter,
}