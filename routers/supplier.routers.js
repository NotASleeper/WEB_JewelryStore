const { Supplier } = require('../models');
const express = require('express');
const { getAllSupplier, getDetailSupplier } = require('../controllers/supplier.controllers');
const { checkExist } = require('../middlewares/validations/checkExist');

const supplierRouter = express.Router();

supplierRouter.get("/", getAllSupplier);
supplierRouter.get("/:id", checkExist(Supplier), getDetailSupplier);

module.exports = {
    supplierRouter,
}