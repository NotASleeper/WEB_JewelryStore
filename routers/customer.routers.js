const express = require('express');
const { createCustomer, getAllCustomer, getDetailCustomer } = require('../controllers/customer.controllers');

const customerRouter = express.Router();

customerRouter.post("/", createCustomer);
customerRouter.get("/", getAllCustomer);
customerRouter.get("/:id", getDetailCustomer);

module.exports = {
    customerRouter,
}