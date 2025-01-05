const { Coupon } = require('../models')
const express = require('express');
const { createCoupon, getAllCoupon, getDetailCoupon, updateCoupon, deleteCoupon } = require('../controllers/coupon.controllers');
const { checkExist } = require('../middlewares/validations/checkExist');

const couponRouter = express.Router();

couponRouter.post("/", createCoupon);
couponRouter.get("/", getAllCoupon);
couponRouter.get("/:id", checkExist(Coupon), getDetailCoupon);
couponRouter.put("/:id", checkExist(Coupon), updateCoupon);
couponRouter.delete("/:id", checkExist(Coupon), deleteCoupon);

module.exports = {
    couponRouter,
}