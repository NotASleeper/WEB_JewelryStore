const { Gemstone } = require('../models')
const express = require('express');
const { getAllGemstone, getDetailGemstone, updateGemstone, deleteGemstone } = require('../controllers/gemstone.controllers');
const { checkExist } = require('../middlewares/validations/checkExist');

const gemstoneRouter = express.Router();

// gemstoneRouter.post("/", createGemstone);
gemstoneRouter.get("/", getAllGemstone);
gemstoneRouter.get("/:id", checkExist(Gemstone), getDetailGemstone);
gemstoneRouter.put("/:id", checkExist(Gemstone), updateGemstone);
gemstoneRouter.delete("/:id", checkExist(Gemstone), deleteGemstone);

module.exports = {
    gemstoneRouter,
}