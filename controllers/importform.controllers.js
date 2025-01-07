const { Op } = require('sequelize');
const { ImportForm, Supplier, Employee } = require('../models');

const createImportForm = async (req, res) => {
    const {
        id_supplier,
        id_employee,
        id_employee_accepted,
        date_created,
        date_accepted,
        total_price,
        status,
    } = req.body;
    try {
        const newImportForm = await ImportForm.create({
            id_supplier,
            id_employee,
            id_employee_accepted,
            date_created,
            date_accepted,
            total_price,
            status
        });
        res.status(201).send(newImportForm);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getAllImportForm = async (req, res) => {
    const { supplier } = req.query;
    try {
        if (supplier) {
            const ImportFormList = await ImportForm.findAll({
                where: {
                    status: 1,
                },
                include: [
                    {
                        model: Supplier,
                        where: {
                            name: {
                                [Op.like]: `%${supplier}%`,
                            },
                            status: 1
                        }
                    },
                    {
                        model: Employee,
                        as: "create",
                        where: {
                            status: 1
                        }
                    }
                ]
            });
            res.status(200).send(ImportFormList);
        } else {
            const ImportFormList = await ImportForm.findAll({
                where: {
                    status: 1,
                },
                include: [
                    {
                        model: Supplier,
                        where: {
                            status: 1,
                        }
                    },
                    {
                        model: Employee,
                        as: "create",
                        where: {
                            status: 1
                        }
                    }
                ]
            });
            res.status(200).send(ImportFormList);
        }

    } catch (error) {
        res.status(500).send(error);
    }
}

const getDetailImportForm = async (req, res) => {
    const { id } = req.params;
    try {
        const detailImportForm = await ImportForm.findOne({
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
            }, {
                model: Supplier
            }]
        });
        res.status(200).send(detailImportForm);
    } catch (error) {
        res.status(500).send(error);
    }
}

const updateImportForm = async (req, res) => {
    const { id } = req.params;
    const {
        id_supplier,
        id_employee,
        id_employee_accepted,
        date_created,
        date_accepted,
        total_price
    } = req.body;
    try {
        const detailImportForm = await ImportForm.findOne({
            where: {
                id: id,
                status: 1,
            }
        });
        detailImportForm.id_supplier = id_supplier;
        detailImportForm.id_employee = id_employee;
        detailImportForm.id_employee_accepted = id_employee_accepted;
        detailImportForm.date_created = date_created;
        detailImportForm.date_accepted = date_accepted;
        detailImportForm.total_price = total_price;
        await detailImportForm.save();
        res.status(200).send(detailImportForm);
    } catch (error) {
        res.status(500).send(error);
    }
}

const deleteImportForm = async (req, res) => {
    const { id } = req.params;
    try {
        const detailImportForm = await ImportForm.findOne({
            where: {
                id: id,
                status: 1,
            }
        });
        detailImportForm.status = 0;
        await detailImportForm.save();
        res.status(200).send(detailImportForm);
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    createImportForm,
    getAllImportForm,
    getDetailImportForm,
    updateImportForm,
    deleteImportForm,
}
