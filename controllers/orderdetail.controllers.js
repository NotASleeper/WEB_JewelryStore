const { OrderDetail } = require('../models');

const createOrderDetail = async (req, res) => {
    const {
        id_order,
        id_product,
        quantity,
        request,
        surcharge,
        total,
        status,
    } = req.body;
    try {
        const newOrderDetail = await OrderDetail.create({
            id_order,
            id_product,
            quantity,
            request,
            surcharge,
            total,
            status,
        });
        res.status(201).send(newOrderDetail);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getAllOrderDetail = async (req, res) => {
    try {
        const OrderDetailList = await OrderDetail.findAll({
            where: {
                status: 1,
            }
        });
        res.status(200).send(OrderDetailList);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getDetailOrderDetail = async (req, res) => {
    const { id } = req.params;
    try {
        const detailOrderDetail = await OrderDetail.findOne({
            where: {
                id: id,
                status: 1,
            }
        });
        res.status(200).send(detailOrderDetail);
    } catch (error) {
        res.status(500).send(error);
    }
}

const updateOrderDetail = async (req, res) => {
    const { id } = req.params;
    const {
        id_order,
        id_product,
        quantity,
        request,
        surcharge,
        total,
    } = req.body;
    try {
        const detailOrderDetail = await OrderDetail.findOne({
            where: {
                id: id,
                status: 1,
            }
        });
        detailOrderDetail.id_order = id_order;
        detailOrderDetail.id_product = id_product;
        detailOrderDetail.quantity = quantity;
        detailOrderDetail.request = request;
        detailOrderDetail.surcharge = surcharge;
        detailOrderDetail.total = total;
        await detailOrderDetail.save();
        res.status(200).send(detailOrderDetail);
    } catch (error) {
        res.status(500).send(error);
    }
}

const deleteOrderDetail = async (req, res) => {
    const { id } = req.params;
    try {
        const detailOrderDetail = await OrderDetail.findOne({
            where: {
                id: id,
                status: 1,
            }
        });
        detailOrderDetail.status = 0;
        await detailOrderDetail.save();
        res.status(200).send(detailOrderDetail);
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    createOrderDetail,
    getAllOrderDetail,
    getDetailOrderDetail,
    updateOrderDetail,
    deleteOrderDetail,
}