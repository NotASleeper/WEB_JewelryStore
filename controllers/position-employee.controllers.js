const express = require('express');
const { createPositionEmployee, getAllPositionEmployee, getDetailPositionEmployee, updatePositionEmployee, deletePositionEmployee } = require('../routers/position-employee.routers');

const positionEmployeeRouter = express.Router();

positionEmployeeRouter.post("/", createPositionEmployee);
positionEmployeeRouter.get("/", getAllPositionEmployee);
positionEmployeeRouter.get("/:id", getDetailPositionEmployee);
positionEmployeeRouter.put("/:id", updatePositionEmployee);
positionEmployeeRouter.delete("/:id", deletePositionEmployee);

module.exports = {
    positionEmployeeRouter,
}