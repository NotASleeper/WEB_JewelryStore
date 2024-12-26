const { Employee } = require('../models');

const createEmployee = async (req, res) => {
    const {
        name,
        address,
        phone,
        email,
        birthday,
        status
    } = req.body;
    try {
        const newEmployee = await Employee.create({
            name,
            address,
            phone,
            email,
            birthday,
            status,
        });
        res.status(201).send(newEmployee);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    createEmployee,
}
