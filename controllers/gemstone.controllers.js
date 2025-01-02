const { Gemstone } = require('../models');

const createGemstone = async (req, res) => {
    const {
        id,
        name,
        size,
        weight,
        color,
        purity,
        certificate,
        status
    } = req.body;
    try {
        const newGemstone = await Gemstone.create({
            id,
            name,
            size,
            weight,
            color,
            purity,
            certificate,
            status,
        });
        res.status(201).send(newGemstone);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getAllGemstone = async (req, res) => {
    try {
        const gemstoneList = await Gemstone.findAll({
            where: {
                status: 1,
            }
        });
        res.status(200).send(gemstoneList);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getDetailGemstone = async (req, res) => {
    const { id } = req.params;
    try {
        const detailGemstone = await Gemstone.findOne({
            where: {
                id: id,
                status: 1,
            }
        });
        res.status(200).send(detailGemstone);
    } catch (error) {
        res.status(500).send(error);
    }
}

const updateGemstone = async (req, res) => {
    const { id } = req.params;
    const {
        name,
        size,
        weight,
        color,
        purity,
        certificate,
    } = req.body;
    try {
        const detailGemstone = await Gemstone.findOne({
            where: {
                id: id,
                status: 1,
            }
        });
        detailGemstone.name = name;
        detailGemstone.size = size;
        detailGemstone.weight = weight;
        detailGemstone.color = color;
        detailGemstone.purity = purity;
        detailGemstone.certificate = certificate;
        await detailGemstone.save();
        res.status(200).send(detailGemstone);
    } catch (error) {
        res.status(500).send(error);
    }
}

const deleteGemstone = async (req, res) => {
    const { id } = req.params;
    try {
        const detailGemstone = await Gemstone.findOne({
            where: {
                id: id,
                status: 1,
            }
        });
        detailGemstone.status = 0;
        await detailGemstone.save();
        res.status(200).send(detailGemstone);
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    createGemstone,
    getAllGemstone,
    getDetailGemstone,
    updateGemstone,
    deleteGemstone,
}