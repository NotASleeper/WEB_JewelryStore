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

const getAllEmployee = async (req, res) => {
    try {
        const employeeList = await Employee.findAll({
            where: {
                status: 1,
            }
        });
        res.status(200).send(employeeList);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getDetailEmployee = async (req, res) => {
    const { id } = req.params;
    try {
        const detailEmployee = await Employee.findOne({
            where: {
                id: id,
                status: 1,
            }
        });
        res.status(200).send(detailEmployee);
    } catch (error) {
        res.status(500).send(error);
    }
}

const updateEmployee = async (req, res) => {
    const { id } = req.params;
    const {
        name,
        address,
        phone,
        email,
        birthday,
    } = req.body;
    try {
        const detailEmployee = await Employee.findOne({
            where: {
                id: id,
                status: 1,
            }
        });
        detailEmployee.name = name;
        detailEmployee.address = address;
        detailEmployee.phone = phone;
        detailEmployee.email = email;
        detailEmployee.birthday = birthday;
        await detailEmployee.save();
        res.status(200).send(detailEmployee);
    } catch (error) {
        res.status(500).send(error);
    }
}

const deleteEmployee = async (req, res) => {
    const { id } = req.params;
    try {
        const detailEmployee = await Employee.findOne({
            where: {
                id: id,
                status: 1,
            }
        });
        detailEmployee.status = 0;
        await detailEmployee.save();
        res.status(200).send(detailEmployee);
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    createEmployee,
    getAllEmployee,
    getDetailEmployee,
    updateEmployee,
    deleteEmployee,
}