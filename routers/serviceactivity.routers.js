const { ServiceActivity } = require('../models')
const express = require('express');
const { createServiceActivity, getAllServiceActivity, getDetailServiceActivity, updateServiceActivity, deleteServiceActivity } = require('../controllers/serviceactivity.controllers');
const { checkExist } = require('../middlewares/validations/checkExist');

const serviceActivityRouter = express.Router();

serviceActivityRouter.post("/", createServiceActivity);
serviceActivityRouter.get("/", getAllServiceActivity);
serviceActivityRouter.get("/:id", checkExist(ServiceActivity), getDetailServiceActivity);
serviceActivityRouter.put("/:id", checkExist(ServiceActivity), updateServiceActivity);
serviceActivityRouter.delete("/:id", checkExist(ServiceActivity), deleteServiceActivity);

module.exports = {
    serviceActivityRouter,
}