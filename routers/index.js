const express = require("express");
const { customerRouter } = require("./customer.routers");
const { employeeRouter } = require("./employee.routers");
const { productRouter } = require("./product.routers");
const { productCategoryRouter } = require("./product-category.routers");
const { positionEmployeeRouter } = require("./position-employee.routers");
const { inventoryRouter } = require("./inventory.routers");
const { gemstoneRouter } = require("./gemstone.routers");
const { accountRouter } = require("./account.routers");
const { orderFormRouter } = require("./orderform.routers");
const { orderDetailRouter } = require("./orderdetail.routers");
const { importFormRouter } = require("./importform.routers");
const { importDetailRouter } = require("./importdetail.routers");
const { liquidationFormRouter } = require("./liquidationform.routers");
const { liquidationDetailRouter } = require("./liquidationdetail.routers");
const { couponRouter } = require("./coupon.routers");
const { refundFormRouter } = require("./refundform.routers");
const { serviceActivityRouter } = require("./serviceactivity.routers");
const { supplierRouter } = require("./supplier.routers");
const { warrantyMaintainanceRouter } = require("./WarrantyMaintainance.routers");
const { revenueRouter } = require("./revenue.routers");

const rootRouter = express.Router();

rootRouter.use("/customers", customerRouter);
rootRouter.use("/employees", employeeRouter);
rootRouter.use("/products", productRouter);
rootRouter.use("/product-categories", productCategoryRouter);
rootRouter.use("/position-employees", positionEmployeeRouter);
rootRouter.use("/inventories", inventoryRouter);
rootRouter.use("/gemstones", gemstoneRouter);
rootRouter.use("/accounts", accountRouter);
rootRouter.use("/order-forms", orderFormRouter);
rootRouter.use("/order-details", orderDetailRouter);
rootRouter.use("/import-forms", importFormRouter);
rootRouter.use("/import-details", importDetailRouter);
rootRouter.use("/liquidation-forms", liquidationFormRouter);
rootRouter.use("/liquidation-details", liquidationDetailRouter);
rootRouter.use("/coupons", couponRouter);
rootRouter.use("/refund-forms", refundFormRouter);
rootRouter.use("/service-activities", serviceActivityRouter);
rootRouter.use("/suppliers", supplierRouter);
rootRouter.use("/warranty-maintainances", warrantyMaintainanceRouter);
rootRouter.use("/revenues", revenueRouter);

module.exports = {
  rootRouter,
};
