const { OrderDetail } = require('../models')
const express = require('express');
const { createOrderDetail, getAllOrderDetail, getDetailOrderDetail, updateOrderDetail, deleteOrderDetail } = require('../controllers/orderdetail.controllers');
const { checkExist } = require('../middlewares/validations/checkExist');

const orderDetailRouter = express.Router();

orderDetailRouter.post("/", createOrderDetail);
orderDetailRouter.get("/", getAllOrderDetail);
orderDetailRouter.get("/:id", checkExist(OrderDetail), getDetailOrderDetail);
orderDetailRouter.put("/:id", checkExist(OrderDetail), updateOrderDetail);
orderDetailRouter.delete("/:id", checkExist(OrderDetail), deleteOrderDetail);

module.exports = {
    orderDetailRouter,
}