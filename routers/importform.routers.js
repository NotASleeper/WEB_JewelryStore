const { ImportForm, Customer } = require('../models')
const express = require('express');
const { createImportForm, getAllImportForm, getDetailImportForm, updateImportForm, deleteImportForm, getAllImportFormByCustomer } = require('../controllers/importform.controllers');
const { checkExist } = require('../middlewares/validations/checkExist');

const importFormRouter = express.Router();

importFormRouter.post("/", createImportForm);
importFormRouter.get("/", getAllImportForm);
importFormRouter.get("/:id", checkExist(ImportForm), getDetailImportForm);
importFormRouter.put("/:id", checkExist(ImportForm), updateImportForm);
importFormRouter.delete("/:id", checkExist(ImportForm), deleteImportForm);
importFormRouter.get("/id-customer/:id", checkExist(Customer), getAllImportFormByCustomer);

module.exports = {
    importFormRouter,
}