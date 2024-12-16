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

module.exports = {
    createCustomer,
}