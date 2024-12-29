const { Op } = require('sequelize');
const { Account, Employee, PositionEmployee } = require('../models');

const createAccount = async (req, res) => {
    const {
        id_employee,
        username,
        password,
        status,
    } = req.body;
    try {
        const newAccount = await Account.create({
            id_employee,
            username,
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
        username,
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
        detailAccount.username = username;
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

const login = async (req, res) => {
    const {
        username,
        password } = req.body;
    const account = await Account.findOne({
        where: {
            username: username,
        }
    })
    if (!account) {
        res.status(404).send("Not found");
    }
    var isAuth = (password == account.password);
    if (isAuth) {
        req.session.userId = account.id;
        req.session.username = account.username;
        res.status(200).send("Login succeeded", id_employee);
    } else {
        res.status(500).send("Username or password is not correct");
    }
}

module.exports = {
    createAccount,
    getAllAccount,
    getDetailAccount,
    updateAccount,
    deleteAccount,
    login,
}
