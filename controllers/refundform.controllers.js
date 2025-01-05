const { RefundForm } = require('../models');

const createRefundForm = async (req, res) => {
    const {
        id_employee,
        id_customer,
        id_order,
        id_product,
        date_created,
        note,
        status
    } = req.body;
    try {
        const newRefundForm = await RefundForm.create({
            id_employee,
            id_customer,
            id_order,
            id_product,
            date_created,
            note,
            status
        });
        res.status(201).send(newRefundForm);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getAllRefundForm = async (req, res) => {
    try {
        const RefundFormList = await RefundForm.findAll({
            where: {
                status: 1
            }
        });
        res.status(200).send(RefundFormList);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getDetailRefundForm = async (req, res) => {
    const { id } = req.params;
    try {
        const refundForm = await RefundForm.findOne({
            where: {
                id: id,
                status: 1
            }
        });
        res.status(200).send(refundForm);
    } catch (error) {
        res.status(500).send(error);
    }
};

const updateRefundForm = async (req, res) => {
    const { id } = req.params;
    const {
        id_employee,
        id_customer,
        id_order,
        id_product,
        date_created,
        note,
    } = req.body;
    try {
        const refundForm = await RefundForm.findOne({
            where: {
                id: id,
                status: 1
            }
        });
        refundForm.id_employee = id_employee;
        refundForm.id_customer = id_customer;
        refundForm.id_order = id_order;
        refundForm.id_product = id_product;
        refundForm.date_created = date_created;
        refundForm.note = note;
        await refundForm.save();
        res.status(200).send(refundForm);
    } catch (error) {
        res.status(500).send(error);
    }
};

const deleteRefundForm = async (req, res) => {
    const { id } = req.params;
    try {
        const refundForm = await RefundForm.findOne({
            where: {
                id: id,
                status: 1
            }
        });
        refundForm.status = 0;
        await refundForm.save();
        res.status(200).send(refundForm);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    createRefundForm,
    getAllRefundForm,
    getDetailRefundForm,
    updateRefundForm,
    deleteRefundForm,
};
