const { OrderDetail } = require('../models')
const express = require('express');
const { createOrderDetail, getAllOrderDetail, getDetailOrderDetail, updateOrderDetail, deleteOrderDetail } = require('../controllers/orderdetail.controllers');
const { checkExistOrderDetail } = require('../middlewares/validations/checkExist');

const orderDetailRouter = express.Router();

orderDetailRouter.post("/", createOrderDetail);
orderDetailRouter.get("/", getAllOrderDetail);
orderDetailRouter.get("/:id_order/:id_product", checkExistOrderDetail(OrderDetail), getDetailOrderDetail);
orderDetailRouter.put("/:id_order/:id_product", checkExistOrderDetail(OrderDetail), updateOrderDetail);
orderDetailRouter.delete("/:id_order/:id_product", checkExistOrderDetail(OrderDetail), deleteOrderDetail);

module.exports = {
    orderDetailRouter,
}