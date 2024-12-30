const { OrderForm } = require('../models')
const express = require('express');
const { createOrderForm, getAllOrderForm, getDetailOrderForm, updateOrderForm, deleteOrderForm } = require('../controllers/orderform.controllers');
const { checkExist } = require('../middlewares/validations/checkExist');

const orderFormRouter = express.Router();

orderFormRouter.post("/", createOrderForm);
orderFormRouter.get("/", getAllOrderForm);
orderFormRouter.get("/:id", checkExist(OrderForm), getDetailOrderForm);
orderFormRouter.put("/:id", checkExist(OrderForm), updateOrderForm);
orderFormRouter.delete("/:id", checkExist(OrderForm), deleteOrderForm);

module.exports = {
    orderFormRouter,
}