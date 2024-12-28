const { PositionEmployee } = require('../models');

const createPositionEmployee = async (req, res) => {
    const {
        name_position,
        status
    } = req.body;
    try {
        const newPositionEmployee = await PositionEmployee.create({
            name_position,
            status
        });
        res.status(201).send(newPositionEmployee);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getAllPositionEmployee = async (req, res) => {
    try {
        const PositionEmployeeList = await PositionEmployee.findAll({
            where: {
                status: 1,
            }
        });
        res.status(200).send(PositionEmployeeList);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getDetailPositionEmployee = async (req, res) => {
    const { id } = req.params;
    try {
        const detailPositionEmployee = await PositionEmployee.findOne({
            where: {
                id: id,
                status: 1,
            }
        });
        res.status(200).send(detailPositionEmployee);
    } catch (error) {
        res.status(500).send(error);
    }
}

const updatePositionEmployee = async (req, res) => {
    const { id } = req.params;
    const {
        name_position
    } = req.body;
    try {
        const detailPositionEmployee = await PositionEmployee.findOne({
            where: {
                id: id,
                status: 1,
            }
        });
        detailPositionEmployee.name_position = name_position;
        await detailPositionEmployee.save();
        res.status(200).send(detailPositionEmployee);
    } catch (error) {
        res.status(500).send(error);
    }
}

const deletePositionEmployee = async (req, res) => {
    const { id } = req.params;
    try {
        const detailPositionEmployee = await PositionEmployee.findOne({
            where: {
                id: id,
                status: 1,
            }
        });
        detailPositionEmployee.status = 0;
        await detailPositionEmployee.save();
        res.status(200).send(detailPositionEmployee);
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    createPositionEmployee,
    getAllPositionEmployee,
    getDetailPositionEmployee,
    updatePositionEmployee,
    deletePositionEmployee,
}