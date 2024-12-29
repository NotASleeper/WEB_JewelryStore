const { Product, Inventory, ProductCategory, Gemstone } = require('../models');

//Lấy product và số lượng
const getProductWitDetail = async (id) => {
    return await Product.findOne({
        where: {
            id: id
        },
        include: [{
            model: Inventory,
            attributes: ['quantity']
        }, {
            model: Gemstone,
        }]
    });
}

const createProduct = async (req, res) => {
    const {
        name,
        id_category,
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
            id_category,
            gold_age,
            size,
            weight,
            price,
            warranty_period,
            status
        });

        await Inventory.create({
            id: newProduct.id,
        });

        await Gemstone.create({
            id: newProduct.id,
        });

        const productWithQuantity = await getProductWitDetail(newProduct.id);
        res.status(201).send(productWithQuantity);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getAllProduct = async (req, res) => {
    try {
        const productList = await Product.findAll({
            include: [{
                model: Inventory,
                attributes: ['quantity']
            }, {
                model: Gemstone,
            }],
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
            include: [{
                model: Inventory,
                attributes: ['quantity']
            }, {
                model: Gemstone,
            }],
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
        id_category,
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
        detailProduct.id_category = id_category;
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

const getProductByCategoryID = async (req, res) => {
    const { id_category } = req.params;
    try {
        const productList = await Product.findAll({
            include: [{
                model: Inventory,
                attributes: ['quantity']
            }, {
                model: ProductCategory,
                attributes: ['name']
            }, {
                model: Gemstone,
            }],
            where: {
                id_category: id_category,
                status: 1,
            }
        });

        res.status(200).send(productList);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getProductByCategoryName = async (req, res) => {
    const { category_name } = req.params;
    try {
        const category = await ProductCategory.findOne({
            where: {
                name: category_name,
            }
        })

        if (!category) {
            return res.status(404).send({ message: 'Category not found' });
        }

        const productList = await Product.findAll({
            include: [{
                model: Inventory,
                attributes: ['quantity']
            }, {
                model: ProductCategory,
                attributes: ['name']
            }, {
                model: Gemstone,
            }],
            where: {
                id_category: category.id,
                status: 1,
            }
        });

        res.status(200).send(productList);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    createProduct,
    getAllProduct,
    getDetailProduct,
    updateProduct,
    deleteProduct,
    getProductByCategoryID,
    getProductByCategoryName
}