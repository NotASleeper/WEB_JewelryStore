const { Op } = require('sequelize');
const { LiquidationForm, Employee } = require('../models');

const createLiquidationForm = async (req, res) => {
    const {
        id_employee_created,
        id_employee_accepted,
        date_created,
        date_accepted,
        total_price,
        product_status,
        status,
    } = req.body;
    try {
        const newLiquidationForm = await LiquidationForm.create({
            id_employee_created,
            id_employee_accepted,
            date_created,
            date_accepted,
            total_price,
            product_status,
            status,
        });
        res.status(201).send(newLiquidationForm);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getAllLiquidationForm = async (req, res) => {
    const { employee } = req.query;
    try {
        if (employee) {
            const LiquidationFormList = await LiquidationForm.findAll({
                where: {
                    status: 1,
                },
                include: [{
                    model: Employee,
                    as: "create",
                    where: {
                        name: {
                            [Op.like]: `%${employee}%`,
                        },
                        status: 1
                    }
                }]
            });
            res.status(200).send(LiquidationFormList);
        } else {
            const LiquidationFormList = await LiquidationForm.findAll({
                where: {
                    status: 1,
                },
                include: [{
                    model: Employee,
                    as: "create",
                    where: {
                        status: 1
                    }
                }]
            });
            res.status(200).send(LiquidationFormList);
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

const getDetailLiquidationForm = async (req, res) => {
    const { id } = req.params;
    try {
        const detailLiquidationForm = await LiquidationForm.findOne({
            where: {
                id: id,
                status: 1,
            },
            include: [{
                model: Employee,
                as: "create",
                where: {
                    status: 1
                }
            }, {
                model: Employee,
                as: "accept",
                required: false,
                where: {
                    status: 1
                }
            }]
        });
        res.status(200).send(detailLiquidationForm);
    } catch (error) {
        res.status(500).send(error);
    }
}

const updateLiquidationForm = async (req, res) => {
    const { id } = req.params;
    const {
        id_employee_created,
        id_employee_accepted,
        date_created,
        date_accepted,
        total_price,
        product_status
    } = req.body;
    try {
        const detailLiquidationForm = await LiquidationForm.findOne({
            where: {
                id: id,
                status: 1,
            }
        });
        detailLiquidationForm.id_employee_created = id_employee_created;
        detailLiquidationForm.id_employee_accepted = id_employee_accepted;
        detailLiquidationForm.date_created = date_created;
        detailLiquidationForm.date_accepted = date_accepted;
        detailLiquidationForm.total_price = total_price;
        detailLiquidationForm.product_status = product_status;
        await detailLiquidationForm.save();
        res.status(200).send(detailLiquidationForm);
    } catch (error) {
        res.status(500).send(error);
    }
}

const deleteLiquidationForm = async (req, res) => {
    const { id } = req.params;
    try {
        const detailLiquidationForm = await LiquidationForm.findOne({
            where: {
                id: id,
                status: 1,
            }
        });
        detailLiquidationForm.status = 0;
        await detailLiquidationForm.save();
        res.status(200).send(detailLiquidationForm);
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    createLiquidationForm,
    getAllLiquidationForm,
    getDetailLiquidationForm,
    updateLiquidationForm,
    deleteLiquidationForm,
}
