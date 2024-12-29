const { PositionEmployee } = require('../models')
const express = require('express');
const { createPositionEmployee, getAllPositionEmployee, getDetailPositionEmployee, updatePositionEmployee, deletePositionEmployee } = require('../controllers/position-employee.controllers');
const { checkExist } = require('../middlewares/validations/checkExist');

const positionEmployeeRouter = express.Router();

positionEmployeeRouter.post("/", createPositionEmployee);
positionEmployeeRouter.get("/", getAllPositionEmployee);
positionEmployeeRouter.get("/:id", checkExist(PositionEmployee), getDetailPositionEmployee);
positionEmployeeRouter.put("/:id", checkExist(PositionEmployee), updatePositionEmployee);
positionEmployeeRouter.delete("/:id", checkExist(PositionEmployee), deletePositionEmployee);

module.exports = {
    positionEmployeeRouter,
}