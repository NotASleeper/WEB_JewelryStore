const { OrderDetail, OrderForm } = require('../models')
const express = require('express');
const { createOrderDetail, getAllOrderDetail, getDetailOrderDetail, updateOrderDetail, deleteOrderDetail, getAllOrderDetailByOrder } = require('../controllers/orderdetail.controllers');
const { checkExistOrderDetail, checkExist } = require('../middlewares/validations/checkExist');

const orderDetailRouter = express.Router();

orderDetailRouter.post("/", createOrderDetail);
orderDetailRouter.get("/", getAllOrderDetail);
orderDetailRouter.get("/form/:id", checkExist(OrderForm), getAllOrderDetailByOrder);
orderDetailRouter.get("/:id_order/:id_product", checkExistOrderDetail(OrderDetail), getDetailOrderDetail);
orderDetailRouter.put("/:id_order/:id_product", checkExistOrderDetail(OrderDetail), updateOrderDetail);
orderDetailRouter.delete("/:id_order/:id_product", checkExistOrderDetail(OrderDetail), deleteOrderDetail);

module.exports = {
    orderDetailRouter,
}