const express = require('express');
const { getDailyRevenue, getWeeklyRevenue } = require('../controllers/revenue.controllers');

const revenueRouter = express.Router();

revenueRouter.get("/daily/:date", getDailyRevenue);
revenueRouter.get("/weekly/:date", getWeeklyRevenue);

module.exports = {
    revenueRouter,
}