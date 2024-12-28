//Chắc không cần dùng cái này
//Gộp chung bên product rồi

const express = require('express');
const { createInventory, getAllInventory, getDetailInventory, updateInventory } = require('../controllers/inventory.controllers');

const inventoryRouter = express.Router();

inventoryRouter.post("/", createInventory);
inventoryRouter.get("/", getAllInventory);
inventoryRouter.get("/:id", getDetailInventory);
inventoryRouter.put("/:id", updateInventory);

module.exports = {
    inventoryRouter,
}