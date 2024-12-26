const express = require('express');
const { createCustomer, getAllCustomer, getDetailCustomer, updateCustomer, deleteCustomer } = require('../controllers/customer.controllers');

const customerRouter = express.Router();

customerRouter.post("/", createCustomer);
customerRouter.get("/", getAllCustomer);
customerRouter.get("/:id", getDetailCustomer);
customerRouter.put("/:id", updateCustomer);
customerRouter.delete("/:id", deleteCustomer);

module.exports = {
    customerRouter,
}