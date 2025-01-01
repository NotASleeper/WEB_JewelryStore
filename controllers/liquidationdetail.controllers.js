const { LiquidationDetail, Product, ProductCategory } = require('../models');

const createLiquidationDetail = async (req, res) => {
    const {
        id_liq,
        id_product,
        quantity,
        price_down,
        status,
    } = req.body;
    try {
        const total = parseFloat(quantity) * parseFloat(price_down);
        const newLiquidationDetail = await LiquidationDetail.create({
            id_liq,
            id_product,
            quantity,
            price_down,
            total,
            status,
        });
        res.status(201).send(newLiquidationDetail);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getAllLiquidationDetail = async (req, res) => {
    try {
        const LiquidationDetailList = await LiquidationDetail.findAll({
            where: {
                status: 1,
            },
            include: [{
                model: Product,
                include: [{
                    model: ProductCategory,
                }],
            }]
        });
        res.status(200).send(LiquidationDetailList);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getDetailLiquidationDetail = async (req, res) => {
    const { id_liq, id_product } = req.params;
    try {
        const detailLiquidationDetail = await LiquidationDetail.findOne({
            where: {
                id_liq: id_liq,
                id_product: id_product,
                status: 1,
            },
            include: [{
                model: Product,
                include: [{
                    model: ProductCategory,
                }],
            }]
        });
        res.status(200).send(detailLiquidationDetail);
    } catch (error) {
        res.status(500).send(error);
    }
}

const updateLiquidationDetail = async (req, res) => {
    const { id_liq, id_product } = req.params;
    const {
        quantity,
        price_down,
    } = req.body;
    try {
        const total = parseFloat(quantity) * parseFloat(price_down);
        const detailLiquidationDetail = await LiquidationDetail.findOne({
            where: {
                id_liq: id_liq,
                id_product: id_product,
                status: 1,
            }
        });
        detailLiquidationDetail.quantity = quantity;
        detailLiquidationDetail.price_down = price_down;
        detailLiquidationDetail.total = total;
        await detailLiquidationDetail.save();
        res.status(200).send(detailLiquidationDetail);
    } catch (error) {
        res.status(500).send(error);
    }
}

const deleteLiquidationDetail = async (req, res) => {
    const { id_liq, id_product } = req.params;
    try {
        const detailLiquidationDetail = await LiquidationDetail.findOne({
            where: {
                id_liq: id_liq,
                id_product: id_product,
                status: 1,
            }
        });
        detailLiquidationDetail.status = 0;
        await detailLiquidationDetail.save();
        res.status(200).send(detailLiquidationDetail);
    } catch (error) {
        res.status(500).send(error)
    }
}

const getAllLiquidationDetailByLiquidation = async (req, res) => {
    const { id } = req.params;
    console.log(id);

    try {
        console.log(id);

        const LiquidationDetailList = await LiquidationDetail.findAll({
            where: {
                id_liq: id,
                status: 1,
            },
            include: [{
                model: Product,
                include: [{
                    model: ProductCategory,
                }],
            }]
        });
        res.status(200).send(LiquidationDetailList);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    createLiquidationDetail,
    getAllLiquidationDetail,
    getDetailLiquidationDetail,
    updateLiquidationDetail,
    deleteLiquidationDetail,
    getAllLiquidationDetailByLiquidation,
}