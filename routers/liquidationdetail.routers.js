const { LiquidationDetail, LiquidationForm } = require('../models')
const express = require('express');
const { createLiquidationDetail, getAllLiquidationDetail, getDetailLiquidationDetail, updateLiquidationDetail, deleteLiquidationDetail, getAllLiquidationDetailByLiquidation } = require('../controllers/liquidationdetail.controllers');
const { checkExistLiquidationDetail, checkExist } = require('../middlewares/validations/checkExist');

const liquidationDetailRouter = express.Router();

liquidationDetailRouter.post("/", createLiquidationDetail);
liquidationDetailRouter.get("/", getAllLiquidationDetail);
liquidationDetailRouter.get("/form/:id", checkExist(LiquidationForm), getAllLiquidationDetailByLiquidation);
liquidationDetailRouter.get("/:id_liq/:id_product", checkExistLiquidationDetail(LiquidationDetail), getDetailLiquidationDetail);
liquidationDetailRouter.put("/:id_liq/:id_product", checkExistLiquidationDetail(LiquidationDetail), updateLiquidationDetail);
liquidationDetailRouter.delete("/:id_liq/:id_product", checkExistLiquidationDetail(LiquidationDetail), deleteLiquidationDetail);

module.exports = {
    liquidationDetailRouter,
}