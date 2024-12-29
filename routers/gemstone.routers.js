const express = require('express');
const { getAllGemstone, getDetailGemstone, updateGemstone, deleteGemstone } = require('../controllers/gemstone.controllers');

const gemstoneRouter = express.Router();

// gemstoneRouter.post("/", createGemstone);
gemstoneRouter.get("/", getAllGemstone);
gemstoneRouter.get("/:id", getDetailGemstone);
gemstoneRouter.put("/:id", updateGemstone);
gemstoneRouter.delete("/:id", deleteGemstone);

module.exports = {
    gemstoneRouter,
}