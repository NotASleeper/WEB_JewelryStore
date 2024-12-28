const { ProductCategory } = require('../models');

const createProductCategory = async (req, res) => {
    const {
        name,
        status
    } = req.body;
    try {
        const newProductCategory = await ProductCategory.create({
            name,
            status
        });
        res.status(201).send(newProductCategory);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getAllProductCategory = async (req, res) => {
    try {
        const productCategoryList = await ProductCategory.findAll({
            where: {
                status: 1,
            }
        });
        res.status(200).send(productCategoryList);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getDetailProductCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const detailProductCategory = await ProductCategory.findOne({
            where: {
                id: id,
                status: 1,
            }
        });
        res.status(200).send(detailProductCategory);
    } catch (error) {
        res.status(500).send(error);
    }
}

const updateProductCategory = async (req, res) => {
    const { id } = req.params;
    const {
        name
    } = req.body;
    try {
        const detailProductCategory = await ProductCategory.findOne({
            where: {
                id: id,
                status: 1,
            }
        });
        detailProductCategory.name = name;
        await detailProductCategory.save();
        res.status(200).send(detailProductCategory);
    } catch (error) {
        res.status(500).send(error);
    }
}

const deleteProductCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const detailProductCategory = await ProductCategory.findOne({
            where: {
                id: id,
                status: 1,
            }
        });
        detailProductCategory.status = 0;
        await detailProductCategory.save();
        res.status(200).send(detailProductCategory);
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    createProductCategory,
    getAllProductCategory,
    getDetailProductCategory,
    updateProductCategory,
    deleteProductCategory,
}