const { Coupon } = require('../models');

const createCoupon = async (req, res) => {
    const {
        couponCode,
        discount,
        isUsed,
        status
    } = req.body;
    try {
        const newCoupon = await Coupon.create({
            couponCode,
            discount,
            isUsed,
            status
        });
        res.status(201).send(newCoupon);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getAllCoupon = async (req, res) => {
    try {
        const couponList = await Coupon.findAll({
            where: {
                status: 1
            }
        });
        res.status(200).send(couponList);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getDetailCoupon = async (req, res) => {
    const { id } = req.params;
    try {
        const detailProductCategory = await Coupon.findOne({
            where: {
                id: id,
                status: 1
            }
        });
        res.status(200).send(detailProductCategory);
    } catch (error) {
        res.status(500).send(error);
    }
};

const updateCoupon = async (req, res) => {
    const { id } = req.params;
    const {
        couponCode,
        discount,
        isUsed,
    } = req.body;
    try {
        const coupon = await Coupon.findOne({
            where: {
                id: id,
                status: 1
            }
        });
        coupon.couponCode = couponCode;
        coupon.discount = discount;
        coupon.isUsed = isUsed;
        await coupon.save();
        res.status(200).send(coupon);
    } catch (error) {
        res.status(500).send(error);
    }
};

const deleteCoupon = async (req, res) => {
    const { id } = req.params;
    try {
        const coupon = await Coupon.findOne({
            where: {
                id, status: 1
            }
        });
        coupon.status = 0;
        await coupon.save();
        res.status(200).send(coupon);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    createCoupon,
    getAllCoupon,
    getDetailCoupon,
    updateCoupon,
    deleteCoupon,
};
