const { LiquidationForm, Customer } = require('../models')
const express = require('express');
const { createLiquidationForm, getAllLiquidationForm, getDetailLiquidationForm, updateLiquidationForm, deleteLiquidationForm } = require('../controllers/liquidationform.controllers');
const { checkExist } = require('../middlewares/validations/checkExist');

const liquidationFormRouter = express.Router();

liquidationFormRouter.post("/", createLiquidationForm);
liquidationFormRouter.get("/", getAllLiquidationForm);
liquidationFormRouter.get("/:id", checkExist(LiquidationForm), getDetailLiquidationForm);
liquidationFormRouter.put("/:id", checkExist(LiquidationForm), updateLiquidationForm);
liquidationFormRouter.delete("/:id", checkExist(LiquidationForm), deleteLiquidationForm);

module.exports = {
    liquidationFormRouter,
}