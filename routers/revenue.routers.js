const express = require('express');
const { getDailyRevenue } = require('../controllers/revenue.controllers');

const revenueRouter = express.Router();

revenueRouter.get("/:date", getDailyRevenue);

module.exports = {
    revenueRouter,
}