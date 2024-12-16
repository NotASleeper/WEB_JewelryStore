const express = require('express');
const { createCustomer } = require('../controllers/customer.controllers');

const customerRouter = express.Router();

customerRouter.post("/", createCustomer);

module.exports = {
    customerRouter,
}