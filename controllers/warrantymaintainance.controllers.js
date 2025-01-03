const { WarrantyMaintainance } = require('../models');

const createWarrantyMaintainance = async (req, res) => {
    const {
        id_employee,
        id_customer,
        id_order,
        id_product,
        id_category,
        id_activity,
        date_created,
        type,
        name_product,
        image,
        surcharge,
        total_price,
        status
    } = req.body;
    try {
        const newWarrantyMaintainance = await WarrantyMaintainance.create({
            id_employee,
            id_customer,
            id_order,
            id_product,
            id_category,
            id_activity,
            date_created,
            type,
            name_product,
            image,
            surcharge,
            total_price,
            status
        });
        res.status(201).send(newWarrantyMaintainance);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getAllWarrantyMaintainance = async (req, res) => {
    try {
        const WarrantyMaintainanceList = await WarrantyMaintainance.findAll({
            where: {
                status: 1
            }
        });
        res.status(200).send(WarrantyMaintainanceList);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getDetailWarrantyMaintainance = async (req, res) => {
    const { id } = req.params;
    try {
        const warrantyMaintainance = await WarrantyMaintainance.findOne({
            where: {
                id: id,
                status: 1
            }
        });
        res.status(200).send(warrantyMaintainance);
    } catch (error) {
        res.status(500).send(error);
    }
};

const updateWarrantyMaintainance = async (req, res) => {
    const { id } = req.params;
    const {
        id_employee,
        id_customer,
        id_order,
        id_product,
        id_category,
        id_activity,
        date_created,
        type,
        name_product,
        image,
        surcharge,
        total_price
    } = req.body;
    try {
        const warrantyMaintainance = await WarrantyMaintainance.findOne({
            where: {
                id: id,
                status: 1
            }
        });
        warrantyMaintainance.id_employee = id_employee;
        warrantyMaintainance.id_customer = id_customer;
        warrantyMaintainance.id_order = id_order;
        warrantyMaintainance.id_product = id_product;
        warrantyMaintainance.id_category = id_category;
        warrantyMaintainance.id_activity = id_activity;
        warrantyMaintainance.date_created = date_created;
        warrantyMaintainance.type = type;
        warrantyMaintainance.name_product = name_product;
        warrantyMaintainance.image = image;
        warrantyMaintainance.surcharge = surcharge;
        warrantyMaintainance.total_price = total_price;
        await warrantyMaintainance.save();
        res.status(200).send(warrantyMaintainance);
    } catch (error) {
        res.status(500).send(error);
    }
};

const deleteWarrantyMaintainance = async (req, res) => {
    const { id } = req.params;
    try {
        const warrantyMaintainance = await WarrantyMaintainance.findOne({
            where: {
                status: 1
            }
        });
        warrantyMaintainance.status = 0;
        await warrantyMaintainance.save();
        res.status(200).send(warrantyMaintainance);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    createWarrantyMaintainance,
    getAllWarrantyMaintainance,
    getDetailWarrantyMaintainance,
    updateWarrantyMaintainance,
    deleteWarrantyMaintainance,
};