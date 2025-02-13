const { Op } = require("sequelize");
const { Product, Inventory, ProductCategory, Gemstone, ProductImage } = require("../models");
const uploadCloud = require('../middlewares/upload/cloudinary');

//Lấy product và số lượng
const getProductWitDetail = async (id) => {
  return await Product.findOne({
    where: {
      id: id,
    },
    include: [
      {
        model: Inventory,
        attributes: ["quantity"],
      },
      {
        model: Gemstone,
      },
    ],
  });
};

const createProduct = async (req, res) => {
  uploadCloud.any('img', 10)
  const {
    name,
    id_category,
    material,
    size,
    weight,
    price,
    warranty_period,
    discount,
    description,
    status,
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
      discount,
      description,
      status,
    });

    await Inventory.create({
      id: newProduct.id,
      quantity: 0,
    });

    await Gemstone.create({
      id: newProduct.id,
      status: 1,
    });

    if (req.file && req.files.length > 0) {
      const imagePromises = req.files.map(file => {
        return ProductImage.create({
          id_product: newProduct.id,
          url: file.path,
        });
      });
      await Promise.all(imagePromises);
    }

    const productWithQuantity = await getProductWitDetail(newProduct.id);
    res.status(201).send(productWithQuantity);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAllProduct = async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const productList = await Product.findAll({
        include: [
          {
            model: Inventory,
            attributes: ["quantity"],
          },
          {
            model: Gemstone,
          },
          {
            model: ProductCategory,
          },
          {
            model: ProductImage,
          }
        ],
        where: {
          name: {
            [Op.like]: `%${name}%`,
          },
          status: 1,
        },
      });
      res.status(200).send(productList);
    } else {
      const productList = await Product.findAll({
        include: [
          {
            model: Inventory,
            attributes: ["quantity"],
          },
          {
            model: Gemstone,
          },
          {
            model: ProductCategory,
          },
        ],
        where: {
          status: 1,
        },
      });
      res.status(200).send(productList);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const getDetailProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const detailProduct = await Product.findOne({
      include: [
        {
          model: Inventory,
          attributes: ["quantity"],
        },
        {
          model: Gemstone,
        },
        {
          model: ProductCategory,
        }
      ],
      where: {
        id: id,
        status: 1,
      },
    });

    res.status(200).send(detailProduct);
  } catch (error) {
    res.status(500).send(error);
  }
};

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
    discount,
    description,
  } = req.body;
  try {
    const detailProduct = await Product.findOne({
      where: {
        id: id,
        status: 1,
      },
    });
    detailProduct.name = name;
    detailProduct.id_category = id_category;
    detailProduct.material = material;
    detailProduct.size = size;
    detailProduct.weight = weight;
    detailProduct.price = price;
    detailProduct.warranty_period = warranty_period;
    detailProduct.discount = discount;
    detailProduct.description = description;
    await detailProduct.save();

    res.status(200).send(detailProduct);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const detailProduct = await Product.findOne({
      where: {
        id: id,
        status: 1,
      },
    });
    detailProduct.status = 0;
    await detailProduct.save();

    res.status(200).send(detailProduct);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getProductByCategoryID = async (req, res) => {
  const { id_category } = req.params;
  try {
    const category = await ProductCategory.findOne({
      where: {
        id: id_category,
      },
    });

    if (!category) {
      return res.status(404).send({ message: "Category not found" });
    }

    const productList = await Product.findAll({
      include: [
        {
          model: Inventory,
          attributes: ["quantity"],
        },
        {
          model: ProductCategory,
          attributes: ["name"],
        },
        {
          model: Gemstone,
        },
      ],
      where: {
        id_category: id_category,
        status: 1,
      },
    });

    res.status(200).send(productList);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getProductByCategoryName = async (req, res) => {
  const { category_name } = req.params;
  try {
    const category = await ProductCategory.findOne({
      where: {
        name: category_name,
      },
    });

    if (!category) {
      return res.status(404).send({ message: "Category not found" });
    }

    const productList = await Product.findAll({
      include: [
        {
          model: Inventory,
          attributes: ["quantity"],
        },
        {
          model: ProductCategory,
          attributes: ["name"],
        },
        {
          model: Gemstone,
        },
      ],
      where: {
        id_category: category.id,
        status: 1,
      },
    });

    res.status(200).send(productList);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createProduct,
  getAllProduct,
  getDetailProduct,
  updateProduct,
  deleteProduct,
  getProductByCategoryID,
  getProductByCategoryName,
};
