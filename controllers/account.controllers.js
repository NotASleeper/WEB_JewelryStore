const { Op } = require('sequelize');
const { Account, Employee, PositionEmployee } = require('../models');

const createAccount = async (req, res) => {
    const {
        id_employee,
        usename,
        password,
        status,
    } = req.body;
    try {
        const newAccount = await Account.create({
            id_employee,
            usename,
            password,
            status,
        });
        res.status(201).send(newAccount);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getAllAccount = async (req, res) => {
    try {
        const accountList = await Account.findAll({
            where: {
                status: 1,
            },
        });
        res.status(200).send(accountList);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getDetailAccount = async (req, res) => {
    const { id } = req.params;
    try {
        const detailAccount = await Account.findOne({
            where: {
                id: id,
                status: 1,
            },
            include: [{
                model: Employee,
                where: {
                    id: { [Op.col]: 'Account.id_employee' }
                },
                include: [{
                    model: PositionEmployee,
                    where: {
                        id: { [Op.col]: 'Employee.id_position' }
                    }
                }]
            }]
        });
        res.status(200).send(detailAccount);
    } catch (error) {
        res.status(500).send(error);
    }
}

const updateAccount = async (req, res) => {
    const { id } = req.params;
    const {
        id_employee,
        usename,
        password
    } = req.body;
    try {
        const detailAccount = await Account.findOne({
            where: {
                id: id,
                status: 1,
            }
        });
        detailAccount.id_employee = id_employee;
        detailAccount.usename = usename;
        detailAccount.password = password;
        await detailAccount.save();
        res.status(200).send(detailAccount);
    } catch (error) {
        res.status(500).send(error);
    }
}

const deleteAccount = async (req, res) => {
    const { id } = req.params;
    try {
        const detailAccount = await Account.findOne({
            where: {
                id: id,
                status: 1,
            }
        });
        detailAccount.status = 0;
        await detailAccount.save();
        res.status(200).send(detailAccount);
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    createAccount,
    getAllAccount,
    getDetailAccount,
    updateAccount,
    deleteAccount,
}
