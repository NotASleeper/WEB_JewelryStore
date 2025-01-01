const { ImportForm, Supplier } = require('../models')
const express = require('express');
const { createImportForm, getAllImportForm, getDetailImportForm, updateImportForm, deleteImportForm } = require('../controllers/importform.controllers');
const { checkExist } = require('../middlewares/validations/checkExist');

const importFormRouter = express.Router();

importFormRouter.post("/", createImportForm);
importFormRouter.get("/", getAllImportForm);
importFormRouter.get("/:id", checkExist(ImportForm), getDetailImportForm);
importFormRouter.put("/:id", checkExist(ImportForm), updateImportForm);
importFormRouter.delete("/:id", checkExist(ImportForm), deleteImportForm);

module.exports = {
    importFormRouter,
}