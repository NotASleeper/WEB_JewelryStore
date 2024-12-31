const { ImportDetail } = require('../models');

const createImportDetail = async (req, res) => {
    const {
        id_lot,
        id_product,
        quantity,
        price,
        status,
    } = req.body;
    try {
        const total = parseFloat(quantity) * parseFloat(price);
        const newImportDetail = await ImportDetail.create({
            id_lot,
            id_product,
            quantity,
            price,
            total,
            status,
        });
        res.status(201).send(newImportDetail);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getAllImportDetail = async (req, res) => {
    try {
        const ImportDetailList = await ImportDetail.findAll({
            where: {
                status: 1,
            }
        });
        res.status(200).send(ImportDetailList);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getDetailImportDetail = async (req, res) => {
    const { id_lot, id_product } = req.params;
    try {
        const detailImportDetail = await ImportDetail.findOne({
            where: {
                id_lot: id_lot,
                id_product: id_product,
                status: 1,
            }
        });
        res.status(200).send(detailImportDetail);
    } catch (error) {
        res.status(500).send(error);
    }
}

const updateImportDetail = async (req, res) => {
    const { id_lot, id_product } = req.params;
    const {
        quantity,
        price,
    } = req.body;
    try {
        const total = parseFloat(quantity) * parseFloat(price);
        const detailImportDetail = await ImportDetail.findOne({
            where: {
                id_lot: id_lot,
                id_product: id_product,
                status: 1,
            }
        });
        detailImportDetail.quantity = quantity;
        detailImportDetail.price = price;
        detailImportDetail.total = total;
        await detailImportDetail.save();
        res.status(200).send(detailImportDetail);
    } catch (error) {
        res.status(500).send(error);
    }
}

const deleteImportDetail = async (req, res) => {
    const { id_lot, id_product } = req.params;
    try {
        const detailImportDetail = await ImportDetail.findOne({
            where: {
                id_lot: id_lot,
                id_product: id_product,
                status: 1,
            }
        });
        detailImportDetail.status = 0;
        await detailImportDetail.save();
        res.status(200).send(detailImportDetail);
    } catch (error) {
        res.status(500).send(error)
    }
}

const getAllImportDetailByImport = async (req, res) => {
    const { id } = req.params;
    console.log(id);

    try {
        console.log(id);

        const ImportDetailList = await ImportDetail.findAll({
            where: {
                //id_lot: id,
                status: 1,
            }
        });
        res.status(200).send(ImportDetailList);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    createImportDetail,
    getAllImportDetail,
    getDetailImportDetail,
    updateImportDetail,
    deleteImportDetail,
    getAllImportDetailByImport,
}