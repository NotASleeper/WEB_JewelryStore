const express = require("express");
const { customerRouter } = require("./customer.routers");
const { employeeRouter } = require("./employee.routers");
const { productRouter } = require("./product.routers");
const { productCategoryRouter } = require("./product-category.routers");
const { positionEmployeeRouter } = require("./position-employee.routers");

const rootRouter = express.Router();

rootRouter.use("/customers", customerRouter);
rootRouter.use("/employees", employeeRouter);
rootRouter.use("/products", productRouter);
rootRouter.use("/product-categories", productCategoryRouter);
rootRouter.use("/position-employees", positionEmployeeRouter);

module.exports = {
  rootRouter,
};
