const express = require('express');
const { customerRouter } = require('./customer.routers');

const rootRouter = express.Router();

rootRouter.use("/customers", customerRouter);

module.exports = {
    rootRouter,
}