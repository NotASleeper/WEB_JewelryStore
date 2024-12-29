const { Account } = require('../models')
const express = require('express');
const { createAccount, getDetailAccount, updateAccount, deleteAccount, getAllAccount, login } = require('../controllers/account.controllers');
const { checkExist } = require('../middlewares/validations/checkExist');

const accountRouter = express.Router();

accountRouter.post("/", createAccount);
accountRouter.get("/", getAllAccount);
accountRouter.get("/:id", checkExist(Account), getDetailAccount);
accountRouter.put("/:id", checkExist(Account), updateAccount);
accountRouter.delete("/:id", checkExist(Account), deleteAccount);
accountRouter.post("/login", login)

module.exports = {
    accountRouter,
}