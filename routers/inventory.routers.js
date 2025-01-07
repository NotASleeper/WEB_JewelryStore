const { Inventory } = require('../models')
const express = require('express');
const { getAllInventory, getDetailInventory, updateInventory, createInventory } = require('../controllers/inventory.controllers');

const inventoryRouter = express.Router();

inventoryRouter.post("/", createInventory);
inventoryRouter.get("/", getAllInventory);
inventoryRouter.get("/:id", getDetailInventory);
inventoryRouter.put("/:id", updateInventory);

module.exports = {
    inventoryRouter,
}