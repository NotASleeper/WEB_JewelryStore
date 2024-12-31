const { ImportDetail, ImportForm } = require('../models')
const express = require('express');
const { createImportDetail, getAllImportDetail, getDetailImportDetail, updateImportDetail, deleteImportDetail, getAllImportDetailByImport } = require('../controllers/importdetail.controllers');
const { checkExistImportDetail, checkExist } = require('../middlewares/validations/checkExist');

const importDetailRouter = express.Router();

importDetailRouter.post("/", createImportDetail);
importDetailRouter.get("/", getAllImportDetail);
importDetailRouter.get("/form/:id", checkExist(ImportForm), getAllImportDetailByImport);
importDetailRouter.get("/:id_lot/:id_product", checkExistImportDetail(ImportDetail), getDetailImportDetail);
importDetailRouter.put("/:id_lot/:id_product", checkExistImportDetail(ImportDetail), updateImportDetail);
importDetailRouter.delete("/:id_lot/:id_product", checkExistImportDetail(ImportDetail), deleteImportDetail);

module.exports = {
    importDetailRouter,
}