const express = require('express');
const { customerRouter } = require('./customer.routers');
const { employeeRouter } = require('./employee.routers');
const { productRouter } = require('./product.routers');

const rootRouter = express.Router();

rootRouter.use("/customers", customerRouter);
rootRouter.use("/employees", employeeRouter);
rootRouter.use("/products", productRouter);

module.exports = {
    rootRouter,
}