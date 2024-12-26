const express = require('express');
const { customerRouter } = require('./customer.routers');
const { employeeRouter } = require('./employee.routers');

const rootRouter = express.Router();

rootRouter.use("/customers", customerRouter);
rootRouter.use("/employees", employeeRouter);

module.exports = {
    rootRouter,
}