const { OrderForm, Customer, Employee } = require('../models');

const createOrderForm = async (req, res) => {
    const {
        id_customer,
        id_employee,
        is_used_point,
        id_coupon,
        total_price,
        date_created,
        date_payment,
        status,
        is_preordered
    } = req.body;
    try {
        const newOrderForm = await OrderForm.create({
            id_customer,
            id_employee,
            is_used_point,
            id_coupon,
            total_price,
            date_created,
            date_payment,
            status,
            is_preordered
        });
        res.status(201).send(newOrderForm);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getAllOrderForm = async (req, res) => {
    try {
        const OrderFormList = await OrderForm.findAll({
            where: {
                status: 1,
            }
        });
        res.status(200).send(OrderFormList);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getDetailOrderForm = async (req, res) => {
    const { id } = req.params;
    try {
        const detailOrderForm = await OrderForm.findOne({
            where: {
                id: id,
                status: 1,
            },
            include: [{
                model: Customer,
            }, {
                model: Employee,
            }]
        });
        res.status(200).send(detailOrderForm);
    } catch (error) {
        res.status(500).send(error);
    }
}

const updateOrderForm = async (req, res) => {
    const { id } = req.params;
    const {
        id_customer,
        id_employee,
        is_used_point,
        id_coupon,
        total_price,
        date_created,
        date_payment,
        is_preordered,
    } = req.body;
    try {
        const detailOrderForm = await OrderForm.findOne({
            where: {
                id: id,
                status: 1,
            }
        });
        detailOrderForm.id_customer = id_customer;
        detailOrderForm.id_employee = id_employee;
        detailOrderForm.is_used_point = is_used_point;
        detailOrderForm.id_coupon = id_coupon;
        detailOrderForm.total_price = total_price;
        detailOrderForm.date_created = date_created;
        detailOrderForm.date_payment = date_payment;
        detailOrderForm.is_preordered = is_preordered;
        await detailOrderForm.save();
        res.status(200).send(detailOrderForm);
    } catch (error) {
        res.status(500).send(error);
    }
}

const deleteOrderForm = async (req, res) => {
    const { id } = req.params;
    try {
        const detailOrderForm = await OrderForm.findOne({
            where: {
                id: id,
                status: 1,
            }
        });
        detailOrderForm.status = 0;
        await detailOrderForm.save();
        res.status(200).send(detailOrderForm);
    } catch (error) {
        res.status(500).send(error)
    }
}

const getAllOrderFormByCustomer = async (req, res) => {
    const { id } = req.params;
    try {
        const OrderFormList = await OrderForm.findAll({
            where: {
                id_customer: id,
                status: 1,
            }
        });
        res.status(200).send(OrderFormList);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    createOrderForm,
    getAllOrderForm,
    getDetailOrderForm,
    updateOrderForm,
    deleteOrderForm,
    getAllOrderFormByCustomer,
}
