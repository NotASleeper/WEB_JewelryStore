const { Product } = require('../models');

const createProduct = async (req, res) => {
    const {
        name,
        gold_age,
        size,
        weight,
        price,
        warranty_period,
        status
    } = req.body;
    try {
        const newProduct = await Product.create({
            name,
            gold_age,
            size,
            weight,
            price,
            warranty_period,
            status
        });
        res.status(201).send(newProduct);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getAllProduct = async (req, res) => {
    try {
        const productList = await Product.findAll({
            where: {
                status: 1,
            }
        });
        res.status(200).send(productList);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getDetailProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const detailProduct = await Product.findOne({
            where: {
                id: id,
                status: 1,
            }
        });
        res.status(200).send(detailProduct);
    } catch (error) {
        res.status(500).send(error);
    }
}

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const {
        name,
        gold_age,
        size,
        weight,
        price,
        warranty_period,
    } = req.body;
    try {
        const detailProduct = await Product.findOne({
            where: {
                id: id,
                status: 1,
            }
        });
        detailProduct.name = name;
        detailProduct.gold_age = gold_age;
        detailProduct.size = size;
        detailProduct.weight = weight;
        detailProduct.price = price;
        detailProduct.warranty_period = warranty_period;
        await detailProduct.save();
        res.status(200).send(detailProduct);
    } catch (error) {
        res.status(500).send(error);
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const detailProduct = await Product.findOne({
            where: {
                id: id,
                status: 1,
            }
        });
        detailProduct.status = 0;
        await detailProduct.save();
        res.status(200).send(detailProduct);
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    createProduct,
    getAllProduct,
    getDetailProduct,
    updateProduct,
    deleteProduct,
}