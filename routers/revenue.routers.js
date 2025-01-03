const express = require('express');
const { getDailyRevenue, getWeeklyRevenue, getBestSalesByWeek, getBestSellersByWeek } = require('../controllers/revenue.controllers');

const revenueRouter = express.Router();

revenueRouter.get("/daily/:date", getDailyRevenue);
revenueRouter.get("/weekly/:date", getWeeklyRevenue);
revenueRouter.get("/best-sales/:date", getBestSalesByWeek);
revenueRouter.get("/best-sellers/:date", getBestSellersByWeek);

module.exports = {
    revenueRouter,
}