const { RefundForm } = require('../models')
const express = require('express');
const { createRefundForm, getAllRefundForm, getDetailRefundForm, updateRefundForm, deleteRefundForm } = require('../controllers/refundform.controllers');
const { checkExist } = require('../middlewares/validations/checkExist');

const refundFormRouter = express.Router();

refundFormRouter.post("/", createRefundForm);
refundFormRouter.get("/", getAllRefundForm);
refundFormRouter.get("/:id", checkExist(RefundForm), getDetailRefundForm);
refundFormRouter.put("/:id", checkExist(RefundForm), updateRefundForm);
refundFormRouter.delete("/:id", checkExist(RefundForm), deleteRefundForm);

module.exports = {
    refundFormRouter,
}