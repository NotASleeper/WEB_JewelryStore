const { Customer } = require('../models');

const createCustomer = async (req, res) => {
    const {
        name,
        address,
        phone,
        email,
        birthday,
        loyalty_point,
        accumulated_point,
        status
    } = req.body;
    try {
        const newCustomer = await Customer.create({
            name,
            address,
            phone,
            email,
            birthday,
            loyalty_point,
            accumulated_point,
            status
        });
        res.status(201).send(newCustomer);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getAllCustomer = async (req, res) => {
    try {
        const customerList = await Customer.findAll({
            where: {
                status: 1,
            }
        });
        res.status(200).send(customerList);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getDetailCustomer = async (req, res) => {
    const { id } = req.params;
    try {
        const detailCustomer = await Customer.findOne({
            where: {
                id: id,
                status: 1,
            }
        });
        res.status(200).send(detailCustomer);
    } catch (error) {
        res.status(500).send(error);
    }
}

const updateCustomer = async (req, res) => {
    const { id } = req.params;
    const {
        name,
        address,
        phone,
        email,
        birthday,
        loyalty_point,
        accumulated_point,
    } = req.body;
    try {
        const detailCustomer = await Customer.findOne({
            where: {
                id: id,
                status: 1,
            }
        });
        detailCustomer.name = name;
        detailCustomer.address = address;
        detailCustomer.phone = phone;
        detailCustomer.email = email;
        detailCustomer.birthday = birthday;
        detailCustomer.loyalty_point = loyalty_point;
        detailCustomer.accumulated_point = accumulated_point;
        await detailCustomer.save();
        res.status(200).send(detailCustomer);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    createCustomer,
    getAllCustomer,
    getDetailCustomer,
    updateCustomer,
}