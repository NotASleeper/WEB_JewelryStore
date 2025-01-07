const { Supplier } = require('../models');
const getAllSupplier = async (req, res) => {
    try {
            const supplierList = await Supplier.findAll({
                where: {
                    status: 1
                }
            });
            res.status(200).send(supplierList);
        } catch (error) {
            res.status(500).send(error);
        }
};

const getDetailSupplier = async (req, res) => {
    const { id } = req.params;
    try {
        const supplier = await Supplier.findOne({
            where: {
                id: id,
                status: 1
            }
        });
        res.status(200).send(supplier);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    getAllSupplier,
    getDetailSupplier
}
