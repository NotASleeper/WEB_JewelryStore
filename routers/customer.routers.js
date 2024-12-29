const { Customer } = require('../models');
const express = require('express');
const { createCustomer, getAllCustomer, getDetailCustomer, updateCustomer, deleteCustomer } = require('../controllers/customer.controllers');
const { checkExist } = require('../middlewares/validations/checkExist');

const customerRouter = express.Router();

customerRouter.post("/", createCustomer);
customerRouter.get("/", getAllCustomer);
customerRouter.get("/:id", getDetailCustomer);
customerRouter.put("/:id", checkExist(Customer), updateCustomer);
customerRouter.delete("/:id", checkExist(Customer), deleteCustomer);

module.exports = {
    customerRouter,
}