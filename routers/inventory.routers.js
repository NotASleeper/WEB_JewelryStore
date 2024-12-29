const { Inventory } = require('../models')
const express = require('express');
const { getAllInventory, getDetailInventory, updateInventory } = require('../controllers/inventory.controllers');
const { checkExist } = require('../middlewares/validations/checkExist');

const inventoryRouter = express.Router();

// inventoryRouter.post("/", createInventory);
inventoryRouter.get("/", getAllInventory);
inventoryRouter.get("/:id", checkExist(Inventory), getDetailInventory);
inventoryRouter.put("/:id", checkExist(Inventory), updateInventory);

module.exports = {
    inventoryRouter,
}