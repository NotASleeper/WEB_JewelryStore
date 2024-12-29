const { Product, Inventory, ProductCategory } = require('../models');

//Lấy product và số lượng
const getProductWithQuantity = async (id) => {
    return await Product.findOne({
        where: {
            id: id
        },
        include: [{
            model: Inventory,
            attributes: ['quantity']
        }]
    });
}

const createProduct = async (req, res) => {
    const {
        name,
        id_category,
        material,
        size,
        weight,
        price,
        warranty_period,
        status,
        quantity
    } = req.body;
    try {
        const newProduct = await Product.create({
            name,
            id_category,
            material,
            size,
            weight,
            price,
            warranty_period,
            status
        });

        await Inventory.create({
            id: newProduct.id,
            quantity: quantity
        });

        const productWithQuantity = await getProductWithQuantity(newProduct.id);
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
        material,
        size,
        weight,
        price,
        warranty_period,
        quantity
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
        detailProduct.material = material;
        detailProduct.size = size;
        detailProduct.weight = weight;
        detailProduct.price = price;
        detailProduct.warranty_period = warranty_period;
        await detailProduct.save();

        const inventory = await Inventory.findOne({
            where: {
                id: id
            }
        });
        inventory.quantity = quantity;
        await inventory.save();

        const productWithQuantity = await getProductWithQuantity(id);
        res.status(200).send(productWithQuantity);
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

        const productWithQuantity = await getProductWithQuantity(id);
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