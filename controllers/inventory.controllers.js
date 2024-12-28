//Chắc không cần dùng cái này
//Gộp chung bên product rồi

const { Inventory } = require('../models');

const createInventory = async (req, res) => {
    const {
        id,
        quantity
    } = req.body;
    try {
        const newInventory = await Inventory.create({
            id,
            quantity
        });
        res.status(201).send(newInventory);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getAllInventory = async (req, res) => {
    try {
        const inventoryList = await Inventory.findAll({
            where: {}
        });
        res.status(200).send(inventoryList);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getDetailInventory = async (req, res) => {
    const { id } = req.params;
    try {
        const detailInventory = await Inventory.findOne({
            where: {
                id: id,
            }
        });
        res.status(200).send(detailInventory);
    } catch (error) {
        res.status(500).send(error);
    }
}

const updateInventory = async (req, res) => {
    const { id } = req.params;
    const {
        quantity
    } = req.body;
    try {
        const detailInventory = await Inventory.findOne({
            where: {
                id: id,
            }
        });
        detailInventory.quantity = quantity;
        await detailInventory.save();
        res.status(200).send(detailInventory);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    createInventory,
    getAllInventory,
    getDetailInventory,
    updateInventory
}