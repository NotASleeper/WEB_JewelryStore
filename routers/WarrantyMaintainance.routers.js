const { WarrantyMaintainance } = require('../models')
const express = require('express');
const { createWarrantyMaintainance, getAllWarrantyMaintainance, getDetailWarrantyMaintainance, updateWarrantyMaintainance, deleteWarrantyMaintainance } = require('../controllers/WarrantyMaintainance.controllers');
const { checkExist } = require('../middlewares/validations/checkExist');

const warrantyMaintainanceRouter = express.Router();

warrantyMaintainanceRouter.post("/", createWarrantyMaintainance);
warrantyMaintainanceRouter.get("/", getAllWarrantyMaintainance);
warrantyMaintainanceRouter.get("/:id", checkExist(WarrantyMaintainance), getDetailWarrantyMaintainance);
warrantyMaintainanceRouter.put("/:id", checkExist(WarrantyMaintainance), updateWarrantyMaintainance);
warrantyMaintainanceRouter.delete("/:id", checkExist(WarrantyMaintainance), deleteWarrantyMaintainance);

module.exports = {
    warrantyMaintainanceRouter,
}
