const { ServiceActivity } = require('../models');

const createServiceActivity = async (req, res) => {
    const {
        id_category,
        name_activity,
        price,
        status
    } = req.body;
    try {
        const newServiceActivity = await ServiceActivity.create({
            id_category,
            name_activity,
            price,
            status
        });
        res.status(201).send(newServiceActivity);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getAllServiceActivity = async (req, res) => {
    try {
        const serviceActivityList = await ServiceActivity.findAll({
            where: {
                status: 1
            }
        });
        res.status(200).send(serviceActivityList);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getDetailServiceActivity = async (req, res) => {
    const { id } = req.params;
    try {
        const serviceActivity = await ServiceActivity.findOne({
            where: {
                id: id,
                status: 1
            }
        });
        res.status(200).send(serviceActivity);
    } catch (error) {
        res.status(500).send(error);
    }
};

const updateServiceActivity = async (req, res) => {
    const { id } = req.params;
    const {
        id_category,
        name_activity,
        price,
    } = req.body;
    try {
        const serviceActivity = await ServiceActivity.findOne({
            where: {
                id: id,
                status: 1
            }
        });
        serviceActivity.id_category = id_category;
        serviceActivity.name_activity = name_activity;
        serviceActivity.price = price;
        await serviceActivity.save();
        res.status(200).send(serviceActivity);
    } catch (error) {
        res.status(500).send(error);
    }
};

const deleteServiceActivity = async (req, res) => {
    const { id } = req.params;
    try {
        const serviceActivity = await ServiceActivity.findOne({
            where: {
                id: id,
                status: 1
            }
        });
        serviceActivity.status = 0;
        await serviceActivity.save();
        res.status(200).send(serviceActivity);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    createServiceActivity,
    getAllServiceActivity,
    getDetailServiceActivity,
    updateServiceActivity,
    deleteServiceActivity,
};
